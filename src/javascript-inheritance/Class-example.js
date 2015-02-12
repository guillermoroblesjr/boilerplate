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
    var insFn = new fn();
    // everything will come from Class.prototype
    if (parent.name === 'Object') {
      var newParent = (function(Class, fn){

        var ClassY = new Class();
        var ClassX = ClassY.make(fn, Class);
        parent = ClassX;

        var child = function(){
          parent.call(this);
          return this;
        };
        child.prototype = Object.create(Object.prototype);
        child.prototype.constructor = child;

        return child;
      })(Class, fn);
       
      newParent.prototype = Object.create(Class.prototype);
      newParent.prototype.constructor = fn;
      return newParent;
    };


    // since the user isn't using <parent-fn>.call(this);
    // to inherit the parent properties we'll have to add
    // them to the prototype manually
    var child = function(){
      parent.call(this);
      return this;
    };
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = fn;
    
    for (var x in insFn) {
        child.prototype[x] = insFn[x];
    }
    // Add the current properties
    // var keys = Object.keys(insFn);
    // var currentKey;
    // for (var i = 0, len = keys.length; i < len; i++) {
    //   currentKey = keys[i];
    //   child[currentKey] = insFn[currentKey];
    //   console.log('currentKey: ', currentKey);
    // };
    // fn.prototype = Object.create(parent.prototype);
    // fn.prototype.constructor = fn;
    

    return child;
  };
  // Useful methods
  Class.prototype.getAllKeys = function getAllKeys(){
    var keys = [];
    for (var key in this) {
        keys.push(key);
    }
    return keys;
  };
  Class.prototype.getAllProperties = function getAllProperties(){
    var properties = {};
    var keys = this.getAllKeys();
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var keyType = typeof this[key];
      if (keyType !== 'function') {
        properties[key] = this[key];
      };
    };;
    return properties;
  };
  Class.prototype.getAllMethods = function getAllMethods(){
    var properties = {};
    var keys = this.getAllKeys();
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var keyType = typeof this[key];
      if (keyType === 'function') {
        properties[key] = this[key];
      };
    };;
    return properties;
  };
  Class.prototype.getPropertiesFrom = function getPropertiesFrom(){
    //AnimalClass.prototype.isPrototypeOf(dog);
  };
  // Attach to the window
  window.Class = Object.create(Class.prototype);
})(window);

// Example Usage
(function(window, undefined){
  
  'use strict';
  
  var example1 = function(){
    // Create a class
    var AnimalClass = window.AnimalClass = Class.make(function AnimalClass(){
      this.animalThing = 2;
      this.animalFunctionToBeInherited = function(){
        console.log('I am added to the prototype!');
      };
      return this;
    });
    
    // Manually adding things to the AnimalClass prototype
    AnimalClass.prototype.numberOfEyes = 2;

    // Create a class
    var DogClass = window.DogClass = Class.make(function DogClass(){
      this.dogThing = 4;
      return this;
    }, AnimalClass);

    // Create the instances
    var dog1 = new DogClass();
    var dog2 = Object.create(DogClass.prototype);
    //console.log(new AnimalClass(), Object.create(AnimalClass.prototype));
    console.log(dog1, dog2);

    // Add things to the instance
    dog1.addedDogThing = true;
    dog1.animalThing = -5;

    dog2.addedDogThing = 'stuff goes here';
    dog2.animalThing = -69;

    console.log(dog1, dog2);
    console.log(new DogClass(), Object.create(DogClass.prototype));
    // console.log(dog.animalNonProtoFunction());
    // AnimalClass.prototype.isPrototypeOf(dog);
    // Object.getPrototypeOf(dog)
    // Object.keys(dog)
  };

  var example2 = function(){
    // Create a class
    var AnimalClass = window.AnimalClass = Class.make(function AnimalClass(){
      this.animalThing = 2;
      this.animalFunctionToBeInherited = function(){
        console.log('I am added to the prototype!');
      };
      return this;
    });
    
    // Manually adding things to the AnimalClass prototype
    AnimalClass.prototype.numberOfEyes = 2;

    var animal = new AnimalClass();
    
    var DogClass = animal.make(function DogClass(){
      this.doggieThing = 503;
      return this;
    }, AnimalClass);

    // var doggie = new DogClass();
    var doggie = Object.create(DogClass.prototype);

    var AwesomeDoggieClass = doggie.make(function AwesomeDoggieClass(){
      this.awesomeDoggieThing = 2000;
      return this;
    }, DogClass);

    // var awesomeDoggie = new AwesomeDoggieClass();
    var awesomeDoggie = Object.create(AwesomeDoggieClass.prototype);

    var SuperDoggieClass = awesomeDoggie.make(function SuperDoggieClass(){
      this.superDoggieThing = 9500;
      return this;
    }, AwesomeDoggieClass);

    // var superDoggie = new SuperDoggieClass();
    var superDoggie = window.superDoggie = Object.create(SuperDoggieClass.prototype);

    console.log(doggie, awesomeDoggie, superDoggie);

    // // Create a class
    // var DogClass = window.DogClass = Class.make(function DogClass(){
    //   this.dogThing = 4;
    //   return this;
    // }, AnimalClass);

    // // Create the instances
    // var dog1 = new DogClass();
    // var dog2 = Object.create(DogClass.prototype);
    // //console.log(new AnimalClass(), Object.create(AnimalClass.prototype));
    // console.log(dog1, dog2);

    // // Add things to the instance
    // dog1.addedDogThing = true;
    // dog1.animalThing = -5;

    // dog2.addedDogThing = 'stuff goes here';
    // dog2.animalThing = -69;

    // console.log(dog1, dog2);
    // console.log(new DogClass(), Object.create(DogClass.prototype));
    // console.log(dog.animalNonProtoFunction());
    // AnimalClass.prototype.isPrototypeOf(dog);
    // Object.getPrototypeOf(dog)
    // Object.keys(dog)
  };

  example2();

})(window);



