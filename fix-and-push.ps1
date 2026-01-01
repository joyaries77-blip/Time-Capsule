# Fix Git configuration and push to GitHub
# Repository: https://github.com/joyaries77-blip/try

Write-Host "=== Fixing Git and pushing to GitHub ===" -ForegroundColor Green
Write-Host ""

# Check if in project directory
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] package.json not found" -ForegroundColor Red
    exit 1
}

# Configure Git user (if not configured)
Write-Host "[INFO] Configuring Git user..." -ForegroundColor Yellow
$gitUser = git config --global user.name
$gitEmail = git config --global user.email

if (-not $gitUser) {
    Write-Host "Git user name not configured" -ForegroundColor Yellow
    Write-Host "Please enter your name (or press Enter to skip):" -ForegroundColor Cyan
    $name = Read-Host
    if ($name) {
        git config --global user.name $name
    }
}

if (-not $gitEmail) {
    Write-Host "Git email not configured" -ForegroundColor Yellow
    Write-Host "Please enter your email (or press Enter to use default):" -ForegroundColor Cyan
    $email = Read-Host
    if ($email) {
        git config --global user.email $email
    } else {
        git config --global user.email "user@example.com"
    }
}

# Initialize Git if needed
if (-not (Test-Path .git)) {
    Write-Host "[INFO] Initializing Git..." -ForegroundColor Yellow
    git init
}

# Check if there are any commits
$hasCommits = git rev-parse --verify HEAD 2>$null

if (-not $hasCommits) {
    Write-Host "[INFO] No commits found, creating initial commit..." -ForegroundColor Yellow
    
    # Add all files
    Write-Host "[INFO] Adding files..." -ForegroundColor Yellow
    git add .
    
    # Commit
    Write-Host "[INFO] Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: Time Capsule iOS app"
} else {
    Write-Host "[INFO] Commits found, checking status..." -ForegroundColor Yellow
    git status
}

# Set branch to main
Write-Host "[INFO] Setting branch to main..." -ForegroundColor Yellow
git branch -M main

# Configure remote
Write-Host "[INFO] Configuring remote repository..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/joyaries77-blip/try.git

# Push to GitHub
Write-Host ""
Write-Host "[INFO] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may need to enter your GitHub username and Personal Access Token" -ForegroundColor Cyan
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[SUCCESS] Code pushed to GitHub successfully!" -ForegroundColor Green
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
    Write-Host ""
    Write-Host "To fix authentication:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Click 'Generate new token' -> 'Generate new token (classic)'" -ForegroundColor White
    Write-Host "3. Select 'repo' scope" -ForegroundColor White
    Write-Host "4. Generate and copy the token" -ForegroundColor White
    Write-Host "5. When pushing, use the token as password" -ForegroundColor White
}

