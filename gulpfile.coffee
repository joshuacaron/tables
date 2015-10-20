gulp = require 'gulp'
uglify = require 'gulp-uglify'
minifyCSS = require 'gulp-minify-css'
autoprefixer = require 'gulp-autoprefixer'
minifyHTML = require 'gulp-minify-html'
s3 = require 'gulp-s3'
gzip = require 'gulp-gzip'
fs = require 'fs'

aws = JSON.parse fs.readFileSync("aws.json").toString()

s3options =
  "gzippedOnly": true
  headers: {'Cache-Control': 'max-age=172800, no-transform, public'}

gulp.task 'js', ->
  gulp.src "src/**/*.js"
  .pipe uglify()
  .pipe gulp.dest 'dist/'

gulp.task 'css', ->
  gulp.src "src/**/*.css"
  .pipe autoprefixer()
  .pipe minifyCSS()
  .pipe gulp.dest 'dist/'

gulp.task 'html', ->
  gulp.src "src/**/*.html"
  .pipe minifyHTML()
  .pipe gulp.dest 'dist/'

gulp.task 'assets', ->
  gulp.src "src/**/*.png"
  .pipe gulp.dest 'dist/'

gulp.task 'dependencies', ->
  gulp.src "node_modules/angular2/bundles/**/*"
  .pipe gulp.dest 'dist/node_modules/angular2/bundles'
  gulp.src 'dependencies/ace/src-min-noconflict/**/*'
  .pipe gulp.dest 'dist/dependencies/ace/src-min-noconflict'
  gulp.src 'node_modules/systemjs/dist/**/*'
  .pipe gulp.dest 'dist/node_modules/systemjs/dist'

gulp.task 'build', ['js','css','html','assets', 'dependencies'], ->

gulp.task 's3', ->
  gulp.src 'dist/**/*'
  .pipe gzip()
  .pipe s3 aws, s3options