/*Question 1
let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

function createPet(animal, name) {
  return {
    animal: animal,
    name: name,

    sleep: function() {
      console.log('I am sleeping');
    },
    wake: function() {
      console.log ('I am awake');
    },
  };
}*/
/*
const PetPrototype = {
  sleep: function() {
    console.log('I am sleeping');
  },
  wake: function() {
    console.log ('I am awake');
  },

  init: function(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
}

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake*/

/*Question 3
Difference between the two:
Objects created with the OLOO pattern don't store copies of the methods in their prototype rather they
share the methods stored in the prototype. Whereas, objects created by the factory function store copies
of the methods and hence making them less memory efficient that those created by OLOO pattern.
Objects created with the OLOO have a prototype object that contains the methods associated with the 
created objects. Since all pets created from the prototype share a single prototype object, 
they all share the same methods. With the factory function, each object has a copy of all the methods. 
Thus, objects created by OLOO are more efficient in terms of memory use.

Objects created with the factory function can have private state. Any state stored in the body of the 
factory function instead of in the returned object is private to the returned object. 
They can't be accessed or modified unless one of the object methods exposes the state. 
With OLOO, there is no way to define private state. All object state can be accessed and modified by 
outside code.
*/