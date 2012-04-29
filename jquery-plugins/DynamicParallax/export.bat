set origDir=%CD%
del ..\_export /s/f/q
appia.exe -e ..\_export

rem RUN REQUIREJS BUILD
rem node tools\r.js -o app.build.js

rem REMOVE UNWANTED FILES
cd ..\_export
for /f "tokens=* delims=" %%i in ('dir /s /b /a:d *svn') do (
  rd /s /q "%%i"
)

rem IF YOU WANT TO MOVE HOME TO INDEX
del index.html
copy home.html index.html

rem GO BACK TO PROJECT FOLDER
cd %origDir%
