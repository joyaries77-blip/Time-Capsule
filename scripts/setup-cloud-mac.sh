#!/bin/bash

# 云 Mac 环境设置脚本
# 在云 Mac 上运行此脚本来快速设置环境

set -e

echo "🚀 开始设置云 Mac 环境..."

# 检查是否在 macOS 上
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ 错误：此脚本需要在 macOS 上运行"
    exit 1
fi

# 检查 Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 安装 Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew 已安装"
fi

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "📦 安装 Node.js..."
    brew install node
else
    echo "✅ Node.js 已安装: $(node --version)"
fi

# 检查 Xcode
if ! command -v xcodebuild &> /dev/null; then
    echo "⚠️  Xcode 未安装"
    echo "请从 App Store 安装 Xcode"
    echo "或运行: xcode-select --install"
else
    echo "✅ Xcode 已安装: $(xcodebuild -version | head -n 1)"
fi

# 检查 CocoaPods
if ! command -v pod &> /dev/null; then
    echo "📦 安装 CocoaPods..."
    sudo gem install cocoapods
else
    echo "✅ CocoaPods 已安装: $(pod --version)"
fi

# 检查项目目录
if [ ! -f "package.json" ]; then
    echo "⚠️  未找到 package.json"
    echo "请确保在项目根目录运行此脚本"
    exit 1
fi

echo ""
echo "✅ 环境设置完成！"
echo ""
echo "下一步："
echo "1. 运行 'npm install' 安装依赖"
echo "2. 运行 'npm run build' 构建项目"
echo "3. 运行 'npm run cap:add:ios' 添加 iOS 平台"
echo "4. 运行 'npm run cap:sync' 同步到 iOS"
echo "5. 运行 'npm run cap:open:ios' 打开 Xcode"

