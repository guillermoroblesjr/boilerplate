module.exports = function(grunt) {

  grunt.config('connect', {
    options: {
      hostname: 'localhost',
      base: 'tmp/app',
    },
    dev: {},
    prod: {
      options: {
        keepalive: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};
