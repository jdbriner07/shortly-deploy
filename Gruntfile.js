module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      bar: {src: ['./public/client/*.js'],
        dest: './public/dist/deployment.js'},
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      bar: {src: './public/dist/deployment.js',
            dest: './public/dist/deployment.min.js'},
      jquery: {src: './public/lib/jquery.js',
            dest: './public/dist/jquery.min.js'},
      backbone: {src: './public/lib/backbone.js',
            dest: './public/dist/backbone.min.js'},
      underscore: {src: './public/lib/underscore.js',
            dest: './public/dist/underscore.min.js'},
      handlebars: {src: './public/lib/handlebars.js',
            dest: './public/dist/handlebars.min.js'},
    },

    eslint: {
      target: [
        // Add list of files to lint here
        './public/dist/*.js',
        './public/client/*.js'
      ]
    },

    cssmin: {
      foo: {src: './public/style.css',
            dest: './public/dist/style.min.css'}
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: ['git add .',
          'git commit -m "auto commit to server due to production change"',
          'git push live master'].join(' && ')
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    grunt.task.run([
      // add your deploy tasks here
      'eslint', 'concat', 'uglify'
    ]);
    if (grunt.option('prod')) {
      grunt.task.run(['shell']);      
    }
  });
};
