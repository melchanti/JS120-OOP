class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }

  startEngine() {
    console.log('Ready to go!');
  }
}

class Car extends Vehicle {
  constructor(year) {
    super(year);
  }
}

let truck1 = new Truck(2003, 'Short');
console.log(truck1.year); // 2003
console.log(truck1.bedType);