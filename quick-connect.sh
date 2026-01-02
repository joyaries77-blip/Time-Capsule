#!/bin/bash

# 快速连接到云Mac并设置项目的脚本
# 使用方法: ./quick-connect.sh

CLOUD_MAC_HOST="LA095.macincloud.com"
CLOUD_MAC_USER="user285049"
CLOUD_MAC_PASSWORD="kss66081hjv"

echo "🚀 连接到云Mac并开始设置项目..."
echo ""
echo "云Mac地址: $CLOUD_MAC_HOST"
echo "用户名: $CLOUD_MAC_USER"
echo ""

# 检查是否安装了sshpass（用于自动输入密码）
if command -v sshpass &> /dev/null; then
    echo "✅ 使用 sshpass 自动连接..."
    sshpass -p "$CLOUD_MAC_PASSWORD" ssh -o StrictHostKeyChecking=no "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" << 'ENDSSH'
echo "🚀 开始在云Mac上设置项目..."

# 检查并克隆项目
if [ ! -d "Time-Capsule" ]; then
    echo "📦 克隆项目..."
    git clone https://github.com/joyaries77-blip/Time-Capsule.git
fi

cd Time-Capsule

# 运行设置脚本
if [ -f "setup-on-cloud-mac.sh" ]; then
    echo "🔧 运行设置脚本..."
    chmod +x setup-on-cloud-mac.sh
    ./setup-on-cloud-mac.sh
else
    echo "⚠️  设置脚本不存在，手动执行步骤..."
    npm install
    npm run build
    npx cap sync ios
fi

echo ""
echo "✅ 设置完成！"
echo ""
echo "📱 打开 Xcode 项目..."
npx cap open ios

echo ""
echo "✨ 完成！"
ENDSSH
else
    echo "⚠️  sshpass 未安装，使用交互式连接..."
    echo ""
    echo "密码: $CLOUD_MAC_PASSWORD"
    echo ""
    echo "连接到云Mac后，执行以下命令:"
    echo ""
    echo "cd ~"
    echo "git clone https://github.com/joyaries77-blip/Time-Capsule.git"
    echo "cd Time-Capsule"
    echo "chmod +x setup-on-cloud-mac.sh"
    echo "./setup-on-cloud-mac.sh"
    echo "npx cap open ios"
    echo ""
    
    ssh "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}"
fi

