@echo off
REM Setup Global Gypsum Generated Assets
echo Moving generated images to project directory...

set GENERATED_DIR=C:\Users\Admin\.gemini\antigravity\brain\06f3265f-bbaa-41cd-b16a-a4efa93a2deb
set TARGET_DIR=d:\globalgypsum\globalgypsum\new-website\images\products

mkdir "%TARGET_DIR%" 2>nul

copy "%GENERATED_DIR%\g1_features_png_1776334390244.png" "%TARGET_DIR%\g1-features.png"
copy "%GENERATED_DIR%\g2_banner_png_1776334446997.png" "%TARGET_DIR%\g2-hero.png"
copy "%GENERATED_DIR%\rock_main_png_1776334476028.png" "%TARGET_DIR%\rock-hero.png"
copy "%GENERATED_DIR%\bond_mix_png_1776334502152.png" "%TARGET_DIR%\bond-mix.png"
copy "%GENERATED_DIR%\bond_apply_png_1776334526451.png" "%TARGET_DIR%\bond-apply.png"
copy "%GENERATED_DIR%\bond_finish_png_1776334552373.png" "%TARGET_DIR%\bond-finish.png"
copy "%GENERATED_DIR%\about_us_png_1776334858545.png" "d:\globalgypsum\globalgypsum\new-website\images\about-us.png"
copy "%GENERATED_DIR%\bond_brush_png_1776335689746.png" "%TARGET_DIR%\bond-brush.png"

echo Done! Please refresh your website.
pause
