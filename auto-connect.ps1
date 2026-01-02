# 自动连接到云Mac并执行设置命令
# 注意：此脚本需要手动输入密码，或配置SSH密钥

$CLOUD_MAC_HOST = "LA095.macincloud.com"
$CLOUD_MAC_USER = "user285049"
$CLOUD_MAC_PASSWORD = "kss66081hjv"

Write-Host "🚀 自动连接到云Mac并设置项目..." -ForegroundColor Green
Write-Host ""

# 创建远程命令
$remoteCommands = @"
cd ~
if [ ! -d "Time-Capsule" ]; then
    echo "📦 克隆项目..."
    git clone https://github.com/joyaries77-blip/Time-Capsule.git
fi
cd Time-Capsule
echo "🔧 运行设置脚本..."
chmod +x setup-on-cloud-mac.sh
./setup-on-cloud-mac.sh
echo "📱 打开 Xcode..."
npx cap open ios
"@

# 保存到临时文件
$tempFile = "$env:TEMP\remote-commands-$(Get-Date -Format 'yyyyMMddHHmmss').sh"
$remoteCommands | Out-File -FilePath $tempFile -Encoding UTF8

Write-Host "📋 将在云Mac上执行的命令已保存到: $tempFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  由于SSH需要交互式密码输入，请手动执行以下步骤:" -ForegroundColor Yellow
Write-Host ""
Write-Host "方法 1: 手动连接（推荐）" -ForegroundColor Green
Write-Host "1. 打开新的PowerShell窗口" -ForegroundColor White
Write-Host "2. 执行: ssh ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" -ForegroundColor Cyan
Write-Host "3. 输入密码: $CLOUD_MAC_PASSWORD" -ForegroundColor Cyan
Write-Host "4. 连接后，执行以下命令:" -ForegroundColor White
Write-Host ""
Get-Content $tempFile | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
Write-Host ""
Write-Host "方法 2: 使用SSH密钥（免密码）" -ForegroundColor Green
Write-Host "1. 生成SSH密钥: ssh-keygen -t ed25519" -ForegroundColor Cyan
Write-Host "2. 复制公钥到云Mac: type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST} `"cat >> ~/.ssh/authorized_keys`"" -ForegroundColor Cyan
Write-Host "3. 然后可以使用: ssh ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST} < $tempFile" -ForegroundColor Cyan
Write-Host ""

# 清理临时文件（可选）
# Remove-Item $tempFile -Force

