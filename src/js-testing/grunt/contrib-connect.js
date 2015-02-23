module.exports = function(grunt) {

  grunt.config('connect', {
    options: {
      hostname: 'localhost',
      base: 'tmp',
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
