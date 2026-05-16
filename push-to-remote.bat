@echo off
cd /d "d:\projects\eventure-web"

echo Fixing git ownership issue...
git config --global --add safe.directory D:/projects/eventure-web

echo Setting git user config...
git config user.email "bot@github.com"
git config user.name "Copilot"

echo Adding all files...
git add .
if errorlevel 1 goto error

echo Committing changes...
git commit -m "Initial commit: Eventure project

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>" --allow-empty
if errorlevel 1 goto error

echo Removing old remote if exists...
git remote remove origin 2>nul

echo Adding new remote...
git remote add origin https://github.com/darkie8055/Eventure.git
if errorlevel 1 goto error

echo Renaming branch to main...
git branch -M main
if errorlevel 1 goto error

echo Pushing to GitHub...
git push -u origin main --force
if errorlevel 1 goto error

echo.
echo SUCCESS: Repository connected and pushed to https://github.com/darkie8055/Eventure.git
goto end

:error
echo ERROR occurred during git operation!
:end
pause
