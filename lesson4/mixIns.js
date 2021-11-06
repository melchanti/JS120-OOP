const vehicle = {
  fuel(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  },
};
class WheeledVehicle {
  constructor(tirePressure) {
    this.tires = tirePressure;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

Object.assign(WheeledVehicle.prototype, vehicle);
class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32]);
    this.fuel(50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
    this.fuel(80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuel(kmTravelledPerLiter, fuelCapInLiter);
  }
}

Object.assign(Catamaran.prototype, vehicle);

let smallCat = new Catamaran(34, 34, 2, 24);
let smallBike = new Motorcycle();

console.log (smallBike.fuelCap);
console.log(smallCat.fuelCap);