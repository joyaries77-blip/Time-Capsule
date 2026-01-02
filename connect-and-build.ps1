# 连接到云Mac并开始打包的脚本
# 使用方法: .\connect-and-build.ps1

$CLOUD_MAC_HOST = "LA095.macincloud.com"
$CLOUD_MAC_USER = "user285049"
$CLOUD_MAC_PASSWORD = "kss66081hjv"
$PROJECT_PATH = "~/Time-Capsule"

Write-Host "🚀 准备连接到云Mac并开始打包..." -ForegroundColor Green
Write-Host ""
Write-Host "云Mac地址: $CLOUD_MAC_HOST" -ForegroundColor Cyan
Write-Host "用户名: $CLOUD_MAC_USER" -ForegroundColor Cyan
Write-Host ""

# 检查SSH是否可用
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Host "❌ 错误: 未找到 ssh 命令" -ForegroundColor Red
    Write-Host "请安装 OpenSSH 客户端或使用 Git Bash" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 将在云Mac上执行的命令:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 检查项目是否存在，如果不存在则克隆"
Write-Host "2. 进入项目目录"
Write-Host "3. 运行设置脚本 (setup-on-cloud-mac.sh)"
Write-Host "4. 打开 Xcode 项目"
Write-Host ""

# 创建远程命令脚本
$remoteScript = @"
#!/bin/bash
set -e

echo "🚀 开始在云Mac上设置项目..."

# 检查并克隆项目
if [ ! -d "Time-Capsule" ]; then
    echo "📦 克隆项目..."
    git clone https://github.com/joyaries77-blip/Time-Capsule.git
fi

cd Time-Capsule

# 检查设置脚本是否存在
if [ -f "setup-on-cloud-mac.sh" ]; then
    echo "🔧 运行设置脚本..."
    chmod +x setup-on-cloud-mac.sh
    ./setup-on-cloud-mac.sh
else
    echo "⚠️  设置脚本不存在，手动执行步骤..."
    echo "📦 安装依赖..."
    npm install
    echo "🔨 构建应用..."
    npm run build
    echo "🔄 同步到 iOS..."
    npx cap sync ios
fi

echo ""
echo "✅ 设置完成！"
echo ""
echo "📱 打开 Xcode 项目..."
npx cap open ios

echo ""
echo "✨ 完成！Xcode 应该已经打开"
echo "📖 下一步：在 Xcode 中配置签名和证书"
"@

# 将脚本保存到临时文件
$tempScript = "$env:TEMP\setup-cloud-mac-$(Get-Date -Format 'yyyyMMddHHmmss').sh"
$remoteScript | Out-File -FilePath $tempScript -Encoding UTF8 -NoNewline

Write-Host "📤 上传设置脚本到云Mac..." -ForegroundColor Cyan

# 使用scp上传脚本（需要密码）
$scpCommand = "scp `"$tempScript`" ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}:~/setup-remote.sh"

Write-Host ""
Write-Host "⚠️  需要输入密码: $CLOUD_MAC_PASSWORD" -ForegroundColor Yellow
Write-Host ""
Write-Host "执行以下命令连接到云Mac:" -ForegroundColor Green
Write-Host ""
Write-Host "ssh $CLOUD_MAC_USER@$CLOUD_MAC_HOST" -ForegroundColor Cyan
Write-Host ""
Write-Host "然后在云Mac上执行:" -ForegroundColor Green
Write-Host ""
Write-Host "cd ~" -ForegroundColor Cyan
Write-Host "git clone https://github.com/joyaries77-blip/Time-Capsule.git" -ForegroundColor Cyan
Write-Host "cd Time-Capsule" -ForegroundColor Cyan
Write-Host "chmod +x setup-on-cloud-mac.sh" -ForegroundColor Cyan
Write-Host "./setup-on-cloud-mac.sh" -ForegroundColor Cyan
Write-Host "npx cap open ios" -ForegroundColor Cyan
Write-Host ""

# 清理临时文件
if (Test-Path $tempScript) {
    Remove-Item $tempScript -Force
}

Write-Host "💡 提示: 如果已配置SSH密钥，可以使用以下命令自动执行:" -ForegroundColor Yellow
Write-Host ""
Write-Host "ssh $CLOUD_MAC_USER@$CLOUD_MAC_HOST 'bash -s' < setup-on-cloud-mac.sh" -ForegroundColor Cyan
Write-Host ""

