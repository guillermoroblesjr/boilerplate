module.exports = function(grunt) {

  grunt.config('blanket-mocha', {
    blanket_mocha : {
        test: {
            src: ['test.html'],
            options : {
                threshold : 60,
                globalThreshold : 65,
                log : true,
                logErrors: true,
                moduleThreshold : 60,
                modulePattern : "./src/(.*?)/",
                customThreshold: {
                    './src/spelling/plurals.js': 50
                }
            }
        }

    }
  });

  grunt.loadNpmTasks('grunt-blanket-mocha');

};
