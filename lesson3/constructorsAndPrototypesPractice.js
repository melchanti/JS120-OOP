/*Question 1
let RECTANGLE = {
  area: function() {
    return this.width * this.height;
  },
  perimeter: function() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);

console.log(rect1.area);
console.log(rect1.perimeter);
*/

/*Question 2
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  console.log (Math.PI * this.radius * this.radius);
  return Math.PI * this.radius * this.radius;
}

let a = new Circle(3);
let b = new Circle(4);

a.area().toFixed(2); // => 28.27
b.area().toFixed(2); // => 50.27
a.hasOwnProperty('area'); // => false*/

/*Question 3 

function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());*/

/*Question 6 
function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
}

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`*/

/*Question 7 
let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

let ninjaB = new ninjaA.constructor();
// create a `ninjaB` object here; don't change anything else

console.log(ninjaA.constructor === ninjaB.constructor) // => true*/

/*Question 8 */
function User(first, last) {
  // ...
  if (!(this instanceof User)) {
    return new User(first, last);
  }
  
  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe