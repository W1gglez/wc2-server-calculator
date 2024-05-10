function onReady() {
  console.log('client.js is sourced!');
  fetchCalculations();
}

onReady();

let operator = '';

function handleCalculate(event) {
  event.preventDefault();

  const numOne = document.getElementById('first-number').value;
  const numTwo = document.getElementById('second-number').value;

  console.log(numOne);
  console.log(operator);
  console.log(numTwo);

  axios
    .post('/calculations', { numOne, numTwo, operator })
    .then((response) => {
      fetchCalculations();
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong. Check console for more info.');
    });
}

function fetchCalculations() {
  axios
    .get('/calculations')
    .then((response) => {
      //Get calculations from server and display them to the DOM
      const resultHistory = document.getElementById('resultHistory');
      const recentResult = document.getElementById('recentResult');
      resultHistory.innerHTML = '';
      if (response.data.length === 0) {
        console.log('Checking length of response.data');
        return;
      } else {
        recentResult.textContent = `
                ${response.data[response.data.length - 1].result}
                `;
      }
      for (const calculation of response.data) {
        resultHistory.innerHTML += `
                      <p>${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}<p>
                      `;
      }
    })
    .catch((error) => {
      console.log(error);
      alert('Something went wrong. Check console for more info.');
    });
}

function setOperator(event) {
  event.preventDefault();

  operator = event.target.innerText;
}

function clearInputs(event) {
  event.preventDefault();

  const form = document.getElementById('calc-form');
  form.reset();
}
