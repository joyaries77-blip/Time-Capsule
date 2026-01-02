#!/bin/bash

# Time Capsule iOS 打包脚本
# 用于在云Mac上快速构建和准备 iOS 应用

set -e  # 遇到错误立即退出

echo "🚀 开始 Time Capsule iOS 打包流程..."
echo ""

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 步骤 1: 构建 Web 应用
echo "📦 步骤 1/3: 构建 Web 应用..."
npm run build
echo "✅ Web 应用构建完成"
echo ""

# 步骤 2: 同步到 iOS
echo "🔄 步骤 2/3: 同步到 iOS 项目..."
npx cap sync ios
echo "✅ iOS 项目同步完成"
echo ""

# 步骤 3: 打开 Xcode
echo "📱 步骤 3/3: 打开 Xcode..."
echo "提示: 在 Xcode 中："
echo "  1. 配置签名和证书"
echo "  2. 选择目标设备"
echo "  3. 点击 Run 按钮测试"
echo "  4. 或选择 Product > Archive 进行打包"
echo ""

npx cap open ios

echo ""
echo "✨ 完成！Xcode 应该已经打开"
echo "📖 详细指南请查看: CLOUD-MAC-BUILD-GUIDE.md"

