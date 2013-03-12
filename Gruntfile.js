module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['js/app.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      app: {
        files: {
          'www/js/app.min.js': 'js/app.js'
        }
      },
      lib: {
        files: {
          'www/js/app.libraries.min.js': 'js/lib/*'
        }
      }
    },
    sass: {
      www: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/app.css': 'sass/css/app.scss'
        }
      }
    },
    shell: {
      build: {
        command: 'NODE_ENV=production node build.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ''); // Intentionally left blank in the interest of being explicit

  grunt.registerTask('build', ['jshint', 'uglify', 'sass', 'shell']);

};