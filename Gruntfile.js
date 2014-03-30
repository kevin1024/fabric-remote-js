module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jasmine_node: {
      all: ['spec/']
    },
    jasmine: {
      src: 'build/module.js',
      options: {
        specs: 'build/spec.js',
        version: '2.0.0',
        vendor: [
          'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js',
          'https://raw.githubusercontent.com/pivotal/jasmine-ajax/master/lib/mock-ajax.js',
        ]
      }
    },
    jshint: {
      all: 'src/*.js'
    },
    browserify: {
      dist: {
        files: {
          'build/module.js': ['src/**/*.js'],
          'build/spec.js': ['spec/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task(s).
  grunt.registerTask('test:browser', ['jshint','browserify','jasmine']);
  grunt.registerTask('test:node', ['jshint','jasmine_node']);

};
