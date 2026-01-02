#!/bin/bash

# 测试云Mac连接脚本
# 使用方法: ./test-connection.sh [云Mac地址] [用户名]

set -e

CLOUD_MAC_HOST="${1:-}"
CLOUD_MAC_USER="${2:-}"

if [ -z "$CLOUD_MAC_HOST" ] || [ -z "$CLOUD_MAC_USER" ]; then
    echo "使用方法: ./test-connection.sh [云Mac地址] [用户名]"
    echo "示例: ./test-connection.sh mac.example.com user"
    exit 1
fi

echo "🔍 测试连接到云Mac..."
echo "地址: $CLOUD_MAC_HOST"
echo "用户: $CLOUD_MAC_USER"
echo ""

# 测试 SSH 连接
echo "📡 测试 SSH 连接..."
if ssh -o ConnectTimeout=5 -o BatchMode=yes "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" "echo '连接成功'" 2>/dev/null; then
    echo "✅ SSH 连接成功"
else
    echo "❌ SSH 连接失败"
    echo "提示: 可能需要输入密码或配置SSH密钥"
    exit 1
fi

# 测试 Xcode 是否安装
echo ""
echo "🔍 检查 Xcode..."
XCODE_VERSION=$(ssh "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" "xcodebuild -version 2>/dev/null | head -n 1" || echo "")
if [ -n "$XCODE_VERSION" ]; then
    echo "✅ $XCODE_VERSION"
else
    echo "⚠️  Xcode 未安装或未找到"
fi

# 测试 Node.js
echo ""
echo "🔍 检查 Node.js..."
NODE_VERSION=$(ssh "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" "node --version 2>/dev/null" || echo "")
if [ -n "$NODE_VERSION" ]; then
    echo "✅ Node.js $NODE_VERSION"
else
    echo "⚠️  Node.js 未安装"
fi

# 测试 npm
echo ""
echo "🔍 检查 npm..."
NPM_VERSION=$(ssh "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" "npm --version 2>/dev/null" || echo "")
if [ -n "$NPM_VERSION" ]; then
    echo "✅ npm $NPM_VERSION"
else
    echo "⚠️  npm 未安装"
fi

echo ""
echo "✨ 连接测试完成！"

