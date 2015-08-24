# react-boilerplate

- `npm install -g git+ssh://git@github.com:gulpjs/gulp.git#4.0`
- `npm install`
- `gulp --tasks-simple`

- `gulp lint`

- `gulp editorconfig`

- `gulp build`
- `gulp build --release`
- `gulp build --watch` (watch can also be a number to set Webpacks aggregateTimeout)
- `gulp build --livereload` (will turn on `--watch` as it is required. Also takes an aggregateTimeout value to use with watch)

- `gulp serve --livereload` (will use the livereload middleware that can be used in conjunction with the livereload build task)

- `gulp test` (runs unit tests)
- `gulp test --ci` (runs unit tests in continuous integration mode, i.e. re-runs tests when a file changes)
