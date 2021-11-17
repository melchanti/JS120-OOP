function objectsEqual(obj1, obj2) {
  for (key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
  }

  for (key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false