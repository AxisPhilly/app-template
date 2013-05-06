module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['js/app.js']
    },
    uglify: {
      options: {
        mangle: false,
        preserveComments: true
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
    concat: {
      dist: {
        src: ['css/lib/*'],
        dest: 'www/css/libraries.css'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['css/lib/*'], dest: 'www/'},
          {expand: true, src: ['img/lib/**'], dest: 'www/'},
          {expand: true, src: ['img/**'], dest: 'www/'}
        ]
      }
    },
    shell: {
      build: {
        command: 'NODE_ENV=production PORT=3001 node build.js'
      }
    },
    s3: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'apps.axisphilly.org',
      access: 'public-read',
      upload: [
        {
          src: 'www/*',
          dest: '<%= pkg.name %>'
        },
        {
          src: 'www/js/*',
          dest: '<%= pkg.name %>/js'
        },
        {
          src: 'www/css/*',
          dest: '<%= pkg.name %>/css'
        },
        {
          src: 'www/data/*',
          dest: '<%= pkg.name %>/data'
        },
        {
          src: 'www/img/**',
          dest: '<%= pkg.name %>/img'
        }
      ]
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ''); // Intentionally left blank in the interest of being explicit

  grunt.registerTask('build', ['jshint', 'uglify', 'sass', 'concat', 'copy', 'shell']);
  grunt.registerTask('deploy', ['s3']);

};