#!/bin/bash

# Time Capsule 项目上传到云Mac脚本
# 使用方法: ./upload-to-cloud-mac.sh [云Mac地址] [用户名] [目标路径]

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 默认配置
CLOUD_MAC_HOST="${1:-}"
CLOUD_MAC_USER="${2:-}"
TARGET_PATH="${3:-~/Time-Capsule}"

# 检查参数
if [ -z "$CLOUD_MAC_HOST" ] || [ -z "$CLOUD_MAC_USER" ]; then
    echo -e "${YELLOW}使用方法:${NC}"
    echo "  ./upload-to-cloud-mac.sh [云Mac地址] [用户名] [目标路径]"
    echo ""
    echo -e "${YELLOW}示例:${NC}"
    echo "  ./upload-to-cloud-mac.sh mac.example.com user ~/Time-Capsule"
    echo "  ./upload-to-cloud-mac.sh 192.168.1.100 developer"
    echo ""
    echo -e "${YELLOW}或者设置环境变量:${NC}"
    echo "  export CLOUD_MAC_HOST=mac.example.com"
    echo "  export CLOUD_MAC_USER=user"
    echo "  ./upload-to-cloud-mac.sh"
    echo ""
    
    # 尝试从环境变量读取
    if [ -n "$CLOUD_MAC_HOST" ] || [ -n "$CLOUD_MAC_USER" ]; then
        CLOUD_MAC_HOST="${CLOUD_MAC_HOST:-$CLOUD_MAC_HOST}"
        CLOUD_MAC_USER="${CLOUD_MAC_USER:-$CLOUD_MAC_USER}"
    else
        echo -e "${RED}错误: 请提供云Mac地址和用户名${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}🚀 开始上传 Time Capsule 项目到云Mac...${NC}"
echo ""
echo "云Mac地址: $CLOUD_MAC_HOST"
echo "用户名: $CLOUD_MAC_USER"
echo "目标路径: $TARGET_PATH"
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 rsync 是否可用
if command -v rsync &> /dev/null; then
    echo -e "${GREEN}✅ 使用 rsync 上传（推荐）${NC}"
    echo ""
    
    # 排除的文件和文件夹
    EXCLUDE_LIST=(
        "--exclude=node_modules"
        "--exclude=dist"
        "--exclude=.git"
        "--exclude=.DS_Store"
        "--exclude=*.log"
        "--exclude=ios/App/Pods"
        "--exclude=ios/App/Podfile.lock"
        "--exclude=ios/App/App.xcworkspace/xcuserdata"
        "--exclude=ios/App/App.xcodeproj/xcuserdata"
        "--exclude=*.xcuserstate"
        "--exclude=DerivedData"
        "--exclude=.vscode"
        "--exclude=.idea"
        "--exclude=*.zip"
    )
    
    # 使用 rsync 上传
    echo "📦 正在上传文件..."
    rsync -avz --progress \
        "${EXCLUDE_LIST[@]}" \
        ./ "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}:${TARGET_PATH}/"
    
    echo ""
    echo -e "${GREEN}✅ 上传完成！${NC}"
    
elif command -v scp &> /dev/null; then
    echo -e "${YELLOW}⚠️  rsync 不可用，使用 scp 上传${NC}"
    echo -e "${YELLOW}注意: scp 较慢，建议先打包再上传${NC}"
    echo ""
    
    # 创建临时打包文件
    TEMP_TAR="time-capsule-upload-$(date +%s).tar.gz"
    echo "📦 正在打包项目..."
    
    tar -czf "$TEMP_TAR" \
        --exclude='node_modules' \
        --exclude='dist' \
        --exclude='.git' \
        --exclude='.DS_Store' \
        --exclude='*.log' \
        --exclude='ios/App/Pods' \
        --exclude='ios/App/Podfile.lock' \
        --exclude='*.xcuserstate' \
        --exclude='DerivedData' \
        --exclude='.vscode' \
        --exclude='.idea' \
        --exclude='*.zip' \
        .
    
    echo "📤 正在上传..."
    scp "$TEMP_TAR" "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}:${TARGET_PATH}/"
    
    echo "📦 在云Mac上解压..."
    ssh "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" "cd ${TARGET_PATH} && tar -xzf ${TEMP_TAR##*/} && rm ${TEMP_TAR##*/}"
    
    # 清理本地临时文件
    rm "$TEMP_TAR"
    
    echo ""
    echo -e "${GREEN}✅ 上传完成！${NC}"
    
else
    echo -e "${RED}❌ 错误: 未找到 rsync 或 scp 命令${NC}"
    echo "请安装 rsync 或 scp，或使用其他上传方式"
    exit 1
fi

echo ""
echo -e "${GREEN}📋 下一步操作:${NC}"
echo "1. 连接到云Mac:"
echo "   ssh ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}"
echo ""
echo "2. 进入项目目录:"
echo "   cd ${TARGET_PATH}"
echo ""
echo "3. 安装依赖（如果需要）:"
echo "   npm install"
echo ""
echo "4. 打开 Xcode 项目:"
echo "   npx cap open ios"
echo ""
echo -e "${GREEN}✨ 完成！${NC}"

