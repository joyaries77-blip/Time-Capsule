# Prepare project files for Mac transfer
# Run this script in PowerShell

Write-Host "=== Preparing project files for Mac ===" -ForegroundColor Green
Write-Host ""

# Check if in project directory
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] package.json not found" -ForegroundColor Red
    Write-Host "Please run this script in the project root directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "[INFO] Current directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Check Git status
if (Test-Path .git) {
    Write-Host "[OK] Git already initialized" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current Git status:" -ForegroundColor Cyan
    git status
    Write-Host ""
} else {
    Write-Host "[INFO] Initializing Git..." -ForegroundColor Yellow
    git init
    Write-Host "[OK] Git initialized" -ForegroundColor Green
    Write-Host ""
}

# Add all files
Write-Host "[INFO] Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "[OK] Files added" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "[INFO] Committing changes..." -ForegroundColor Yellow
$commitMessage = "Ready for iOS build"
git commit -m $commitMessage
Write-Host "[OK] Commit completed" -ForegroundColor Green
Write-Host ""

# Check remote repository
Write-Host "[INFO] Checking remote repository..." -ForegroundColor Yellow
$remotes = git remote -v
if ($remotes) {
    Write-Host "[OK] Remote repository configured:" -ForegroundColor Green
    Write-Host $remotes
    Write-Host ""
    Write-Host "[INFO] Pushing to remote repository..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Push successful!" -ForegroundColor Green
    } else {
        Write-Host "[WARNING] Push failed, please check remote repository configuration" -ForegroundColor Yellow
    }
} else {
    Write-Host "[WARNING] No remote repository configured" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Visit https://github.com to create a new repository (if you don't have an account)" -ForegroundColor White
    Write-Host "2. Run the following command to add remote repository:" -ForegroundColor White
    Write-Host "   git remote add origin <your-github-repo-url>" -ForegroundColor Yellow
    Write-Host "3. Run the following command to push code:" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or use cloud storage to transfer files" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=== Completed ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps on Mac:" -ForegroundColor Cyan
Write-Host "1. Open Terminal" -ForegroundColor White
Write-Host "2. Run: git clone <your-repo-url>" -ForegroundColor Yellow
Write-Host "3. Run: cd Time-Capsule" -ForegroundColor Yellow
Write-Host "4. Run: ./scripts/setup-and-build.sh" -ForegroundColor Yellow
