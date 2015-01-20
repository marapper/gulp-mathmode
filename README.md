# grunt-mathmode

Turn LaTeX math expressions into images.

Based on [mathmode](https://www.npmjs.com/package/mathmode).

## Install

Install with npm.

```
npm install --save-dev gulp-mathmode
```

## LaTeX math expressions

[List of possible math](http://en.wikibooks.org/wiki/LaTeX/Mathematics)

### Usage Examples

Turns list of tex-files into png-images with the same names.    

```js
var srcPath = 'src/**/*.tex';
var buildPath = 'build/**/*.tex';

gulp.task('clean', function () {
    var clean = require('gulp-clean');
    return gulp.src(buildPath + '/*.png', {read: false})
        .pipe(clean());
});

gulp.task('math', ['clean'], function () {
    var math = require('gulp-mathmode'),
        rename = require("gulp-rename");
    gulp.src(srcPath)
        .pipe(math({
            format: format,
            dpi: 300
        }))
        .pipe(rename({extname: '.' + format}))
        .pipe(gulp.dest(buildPath));
});
```

### Configuration

Look at [mathmode configs](https://www.npmjs.com/package/mathmode).

```js
require('gulp-mathmode')({
    format: 'png',
    dpi: 300,
    packages: ["amsmath"],
    macros: "",
    pdflatex_path: "pdflatex",
    imagemagick_path: "convert"
}
```
