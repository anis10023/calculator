// Dom elements
const calcLog = document.querySelector(".calc-log");
const output = document.querySelector(".output");
const numBtn = document.querySelectorAll(".num-btn");
const clear = document.querySelector(".clear");
const posiNeg = document.querySelector(".posiNeg");
const percentage = document.querySelector(".percentage");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const minus = document.querySelector(".minus");
const add = document.querySelector(".add");
const float = document.querySelector(".float");
const equal = document.querySelector(".equal");

//Initialising edge case styles
output.style.fontSize = "64px";
calcLog.style.fontSize = "16px";

//Event Listeners
clear.addEventListener("click", (e) => clear_operation());
posiNeg.addEventListener("click", (e) => positive_Negative());
percentage.addEventListener("click", (e) => {
  percentage_operation();
  noleak();
});
float.addEventListener("click", (e) => float_operation());

numBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    noleak();
    let value = number.textContent;
    calcLog.textContent += parseFloat(value);
    output.textContent += parseFloat(value);
  });
});

//All operator functions
function clear_operation() {
  calcLog.innerHTML = "&nbsp";
  output.innerHTML = "&nbsp";
  output.style.fontSize = "64px";
  calcLog.style.fontSize = "16px";
}

function positive_Negative() {
  parseInt((calcLog.textContent *= -1));
  parseInt((output.textContent *= -1));
}

function percentage_operation() {
  parseInt((calcLog.textContent /= 100));
  parseInt((output.textContent /= 100));
}

function divide_operation(a, b) {}

function multiply_operation(arr) {}

function minus_operation(arr) {}

function add_operation(arr) {
  const add = arr.reduce(
    total,
    (number) => (total += number),
    output.textContent
  );
}

function float_operation() {
  calcLog.textContent += ".";
  output.textContent += ".";
}

function equal_operation(arr) {}

// Function to maintain calculator styling
function changeFontSize(fontvar, element) {
  let currentFont = element.style.fontSize.replace("px", "");
  element.style.fontSize = parseFloat(currentFont) - parseFloat(fontvar) + "px";
}

function noleak() {
  if (parseFloat(output.textContent) < 1) {
    parseFloat(output.textContent).toFixed(6);
  }
  if (calcLog.clientWidth > 231) {
    changeFontSize(0.5, calcLog);
  }
  if (output.clientWidth > 200) {
    changeFontSize(4.5, output);
  }
}
