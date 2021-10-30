/*Question 1
The following code will log 2 to the console. On line 2 we create a new object call baz that has
the object quz in its prototype chain. Therefore, on line 3, when we write `baz.foo` we get the property
corresponding to that key in its prototype which is the number 1 and `quz.foo` will also return the number
1. When we add them together we will get the number 2.

This example is testing our understanding of object prototypes and inheritance.
*/
/*console.log ('Question 1');

let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);*/

/* Question 2
The code will log 3.

On line 2 we create the Object `baz` and assign `qux` as its prototype. On line 3, we assign
the property `foo` to `baz. Notice, that assignment in JS tries to access an 'own' property of the object,
if it can't find an own property to change, then it creates an 'own' property with that key. Therefore, we
are not actually change the property of the `qux` object, we are just changing the property of the `baz` object.

`baz.foo` === 2 and `qux.foo` === 1 and the sum of them is 3.

This question is testing our understanding of the prototype chain behavior and how a property assignment works
for an object that has a prototype.
*/
/*console.log ('Question 2');

let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);*/

/* Question 3
The code will log 4.

On line 3 we are changing the prototype `quz` `foo` property to 2.
On line 5, when the code tries to access `baz.foo` it first looks for an own property but the object `foo`
doesn't have an own property of key `foo`. Therefore, it looks at its prototype's properties and it finds `foo`.
Since we had reassigned the property to 2 on line 3, it'll return 2. `qux.foo` will return 2 because that is its own 
property and hence the sum of 2 + 2 is 4.

Objects hold a reference to their prototype objects. If the object's prototype change in some way, the changes
are observable in the inheriting object as well.

This question is testing our understanding of object prototypes and inheritance.
*/
/*console.log ('Question 3');

let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo);*/

//Question 4
/*
console.log ('Question 4');

function assignProperty(object, key, value) {
  while (object !== null) {
    if (object.hasOwnProperty(key)) {
      object[key] = value;
      break;
    }
    
    object = Object.getPrototypeOf(object)
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
*/

/*Question 5
These two codes will not always log the same object.

`for/in` method will iterate over the object's enumerable properties and those of its prototypes.
`Object.keys` method will return only the object's 'own' enumerable properties.

Therefore if this object `foo` has a prototype that has enumerable properties, these two loops
will not log the same result.
*/
/*console.log ('Question 5');

let foo = {a: 5};
let qux = {b: 3};

Object.setPrototypeOf(foo, qux);

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});*/

//Question 6

/*console.log ('Question 6');

let foo = Object.create(null);

if (!Object.getPrototypeOf(foo)) {
  console.log ("Object doesn't have a prototype");
}*/

message = 'Hello from the global scope';
function deliverMessage() {
  console.log (this.message);
}
deliverMessage();

let foo = {
  message: 'Hello from the function scope',
};

foo.deliverMessage = deliverMessage;

console.log (foo);
foo.deliverMessage();