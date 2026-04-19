@echo off
echo ========================================
echo   TOTAL RESET: Fixing GitHub Push
echo ========================================

echo 1. Physically deleting large files from disk...
del /s /q out.zip
del /s /q "public\screenshots\Antigravity (1).exe"
del /s /q "public\screenshots\Antigravity.exe"
rmdir /s /q .next
rmdir /s /q node_modules
rmdir /s /q out

echo.
echo 2. Wiping Git memory completely...
git checkout --orphan total_reset_branch
git rm -rf . --cached

echo.
echo 3. Re-indexing files (clean and small)...
git add .

echo.
echo 4. Creating a clean initial commit...
git commit -m "Initial clean commit: Removed large files"

echo.
echo 5. Moving to main branch...
git branch -M main

echo.
echo 6. Optimizing push settings...
git config --global http.postBuffer 524288000

echo.
echo 7. Force-pushing to GitHub...
git push -f origin main

echo.
echo ========================================
echo   FINISHED! Your repository is now clean.
echo ========================================
pause
