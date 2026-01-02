#!/bin/bash

# 在云Mac上设置 Time Capsule 项目的脚本
# 使用方法: 在云Mac上运行此脚本

set -e

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 开始在云Mac上设置 Time Capsule 项目...${NC}"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}⚠️  未检测到项目，从GitHub克隆...${NC}"
    
    # 克隆项目
    if [ -d "Time-Capsule" ]; then
        echo "项目文件夹已存在，进入目录..."
        cd Time-Capsule
    else
        git clone https://github.com/joyaries77-blip/Time-Capsule.git
        cd Time-Capsule
    fi
fi

echo -e "${GREEN}📦 步骤 1/4: 安装 Node.js 依赖...${NC}"
npm install

echo ""
echo -e "${GREEN}🔨 步骤 2/4: 构建 Web 应用...${NC}"
npm run build

echo ""
echo -e "${GREEN}🔄 步骤 3/4: 同步到 iOS 项目...${NC}"
npx cap sync ios

echo ""
echo -e "${GREEN}📱 步骤 4/4: 检查 CocoaPods 依赖...${NC}"
if [ -f "ios/App/Podfile" ]; then
    cd ios/App
    if ! command -v pod &> /dev/null; then
        echo -e "${YELLOW}⚠️  CocoaPods 未安装，正在安装...${NC}"
        sudo gem install cocoapods
    fi
    pod install
    cd ../..
else
    echo "未找到 Podfile，跳过 CocoaPods 安装"
fi

echo ""
echo -e "${GREEN}✅ 设置完成！${NC}"
echo ""
echo -e "${GREEN}📋 下一步操作:${NC}"
echo "1. 打开 Xcode 项目:"
echo "   npx cap open ios"
echo ""
echo "2. 或手动打开:"
echo "   open ios/App/App.xcworkspace"
echo ""
echo "3. 在 Xcode 中："
echo "   - 配置签名和证书（Signing & Capabilities）"
echo "   - 选择目标设备"
echo "   - 点击 Run 测试，或 Product > Archive 打包"
echo ""
echo -e "${GREEN}✨ 完成！${NC}"

