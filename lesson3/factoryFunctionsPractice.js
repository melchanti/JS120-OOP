/*Question 1
Disadvantages of Factory Functions:
  All objects created with a factory function hold a full copy of all the methods. This is redundant
  and it take a toll on the memory.
  There's no way to determine if a specific object was created by a factory function. This makes it
  impossible to determine the type of the object.
  */
/* Question 2, rewrite

Rewrite the following code to use object-literal syntax to generate the returned object:

Copy Code
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}
*//*
console.log ('Question 2');
function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}*/

/*Question 3
*/
/*
let invoice = {
  phone: 3000,
  internet: 6500
};

let payment = {
  phone: 1300,
  internet: 5500
};

let invoiceTotal = invoice.phone + invoice.internet;
let paymentTotal = payment.phone + payment.internet;
let remainingDue = invoiceTotal - paymentTotal;

console.log(paymentTotal);         // => 6800
console.log(remainingDue);         // => 2700
*/
/*
function createInvoice(services) {
  services = services || {};
  const DEFAULT_PHONE = 3000;
  const DEFAULT_INTERNET= 5500;

  return {
    phone: services.phone || DEFAULT_PHONE,
    internet: services.internet || DEFAULT_INTERNET,
    totalDue: 0,

    total: function() {
      this.totalDue = this.phone + this.internet;
      return this.totalDue;
    },


    addPayment(payment) {
      this.totalDue = isNaN(this.totalDue + payment) ? this.totalDue : this.totalDue - payment;
    },

    addPayments: function(payment) {
      payment = payment.reduce ((accum, currentPayment) => accum + currentPayment);

      this.totalDue = isNaN(this.totalDue - payment) ? this.totalDue : this.totalDue - payment;
    },

    amountDue() {
      return this.totalDue;
    }
  }
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

function createPayment(services) {
  services = services || {};

  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || 0,

    total: function() {
      return this.amount || (this.internet + this.phone);
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log (invoice.amountDue());      // this should return 0*/
