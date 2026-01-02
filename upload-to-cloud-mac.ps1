# Time Capsule 项目上传到云Mac脚本 (PowerShell版本)
# 使用方法: .\upload-to-cloud-mac.ps1 -Host "mac.example.com" -User "user" -Path "~/Time-Capsule"

param(
    [Parameter(Mandatory=$false)]
    [string]$Host = $env:CLOUD_MAC_HOST,
    
    [Parameter(Mandatory=$false)]
    [string]$User = $env:CLOUD_MAC_USER,
    
    [Parameter(Mandatory=$false)]
    [string]$Path = "~/Time-Capsule"
)

# 检查参数
if ([string]::IsNullOrEmpty($Host) -or [string]::IsNullOrEmpty($User)) {
    Write-Host "使用方法:" -ForegroundColor Yellow
    Write-Host "  .\upload-to-cloud-mac.ps1 -Host `"mac.example.com`" -User `"user`" -Path `"~/Time-Capsule`""
    Write-Host ""
    Write-Host "示例:" -ForegroundColor Yellow
    Write-Host "  .\upload-to-cloud-mac.ps1 -Host `"192.168.1.100`" -User `"developer`""
    Write-Host ""
    Write-Host "或设置环境变量:" -ForegroundColor Yellow
    Write-Host "  `$env:CLOUD_MAC_HOST = `"mac.example.com`""
    Write-Host "  `$env:CLOUD_MAC_USER = `"user`""
    Write-Host "  .\upload-to-cloud-mac.ps1"
    Write-Host ""
    
    if ([string]::IsNullOrEmpty($Host) -or [string]::IsNullOrEmpty($User)) {
        Write-Host "错误: 请提供云Mac地址和用户名" -ForegroundColor Red
        exit 1
    }
}

Write-Host "🚀 开始上传 Time Capsule 项目到云Mac..." -ForegroundColor Green
Write-Host ""
Write-Host "云Mac地址: $Host"
Write-Host "用户名: $User"
Write-Host "目标路径: $Path"
Write-Host ""

# 检查是否在项目根目录
if (-not (Test-Path "package.json")) {
    Write-Host "❌ 错误: 请在项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

# 检查是否有 SSH/SCP
$hasScp = Get-Command scp -ErrorAction SilentlyContinue
$hasSsh = Get-Command ssh -ErrorAction SilentlyContinue

if (-not $hasScp -or -not $hasSsh) {
    Write-Host "❌ 错误: 未找到 ssh 或 scp 命令" -ForegroundColor Red
    Write-Host "请安装 OpenSSH 客户端或使用 Git Bash" -ForegroundColor Yellow
    exit 1
}

# 创建临时打包文件
$tempTar = "time-capsule-upload-$(Get-Date -Format 'yyyyMMddHHmmss').tar.gz"
Write-Host "📦 正在打包项目..." -ForegroundColor Cyan

# 使用 tar 打包（Windows 10 1803+ 内置）
$excludeItems = @(
    "node_modules",
    "dist",
    ".git",
    "*.log",
    "ios\App\Pods",
    "ios\App\Podfile.lock",
    "*.xcuserstate",
    "DerivedData",
    ".vscode",
    ".idea",
    "*.zip"
)

try {
    # 创建排除文件列表
    $excludeFile = "exclude-list.txt"
    $excludeItems | Out-File -FilePath $excludeFile -Encoding UTF8
    
    # 使用 tar 打包
    tar -czf $tempTar --exclude-from=$excludeFile .
    
    Write-Host "📤 正在上传..." -ForegroundColor Cyan
    scp $tempTar "${User}@${Host}:${Path}/"
    
    Write-Host "📦 在云Mac上解压..." -ForegroundColor Cyan
    $tarName = Split-Path $tempTar -Leaf
    ssh "${User}@${Host}" "cd $Path && tar -xzf $tarName && rm $tarName"
    
    # 清理本地临时文件
    Remove-Item $tempTar -Force
    Remove-Item $excludeFile -Force
    
    Write-Host ""
    Write-Host "✅ 上传完成！" -ForegroundColor Green
    
} catch {
    Write-Host "❌ 上传失败: $_" -ForegroundColor Red
    if (Test-Path $tempTar) {
        Remove-Item $tempTar -Force
    }
    if (Test-Path $excludeFile) {
        Remove-Item $excludeFile -Force
    }
    exit 1
}

Write-Host ""
Write-Host "📋 下一步操作:" -ForegroundColor Green
Write-Host "1. 连接到云Mac:"
Write-Host "   ssh ${User}@${Host}"
Write-Host ""
Write-Host "2. 进入项目目录:"
Write-Host "   cd $Path"
Write-Host ""
Write-Host "3. 安装依赖（如果需要）:"
Write-Host "   npm install"
Write-Host ""
Write-Host "4. 打开 Xcode 项目:"
Write-Host "   npx cap open ios"
Write-Host ""
Write-Host "✨ 完成！" -ForegroundColor Green

