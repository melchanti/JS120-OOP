
// name property added to make objects easier to identify
let foo = {name: 'foo'};
foo.ancestors = function () {
  let protoObj = Object.getPrototypeOf(this);
  if (protoObj === Object.prototype) {
    return ['Object.prototype'];
  }

  let arr = protoObj.ancestors();
  arr.unshift(protoObj.name);
  return arr;
}
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

console.log (qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log (baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log (bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']
