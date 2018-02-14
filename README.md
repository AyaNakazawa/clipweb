
# clipweb
Code share web app

## Description
clipweb is a web application for managing and sharing program code on the web browser.

It works with browsers supporting ECMAScript 6.
Since Ajax is used for all communication, we do not reload the page.

Some communication information such as authentication information is encrypted or hashed even if SSL/TLS is not used.
And each code can be encrypted arbitrarily.

## Installing

for Debian

1. Set up Web server.
2. Make CGI executable.
3. Allow .htaccess or make .py executable as CGI.
4. Restart Web server.
5. Set up Python 3.
6. Set up Sass.
7. Initialize src/python/db/clipweb.db
~~~
$ cp -f src/python/db/clipweb_init.db src/python/db/clipweb.db
~~~
8. Make owner and owning group of src/ to a Web server.
~~~
$ chown {Web server owner}:{Web server group} -R src
~~~
9. Grant write authority to src/python/db/clipweb.db
~~~
$ chmod ug+w src/python/db/clipweb.db
~~~
10. Grant write authority to src/python/db/
~~~
$ chmod ug+w src/python/db/
~~~
11. Grant exec authority to src/python/*.py
~~~
$ find src/python/ -name "*.py" -print | xargs chmod ug+x
~~~
12. Fit shebang of src/python/*.py to the execution environment.
~~~
$ find src/python/ -name "*.py" -print | xargs sed -i -e "s/^#!\/usr\/bin\/python3$/`which python3`/g"
~~~
13. Delete src/sass/mylib/debug.scss
~~~
$ rm -f src/sass/mylib/debug.scss
~~~
14. Compile src/sass/main.scss to src/css/main.css
~~~
$ sass --watch --unix-newlines --style nested src/sass/main.scss:src/css/main.css
~~~
15. Deploy the src/

## Licence

[MIT License](/LICENSE)

## Author

[ayatec](https://github.com/ayatec)
