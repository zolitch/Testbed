rem **********************************************
rem Get the latest version of mustache
rem **********************************************
wget --no-check-certificate https://raw.github.com/janl/mustache.js/master/wrappers/requirejs/mustache.js.pre
wget --no-check-certificate https://raw.github.com/janl/mustache.js/master/wrappers/requirejs/mustache.js.post
wget --no-check-certificate https://raw.github.com/janl/mustache.js/master/mustache.js
copy /b requirejs.mustache.js.tpl.pre+mustache.js+requirejs.mustache.js.tpl.post  ..\lib\mustache.js
del *.pre
del *.post
del mustache.js
