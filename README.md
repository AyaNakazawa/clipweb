
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
7. Grant read and write authority to src/python/db/clipweb.db
8. Grant execution authority to src/python/*.py
9. Fit src/python/*.py shebang to the execution environment.
10. Delete src/sass/mylib/debug.scss
11. Compile src/sass/main/sass
12. Delete src/sass
13. Deploy the src directory.

## Licence

[MIT License](/LICENSE)

## Author

[ayatec](https://github.com/ayatec)
