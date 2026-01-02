#!/bin/bash

# 完整的打包和真机测试脚本 - 在云Mac上执行
# 使用方法: 在云Mac终端中运行此脚本

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GREEN}🚀 Time Capsule - 完整打包和真机测试流程${NC}"
echo ""

# 步骤 1: 检查并克隆项目
echo -e "${CYAN}步骤 1/6: 检查项目...${NC}"
if [ ! -d "Time-Capsule" ]; then
    echo "📦 克隆项目..."
    git clone https://github.com/joyaries77-blip/Time-Capsule.git
fi
cd Time-Capsule

# 步骤 2: 拉取最新代码
echo ""
echo -e "${CYAN}步骤 2/6: 拉取最新代码...${NC}"
git pull origin main

# 步骤 3: 安装依赖
echo ""
echo -e "${CYAN}步骤 3/6: 安装依赖...${NC}"
npm install

# 步骤 4: 构建项目
echo ""
echo -e "${CYAN}步骤 4/6: 构建项目...${NC}"
npm run build

# 步骤 5: 同步到iOS
echo ""
echo -e "${CYAN}步骤 5/6: 同步到iOS项目...${NC}"
npx cap sync ios

# 步骤 6: 安装CocoaPods依赖
echo ""
echo -e "${CYAN}步骤 6/6: 安装CocoaPods依赖...${NC}"
if [ -f "ios/App/Podfile" ]; then
    cd ios/App
    if ! command -v pod &> /dev/null; then
        echo "⚠️  CocoaPods 未安装，正在安装..."
        sudo gem install cocoapods
    fi
    pod install
    cd ../..
else
    echo "未找到 Podfile，跳过 CocoaPods 安装"
fi

echo ""
echo -e "${GREEN}✅ 构建完成！${NC}"
echo ""
echo -e "${YELLOW}📱 下一步操作:${NC}"
echo "1. 打开 Xcode 项目:"
echo "   npx cap open ios"
echo ""
echo "2. 在 Xcode 中："
echo "   - 配置签名和证书（Signing & Capabilities）"
echo "   - 选择您的真机设备"
echo "   - 点击 Run 按钮进行真机测试"
echo ""
echo -e "${GREEN}✨ 完成！${NC}"

