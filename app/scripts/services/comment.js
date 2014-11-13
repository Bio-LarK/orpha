'use strict';

/**
 * @ngdoc service
 * @name orphaApp.Comment
 * @description
 * # Comment
 * Factory in the orphaApp.
 */
angular.module('orphaApp')
  .factory('Comment', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
