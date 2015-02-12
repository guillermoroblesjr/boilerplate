(function(window, undefined){

  'use strict';

  // Object.create() Pollyfills (these run automatically if needed)
  // Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  (function(window, undefined){

    'use strict';
    
    // Sexy polyfill
    if (typeof Object.create !== 'function') {
      Object.create = (function() {
        var Class = function() {};
        
        return function (prototype) {
          if (arguments.length > 1) {
            throw Error('Second argument not supported');
          }
          if (typeof prototype != 'object') {
            throw TypeError('Argument must be an object');
          }
          Class.prototype = prototype;
          var result = new Class();
          Class.prototype = null;
          return result;
        };

      })();
    }

    // Simple polyfill
    // var createObject = function(proto) {
    //     var Class = function Class(){};
    //     Class.prototype = proto;
    //     return new Class();
    // };
  })(window);

  var Class = function Class(){
    Object.call(this);
    return this;
  };
  Class.prototype = Object.create(Object.prototype);
  Class.prototype.constructor = Class;
  
  Class.prototype.make = function make(fn, parent){
    parent = parent || Object;
    // since the user isn't using <parent-fn>.call(this);
    // to inherit the parent properties we'll have to add
    // them to the prototype manually
    var child = function(){
      parent.call(this);
      return this;
    };
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = fn;
    var insFn = new fn();
    var obj = {};
    for (var x in insFn) {
        child.prototype[x] = insFn[x];
    }
    // fn.prototype = Object.create(parent.prototype);
    // fn.prototype.constructor = fn;
    return child;
  };

  // Attach to the window
  window.Class = Object.create(Class.prototype);
})(window);