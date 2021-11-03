class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log (`Hello! My name is ${this.name}!`);
  }

  rename(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log ("Hello! I'm a cat!");
  }

}

/*let kitty = new Cat('Sophie');
kitty.greet();
*/
let kitty = new Cat('Sophie');
console.log(kitty.name); // Sophie
kitty.rename('Chloe');
console.log(kitty.name); // Chloe

Cat.genericGreeting();