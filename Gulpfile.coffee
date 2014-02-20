gulp = require 'gulp'
coffee = require 'gulp-coffee'
sass = require 'gulp-ruby-sass'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
refresh = require 'gulp-livereload'
gulpif = require 'gulp-if'
csso = require 'gulp-csso'
uglify = require 'gulp-uglify'
replace = require 'gulp-replace'
emberTemplates = require 'gulp-ember-templates'

lr = require 'connect-livereload'
lrServer = require('tiny-lr')()
express = require 'express'
lrPort = 35729
serverPort = 8080

# Gulp can either setup development or produce as distribution
isDist = gutil.env._[0] is 'dist'
if isDist
  ROOT = 'scout'
  gutil.log 'Running Gulp in', gutil.colors.cyan('production'), 'mode'
else
  ROOT = 'dev-server'
  gutil.log 'Running Gulp in', gutil.colors.cyan('development'), 'mode'

# +--------------------------------------------------------------------+
# |  Express server configuration
# |  - Configure here, start when running the watch task
# +--------------------------------------------------------------------+
server = express()
# Register ejs with .html extention
server.engine '.html', require('ejs').__express
# Without this you would need to supply the extension to res.render()
# ex: res.render('users.html').
server.set 'view engine', 'html'
server.get '/', (req, res) ->
  res.render "#{__dirname}/dev-server/views/index",
    title: 'index'

# Add livereload middleware before static-middleware
server.use lr({ port: lrPort })
# Serve static files from /static/...
server.use '/static', express.static("#{__dirname}/dev-server/static")

# Task for serving static content and basic websites
gulp.task 'serve', ->
  # Set up your static fileserver, which serves files in the build dir
  server.listen serverPort

  # Set up your livereload server
  lrServer.listen lrPort

# +--------------------------------------------------------------------+
# |  Individual gulp tasks
# +--------------------------------------------------------------------+
# Task for SCSS through gulp-ruby-sass
gulp.task 'sass', ->
  options =
    quiet: yes  # Don't blurt out tonnes of deprecation comments
    sourcemap: !isDist

  gulp.src(['client/styles/app.scss'])
      .pipe(sass(options))
      .pipe(gulpif(isDist, csso()))
      .pipe(gulp.dest("#{ROOT}/static/styles/"))
      .pipe(refresh(lrServer))

# Task for compiling CoffeeScript files
gulp.task 'coffee', ->
  options =
    bare: yes  # Skip the safety function wrapper
    #sourceMap: yes

  gulp.src(['client/scripts/{,*/}/*.coffee'])
      .pipe(coffee(options))
      .pipe(concat('app.js'))
      .pipe(gulpif(false, uglify()))
      .pipe(gulpif(isDist, replace('http://localhost:5000', '')))
      .pipe(gulp.dest("#{ROOT}/static/js/"))
      .pipe(refresh(lrServer))

# Task for precompiling Ember.js handlebars templates
gulp.task 'templates', ->
  options =
    basePath: 'client/templates/'
    fileExtension: '.hbs'

  gulp.src(['client/templates/{,*/}/*.hbs'])
      .pipe(emberTemplates(options))
      .pipe(concat('templates.js'))
      .pipe(gulpif(isDist, uglify()))
      .pipe(gulp.dest("#{ROOT}/static/js/"))
      .pipe(refresh(lrServer))

# Tasks for copying static files
gulp.task 'copy-images', ->
  gulp.src('client/static/img/*')
      .pipe(gulp.dest("#{ROOT}/static/img/"))
      .pipe(refresh(lrServer))

gulp.task 'copy-js', ->
  gulp.src('client/static/js/vendor/ember-model/ember-model.js')
      .pipe(gulp.dest("#{ROOT}/static/js/vendor/ember-model/"))
      .pipe(refresh(lrServer))

# Convenience task for reloading the browser
gulp.task 'reload', ->
  gulp.src(['dev-server/views/index.html'], { read: no })
      .pipe(refresh(lrServer))

# +--------------------------------------------------------------------+
# |  Combo gulp tasks
# +--------------------------------------------------------------------+
# Convenience task for running a one-off build
gulp.task 'build', ['copy-images', 'copy-js', 'sass', 'coffee', 'templates']

gulp.task 'watch', ->
  # Watch static files
  gulp.watch 'client/static/{,*/}/*', ['reload']

  # Watch SCSS files
  gulp.watch 'client/styles/{,*/}/*.scss', ['sass']

  # Watch CoffeeScript files
  gulp.watch 'client/scripts/{,*/}/*.coffee', ['coffee']

  # Watch Ember.js handlebars templates
  gulp.watch 'client/templates/{,*/}/*.hbs', ['templates']

  # Watch view/HTML files
  gulp.watch 'dev-server/views/{,*/}/*.html', ['reload']

# +--------------------------------------------------------------------+
# |  Command line initiated gulp tasks
# +--------------------------------------------------------------------+
gulp.task 'default', ['build', 'serve', 'watch']

gulp.task 'dist', ['build']
