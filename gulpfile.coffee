gulp = require 'gulp'
uglify = require 'gulp-uglify'
minifyCSS = require 'gulp-minify-css'
autoprefixer = require 'gulp-autoprefixer'
minifyHTML = require 'gulp-minify-html'
s3 = require 'gulp-s3'
gzip = require 'gulp-gzip'
fs = require 'fs'
concat = require 'gulp-concat'
del = require 'del'
webpack = require 'gulp-webpack'

aws = JSON.parse fs.readFileSync("aws.json").toString()

s3options =
  "gzippedOnly": true
  headers: {'Cache-Control': 'max-age=172800, no-transform, public'}

gulp.task 'clean', ->
  del.sync ['dist/**']

gulp.task 'webpack', ['clean'], ->
  gulp.src 'src/app/app.ts'
  .pipe webpack require './webpack.config.js'
  .pipe gulp.dest 'src/'

gulp.task 'js', ['webpack'], ->
  gulp.src "src/bundle.js"
  .pipe uglify()
  .pipe gulp.dest 'dist/'

gulp.task 'css', ->
  gulp.src "src/**/*.css"
  .pipe concat 'main.css'
  .pipe autoprefixer()
  .pipe minifyCSS()
  .pipe gulp.dest 'dist/'

gulp.task 'html', ->
  gulp.src "src/index.html"
  .pipe minifyHTML()
  .pipe gulp.dest 'dist/'

gulp.task 'assets', ->
  gulp.src "src/**/*.png"
  .pipe gulp.dest 'dist/'

gulp.task 'dependencies', ->
  gulp.src ["node_modules/reflect-metadata/Reflect.js", "node_modules/zone.js/dist/zone.js"]
  .pipe concat 'dependencies.js'
  .pipe uglify()
  .pipe gulp.dest 'dist/'

gulp.task 'build', ['js', 'css','html','assets', 'dependencies'], ->

gulp.task 's3', ->
  gulp.src ['dist/index.html', 'dist/dependencies.js', 'dist/bundle.js', 'dist/main.css', 'dist/favicon.png']
  .pipe gzip()
  .pipe s3 aws, s3options