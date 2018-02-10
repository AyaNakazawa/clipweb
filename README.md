
# clipweb
Code share web app

## Description
clipweb is a web application for managing and sharing program code on the web browser.

It works with browsers supporting ECMAScript 6.
Since Ajax is used for all communication, we do not reload the page.

Some communication information such as authentication information is encrypted or hashed even if SSL/TLS is not used.
And each code can be encrypted arbitrarily.

## Installing

1. Set up the web server.
2. Make CGI executable.
3. Allow .htaccess or make .py executable as CGI.
4. Restart web server.
5. Set up python 3.
6. Initialize src/python/db/clipweb.db
7. Grant write authority to src/python/db/clipweb.db
8. Grant write authority to src/python/db/
9. Grant execution authority to src/python/*.py
10. Fit src/python/*.py shebang to the execution environment.
11. Delete src/sass/mylib/debug.scss
12. Compile src/sass/main.scss to src/css/main.css
13. Delete src/sass/
14. Deploy the src/

## Licence

[MIT License](/LICENSE)

## Author

[ayatec](https://github.com/ayatec)
