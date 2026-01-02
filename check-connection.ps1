# 检查SSH连接和网络状态的脚本

Write-Host "🔍 检查云Mac连接状态..." -ForegroundColor Green
Write-Host ""

# 检查网络连接
Write-Host "1. 测试网络连接..." -ForegroundColor Cyan
$hosts = @("LA095.macincloud.com", "74.80.242.95")
foreach ($host in $hosts) {
    Write-Host "   正在ping $host..." -ForegroundColor Gray
    $result = Test-Connection -ComputerName $host -Count 2 -Quiet
    if ($result) {
        Write-Host "   ✅ $host 可达" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $host 不可达" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "2. 测试SSH端口..." -ForegroundColor Cyan
$tcpClient = New-Object System.Net.Sockets.TcpClient
try {
    $tcpClient.Connect("74.80.242.95", 22)
    Write-Host "   ✅ SSH端口 22 开放" -ForegroundColor Green
    $tcpClient.Close()
} catch {
    Write-Host "   ❌ SSH端口 22 无法连接" -ForegroundColor Red
    Write-Host "   错误: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "3. 连接信息:" -ForegroundColor Cyan
Write-Host "   主机: LA095.macincloud.com" -ForegroundColor Gray
Write-Host "   IP: 74.80.242.95" -ForegroundColor Gray
Write-Host "   用户: user285049" -ForegroundColor Gray
Write-Host "   端口: 22" -ForegroundColor Gray

Write-Host ""
Write-Host "4. 建议的连接命令:" -ForegroundColor Cyan
Write-Host "   ssh user285049@74.80.242.95" -ForegroundColor Yellow
Write-Host "   或" -ForegroundColor Gray
Write-Host "   ssh -v user285049@LA095.macincloud.com" -ForegroundColor Yellow

Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Green
Write-Host "   - 如果网络可达但SSH失败，可能是密码或账户问题" -ForegroundColor Gray
Write-Host "   - 建议检查MacinCloud控制面板中的账户状态" -ForegroundColor Gray
Write-Host "   - 可以尝试使用MacinCloud的Web控制台" -ForegroundColor Gray
Write-Host ""

