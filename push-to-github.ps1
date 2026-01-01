# Push project to GitHub repository
# Repository: https://github.com/joyaries77-blip/try

Write-Host "=== Pushing project to GitHub ===" -ForegroundColor Green
Write-Host "Repository: https://github.com/joyaries77-blip/try" -ForegroundColor Cyan
Write-Host ""

# Check if in project directory
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] package.json not found" -ForegroundColor Red
    Write-Host "Please run this script in the project root directory" -ForegroundColor Yellow
    exit 1
}

# Initialize Git if needed
if (-not (Test-Path .git)) {
    Write-Host "[INFO] Initializing Git..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "[INFO] Adding files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "[INFO] Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: Time Capsule iOS app"

# Set branch to main
Write-Host "[INFO] Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Remove existing remote if any
Write-Host "[INFO] Configuring remote repository..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/joyaries77-blip/try.git

# Push to GitHub
Write-Host "[INFO] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "This may require authentication..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/joyaries77-blip/try" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps on Mac:" -ForegroundColor Yellow
    Write-Host "1. Open Terminal" -ForegroundColor White
    Write-Host "2. Run: git clone https://github.com/joyaries77-blip/try.git" -ForegroundColor White
    Write-Host "3. Run: cd try" -ForegroundColor White
    Write-Host "4. Run: ./scripts/setup-and-build.sh" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "[ERROR] Push failed" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "1. Need to authenticate with GitHub" -ForegroundColor White
    Write-Host "2. Repository permissions issue" -ForegroundColor White
    Write-Host ""
    Write-Host "Try:" -ForegroundColor Yellow
    Write-Host "1. Visit https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Create a Personal Access Token" -ForegroundColor White
    Write-Host "3. Use token as password when pushing" -ForegroundColor White
}

