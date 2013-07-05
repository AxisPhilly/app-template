// For setting expires header
// Set to 1 year ahead of today
var d = new Date();
d.setDate(d.getDate() + 365);
future = d.toUTCString();

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['js/app.js']
    },
    uglify: {
      options: {
        mangle: false,
        preserveComments: 'some'
      },
      app: {
        options: {
          preserveComments: true
        },
        files: {
          'www/js/app.min.<%= pkg.version %>.js': 'js/app.js'
        }
      },
      lib: {
        files: {
          'www/js/app.libraries.min.<%= pkg.version %>.js': [
            'js/lib/fastclick.js',
            'js/lib/foundation.js'
          ]
        }
      }
    },
    concat: {
      dist: {
        src: [
          'css/lib/site.css'
          ],
        dest: 'www/css/app.libraries.<%= pkg.version %>.css'
      }
    },
    sass: {
      www: {
        options: {
          style: 'compressed'
        },
        files: {
          'www/css/app.<%= pkg.version %>.css': 'sass/css/app.scss'
        }
      }
    },
    shell: {
      build: {
        command: 'NODE_ENV=production PORT=3001 node build.js'
      }
    },
    copy: {
      main: {
        files: [
          // Even though most of the files in css/lib and js/lib 
          // are concatenated into app.libraries.css and app.libararies.js, respectively,
          // we'll copy the individuals files to www so that conditional css files
          // and to js libraries like modernizr can still be referenced individually
          {expand: true, src: ['css/lib/*'], dest: 'www/'},
          {expand: true, src: ['js/lib/*'], dest: 'www/'},
          {expand: true, src: ['img/lib/**'], dest: 'www/'},
          {expand: true, src: ['img/**'], dest: 'www/'},
          {expand: true, src: ['data/**'], dest: 'www/'}

        ]
      }
    },
    s3: {
      key: process.env.AWS_ACCESS_KEY_ID,
      secret: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: 'apps.axisphilly.org',
      access: 'public-read',
      headers: {
        'Expires': future
      },
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
          src: 'www/img/*',
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