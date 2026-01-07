@echo off
echo [ELITE PROTOCOL DEPLOYER]
echo =========================
echo.

echo 1. Adding files...
git add .
if %errorlevel% neq 0 (
    echo [ERROR] Git Add failed.
    pause
    exit /b
)

echo 2. Committing changes...
git commit -m "deploy: quick update via script"
if %errorlevel% neq 0 (
    echo [ERROR] Git Commit failed (maybe nothing to commit?).
)

echo 3. Pushing to main...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Git Push failed.
    pause
    exit /b
)

echo.
echo [SUCCESS] Deployed to GitHub.
echo Changes should be live in ~2 minutes.
pause
