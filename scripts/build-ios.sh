#!/bin/bash

# iOS 构建脚本
# 自动完成构建和同步流程

set -e

echo "📱 开始构建 iOS 应用..."

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：未找到 package.json"
    echo "请确保在项目根目录运行此脚本"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
else
    echo "✅ 依赖已安装"
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查是否已添加 iOS 平台
if [ ! -d "ios" ]; then
    echo "📱 添加 iOS 平台..."
    npm run cap:add:ios
fi

# 同步到 iOS
echo "🔄 同步到 iOS..."
npm run cap:sync

# 安装 CocoaPods 依赖
if [ -d "ios/App" ]; then
    echo "📦 安装 CocoaPods 依赖..."
    cd ios/App
    if [ ! -f "Podfile.lock" ]; then
        pod install
    else
        pod install --repo-update
    fi
    cd ../..
fi

echo ""
echo "✅ 构建完成！"
echo ""
echo "下一步："
echo "1. 运行 'npm run cap:open:ios' 打开 Xcode"
echo "2. 在 Xcode 中配置签名和 Bundle ID"
echo "3. 选择目标设备并构建"
echo "4. Product → Archive 创建安装包"

