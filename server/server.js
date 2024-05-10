const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('Processing GET /calculations');
  res.status(200).send(calculations);
});
// POST /calculations

app.post('/calculations', (req, res) => {
  console.log('Processing POST /calculations');
  //grab data from request body
  let calculation = req.body;
  const numOne = Number(calculation.numOne);
  const numTwo = Number(calculation.numTwo);
  console.log(calculation);

  //perform calculation and add key to store result
  switch (calculation.operator) {
    case '+':
      calculation.result = numOne + numTwo;
      break;
    case '-':
      calculation.result = numOne - numTwo;
      break;
    case '*':
      calculation.result = numOne * numTwo;
      break;
    case '/':
      calculation.result = numOne / numTwo;
      break;
  }
  console.log(calculation);
  calculations.push(calculation);
  console.log(calculations);
  res.status(201).send(calculations);
});


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
