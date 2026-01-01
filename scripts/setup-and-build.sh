#!/bin/bash

# 云 Mac 上的一键设置和构建脚本
# 在云 Mac 终端中运行此脚本

set -e

echo "🚀 开始设置和构建 iOS 应用..."
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json"
    echo "请确保在项目根目录运行此脚本"
    exit 1
fi

# 步骤 1: 检查并安装 Homebrew
echo "📦 步骤 1/8: 检查 Homebrew..."
if ! command -v brew &> /dev/null; then
    echo "安装 Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew 已安装"
fi

# 步骤 2: 检查并安装 Node.js
echo ""
echo "📦 步骤 2/8: 检查 Node.js..."
if ! command -v node &> /dev/null; then
    echo "安装 Node.js..."
    brew install node
else
    echo "✅ Node.js 已安装: $(node --version)"
fi

# 步骤 3: 检查并安装 Xcode 命令行工具
echo ""
echo "📦 步骤 3/8: 检查 Xcode 命令行工具..."
if ! xcode-select -p &> /dev/null; then
    echo "安装 Xcode 命令行工具..."
    xcode-select --install
    echo "⚠️  请等待 Xcode 命令行工具安装完成后再继续"
    echo "安装完成后，重新运行此脚本"
    exit 0
else
    echo "✅ Xcode 命令行工具已安装"
fi

# 步骤 4: 检查并安装 CocoaPods
echo ""
echo "📦 步骤 4/8: 检查 CocoaPods..."
if ! command -v pod &> /dev/null; then
    echo "安装 CocoaPods..."
    sudo gem install cocoapods
else
    echo "✅ CocoaPods 已安装: $(pod --version)"
fi

# 步骤 5: 安装项目依赖
echo ""
echo "📦 步骤 5/8: 安装项目依赖..."
if [ ! -d "node_modules" ]; then
    echo "安装 npm 依赖..."
    npm install
else
    echo "✅ 依赖已安装，更新中..."
    npm install
fi

# 检查 React 和 React DOM
if ! npm list react &> /dev/null; then
    echo "安装 React 和 React DOM..."
    npm install react@18.3.1 react-dom@18.3.1
fi

# 步骤 6: 构建项目
echo ""
echo "🔨 步骤 6/8: 构建项目..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ 构建失败：未找到 dist 目录"
    exit 1
fi
echo "✅ 构建完成"

# 步骤 7: 添加 iOS 平台
echo ""
echo "📱 步骤 7/8: 配置 iOS 平台..."
if [ ! -d "ios" ]; then
    echo "添加 iOS 平台..."
    npx cap add ios
else
    echo "✅ iOS 平台已存在"
fi

# 同步到 iOS
echo "同步到 iOS..."
npx cap sync

# 安装 CocoaPods 依赖
if [ -d "ios/App" ]; then
    echo "安装 CocoaPods 依赖..."
    cd ios/App
    if [ ! -f "Podfile.lock" ]; then
        pod install
    else
        pod install --repo-update
    fi
    cd ../..
fi

# 步骤 8: 完成
echo ""
echo "✅ 步骤 8/8: 设置完成！"
echo ""
echo "📋 下一步操作："
echo "1. 运行 'npm run cap:open:ios' 打开 Xcode"
echo "2. 在 Xcode 中配置签名（选择你的 Team）"
echo "3. 修改 Bundle Identifier"
echo "4. 选择目标设备并构建"
echo "5. Product → Archive 创建安装包"
echo ""
echo "🚀 现在运行: npm run cap:open:ios"

