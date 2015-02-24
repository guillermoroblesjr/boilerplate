module.exports = function(grunt) {

  grunt.config('copy', {
    main: {
      files: [
        // includes files within path and its sub-directories
       {expand: true, flatten: false, src: ['app/**'], dest: 'tmp/', filter: 'isFile'},


        // includes files within path
        // {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

        // includes files within path and its sub-directories
        // {expand: true, src: ['app/**'], dest: 'temp/'},

        // makes all src relative to cwd
        // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

        // flattens results to a single level
        {expand: false, flatten: true, src: ['app/*'], dest: 'tmp/', filter: 'isFile'},
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
