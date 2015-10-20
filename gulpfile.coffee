gulp = require 'gulp'
uglify = require 'gulp-uglify'
minifyCSS = require 'gulp-minify-css'
autoprefixer = require 'gulp-autoprefixer'
minifyHTML = require 'gulp-minify-html'
s3 = require 'gulp-s3'
gzip = require 'gulp-gzip'
fs = require 'fs'

aws = fs.readFileSync("aws.json")
  
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

gulp.task 'build', ['js','css','html','assets'], ->

gulp.task 's3', ->
  gulp.src 'dist/**/*'
  .pipe gzip()
  .pipe s3 aws, s3options