#!/bin/bash

echo "🚀 Time Capsule iOS 打包设置脚本"
echo "=================================="
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    exit 1
fi

echo "✅ npm 版本: $(npm --version)"
echo ""

# 安装项目依赖
echo "📦 安装项目依赖..."
npm install

# 安装 Capacitor
echo ""
echo "📦 安装 Capacitor..."
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 检查图标文件
echo ""
echo "🖼️  检查图标文件..."
if [ ! -f "public/icon-192.png" ] || [ ! -f "public/icon-512.png" ]; then
    echo "⚠️  警告: 图标文件不存在"
    echo "   请执行以下步骤之一："
    echo "   1. 打开 public/icon-generator.html 生成图标"
    echo "   2. 或手动创建 icon-192.png 和 icon-512.png 并放在 public/ 文件夹"
    echo ""
    read -p "是否继续？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ 图标文件已存在"
fi

# 构建项目
echo ""
echo "🔨 构建 Web 应用..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建完成"

# 添加 iOS 平台
echo ""
echo "📱 添加 iOS 平台..."
npx cap add ios

# 同步到 iOS
echo ""
echo "🔄 同步到 iOS 项目..."
npx cap sync ios

echo ""
echo "✅ 设置完成！"
echo ""
echo "下一步："
echo "1. 运行 'npx cap open ios' 在 Xcode 中打开项目"
echo "2. 或运行 'npm run ios:build' 构建并打开 Xcode"
echo ""
echo "详细说明请查看 ios-build-guide.md"

