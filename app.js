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
// let total = 0;
let numArray = [];
let total = 0;

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
add.addEventListener("click", (e) => {
  num_();
  add_operation();
  console.log(numArray);
});
minus.addEventListener("click", (e) => {
  num_();
  minus_operation();
  console.log(numArray);
});
multiply.addEventListener("click", (e) => {
  num_();
  multiply_operation();
  console.log(numArray);
});
divide.addEventListener("click", (e) => {
  num_();
  divide_operation();
  console.log(numArray);
});
equal.addEventListener("click", (e) => {
  num_();
  equal_operation();
  console.log(numArray);
});

numBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    noleak();
    let value = number.textContent;
    calcLog.textContent += `${" " + value + " "}`;
    output.textContent += value;
  });
});

//All operator functions
function clear_operation() {
  numArray = [];
  total = 0;
  calcLog.innerHTML = "&nbsp";
  output.innerHTML = "&nbsp";
  output.style.fontSize = "64px";
  calcLog.style.fontSize = "16px";
}

function positive_Negative() {
  parseInt((calcLog.textContent += "× - 1"));
  parseInt((output.textContent *= -1));
}

function percentage_operation() {
  parseInt((calcLog.textContent /= 100));
  parseInt((output.textContent /= 100));
}

function divide_operation() {
  calcLog.textContent += "÷";
  output.innerHTML = "&nbsp";
  numArray.push("÷");
}

function multiply_operation() {
  calcLog.textContent += "×";
  output.innerHTML = "&nbsp";
  numArray.push("×");
}

function minus_operation() {
  calcLog.textContent += "-";
  output.innerHTML = "&nbsp";
  numArray.push("-");
}

function add_operation() {
  calcLog.textContent += "+";
  output.innerHTML = "&nbsp";
  numArray.push("+");
}

function float_operation() {
  calcLog.textContent += ".";
  output.textContent += ".";
}

function equal_operation() {
  log = parseFloat(calcLog.textContent) + " ";
  output.textContent = log;
  if (numArray[1] == "+") {
    total = operators["+"](numArray[0], numArray[2]);
  }
  if (numArray[1] == "-") {
    total = operators["-"](numArray[0], numArray[2]);
  }
  if (numArray[1] == "×") {
    total = operators["×"](numArray[0], numArray[2]);
  }
  if (numArray[1] == "÷") {
    total = operators["÷"](numArray[0], numArray[2]);
  }
  numArray = [];
  return (output.textContent = total);
}

//Save values on array to later calcaulate
function num_() {
  let str = output.textContent;
  num = parseFloat(str);
  numArray.push(num);
}

// Function to maintain calculator styling
function changeFontSize(fontvar, element) {
  let currentFont = element.style.fontSize.replace("px", "");
  element.style.fontSize = parseFloat(currentFont) - parseFloat(fontvar) + "px";
}

function noleak() {
  if (parseFloat(output.textContent) < 0.0000001) {
    output.textContent = Math.trunc(parseFloat(output.textContent));
  }
  if (calcLog.clientWidth > 231) {
    changeFontSize(0.5, calcLog);
  }
  if (output.clientWidth > 200) {
    changeFontSize(4.5, output);
  }
}

var operators = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  "×": function (a, b) {
    return a * b;
  },
  "÷": function (a, b) {
    return a / b;
  },
};
