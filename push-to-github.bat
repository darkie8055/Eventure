@echo off
cd /d "d:\projects\eventure-web"

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Eventure project

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

REM Add remote
git remote add origin https://github.com/darkie8055/Eventure.git

REM Push to main branch
git branch -M main
git push -u origin main

echo.
echo Push completed!
pause
