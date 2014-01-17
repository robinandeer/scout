# ----------------------------------------------------------------------
#  Grunt.js Task File
# ----------------------------------------------------------------------
# Makes a folder avaliable as a static resource to the broswer
#   @connect - The connect instance
#   @dir     - The static directory to make available
mountFolder = (connect, dir) ->
  return connect.static require('path').resolve(dir)

# Configure Grunt
module.exports = (grunt) ->
  # Load all the grunt tasks that are installed as dev dependencies
  # Replaces manually loading every NPM task!
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    folders:
      app: 'app'
      www: 'scout/static'
      tmp: '.tmp'
      public: 'public'

    # Livereload JS, HTML and Ember.js templates, inject CSS.
    # http://draftingcode.com/2013/06/subtle-live-reloading-with-grunt-and-compass/
    watch:
      # Watch coffescript files in the "app" directory and one level down.
      coffee:
        files: ['<%= folders.app %>/{,*/}/*.coffee']
        tasks: ['coffee']
        # Reload the browser
        options: { livereload: true }

      # Watch Ember.js templates in templates sub-directory and one level down.
      # The "author/index" template should be in a "templates/author" folder
      emberTemplates:
        files: ['<%= folders.app %>/templates/{,*/}/*.{hbs,hjs,handlebars}']
        tasks: ['emberTemplates']
        # Reload the browser
        options: { livereload: true }

      # Watch sass files in the styles sub-directory and one level down.
      # N.B. Don't reload the browser! We want to simply inject new CSS.
      sass:
        files: ['<%= folders.app %>/styles/{,*/}/*.{sass,scss}']
        tasks: ['sass:server']

      # Watch static files (HTML, images, etc.)
      copy:
        files: ['<%= folders.public %>/{,*/}/*']
        tasks: ['copy:server']
        options: { livereload: true }

      # This is how we can inject CSS into the page without reloading!
      livereload:
        files: ['<%= folders.tmp %>/styles/*.css']
        options: { livereload: true }

    # Connect is used to set up a development server
    connect:
      options:
        port: 9000
        # change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'

      # Development task options
      server:
        options:
          middleware: (connect) ->
            return [
              require('connect-livereload')(),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, '.')         # Enable source maps
            ]

    # Automatically open a web browser tab
    open:
      server:
        path: 'http://localhost:<%= connect.options.port %>'

    # Clean up the compile folders
    clean:
      www:
        files: [
          dot: yes
          src: [
            '<%= folders.www %>/*',
            '!<%= folders.www %>/.git*'
          ]
        ]

      server: '<%= folders.tmp %>'

    # Sass (only .scss) tasks
    sass:
      server:
        options:
          debugInfo: yes
          sourcemap: yes

        files:
          '<%= folders.tmp %>/styles/app.css': ['<%= folders.app %>/styles/app.scss']

      www:
        files: '<%= folders.www %>/styles/app.css': ['<%= folders.app %>/styles/app.scss']

    # Precompiles handlebars templates to speed up app loading and allow us to
    # only load the handlebars runtime.
    emberTemplates:
      compile:
        options:
          templateBasePath: /app\/templates\//
          templateFileExtensions: /\.(hbs|hjs|handlebars)/

        files:
            '<%= folders.tmp %>/templates.js': '<%= folders.app %>/templates/**/*.{hbs,hjs,handlebars}'

    # Coffescript tasks
    coffee:
      options:
        # Skip the safety function wrapper (prepare for ES6 transpile)
        bare: yes
        join: yes  # Until I get ES6 setup

      server:
        options:
          sourceMap: yes

        files: [
          '<%= folders.tmp %>/app.js': '<%= folders.app %>/**/*.coffee'
        ]

      www:
        files: [
          '<%= folders.www %>/app.js': '<%= folders.app %>/**/*.coffee'
        ]

    # Copies all the static content and vendor JS libs to be served to the
    # browser.
    copy:
      server:
        files: [
          expand: true
          cwd: '<%= folders.public %>'
          src: ['**']
          dest: '<%= folders.tmp %>/'
        ]

      www:
        files: [
          expand: true
          cwd: '<%= folders.public %>'
          src: ['**']
          dest: '<%= folders.www %>/'
        ,
          src: '<%= folders.tmp %>/templates.js'
          dest: '<%= folders.www %>/templates.js'
        ]

  grunt.registerTask 'server', (target) ->

    grunt.task.run [
      'clean:server',
      'coffee:server',
      'emberTemplates',
      'sass:server',
      'copy:server',
      'connect:server',
      'open',
      'watch'
    ]

  grunt.registerTask 'build', [
    'clean:www',
    'coffee:www',
    'emberTemplates',
    'sass:www',
    'copy:www'
  ]