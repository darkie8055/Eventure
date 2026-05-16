@echo off
cd /d "d:\projects\eventure-web"

echo Fixing git ownership issue...
git config --global --add safe.directory D:/projects/eventure-web

echo Initializing Git repository...
git init
if errorlevel 1 goto error

echo Adding files...
git add .
if errorlevel 1 goto error

echo Creating initial commit...
git config user.email "bot@github.com"
git config user.name "Copilot Bot"
git commit -m "Initial commit: Eventure project

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
if errorlevel 1 goto error

echo Setting up remote...
git remote add origin https://github.com/darkie8055/Eventure.git
if errorlevel 1 goto error

echo Renaming branch to main...
git branch -M main
if errorlevel 1 goto error

echo Pushing to GitHub...
git push -u origin main
if errorlevel 1 goto error

echo.
echo SUCCESS: Project pushed to GitHub!
goto end

:error
echo ERROR occurred during git operation!
:end
pause
