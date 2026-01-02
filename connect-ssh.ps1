# SSH 连接到云Mac的脚本
# 使用方法: .\connect-ssh.ps1

$CLOUD_MAC_HOST = "LA095.macincloud.com"
$CLOUD_MAC_USER = "user285049"
$CLOUD_MAC_PASSWORD = "kss66081hjv"

Write-Host "🔗 连接到云Mac..." -ForegroundColor Green
Write-Host "地址: $CLOUD_MAC_HOST" -ForegroundColor Cyan
Write-Host "用户: $CLOUD_MAC_USER" -ForegroundColor Cyan
Write-Host ""

# 检查是否有sshpass或expect工具（通常Windows没有）
$hasSshpass = Get-Command sshpass -ErrorAction SilentlyContinue
$hasExpect = Get-Command expect -ErrorAction SilentlyContinue

if ($hasSshpass) {
    Write-Host "✅ 使用 sshpass 自动连接..." -ForegroundColor Green
    $env:SSHPASS = $CLOUD_MAC_PASSWORD
    sshpass -e ssh -o StrictHostKeyChecking=no "${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}"
} elseif ($hasExpect) {
    Write-Host "✅ 使用 expect 自动连接..." -ForegroundColor Green
    # 创建expect脚本
    $expectScript = @"
spawn ssh -o StrictHostKeyChecking=no ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}
expect {
    "yes/no" { send "yes\r"; exp_continue }
    "password:" { send "${CLOUD_MAC_PASSWORD}\r" }
}
interact
"@
    $expectScript | expect
} else {
    Write-Host "⚠️  未找到 sshpass 或 expect，使用交互式连接" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请在提示时输入密码: $CLOUD_MAC_PASSWORD" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "执行命令: ssh ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}" -ForegroundColor Green
    Write-Host ""
    
    # 尝试使用Start-Process打开新的PowerShell窗口并执行SSH
    $scriptBlock = "ssh -o StrictHostKeyChecking=no ${CLOUD_MAC_USER}@${CLOUD_MAC_HOST}"
    
    Write-Host "正在打开新的PowerShell窗口..." -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", $scriptBlock
}

