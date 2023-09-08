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

// Initialise storing variables
let numArray = [];
let total = 0;
let isChain = false;

let num1 = 0
let num2 = 0;
let o = "";

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
  noleak();
  console.log(numArray);
});

numBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    let value = parseFloat(number.textContent);
    console.log(numArray);

    // Handles events when user chains same operation
    if ((numArray.length === 2 && isChain == true && total > 0) || total < 0) {
      output.innerHTML = "&nbsp";
    }

    //Handles events when new calculation started without using clear button
    if ((numArray.length === 0 && isChain == false && total > 0) || total < 0) {
      output.innerHTML = "&nbsp";
      calcLog.innerHTML = "&nbsp";
      total = 0;
    }
    noleak();
    calcLog.textContent += value;
    output.textContent += value;
  });
});

//All operator functions
function operate (num1,o,num2) {
    operators[o](num1,num2);
}

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
  parseInt((calcLog.textContent += " ÷ 100"));
  parseInt((output.textContent /= 100));
}

function divide_operation() {
  calcLogic("÷");
}

function multiply_operation() {
  calcLogic("×");
}

function minus_operation() {
  calcLogic("-");
}

function add_operation() {
  calcLogic("+");
}

function float_operation() {
  calcLog.textContent += ".";
  output.textContent += ".";
}

function equal_operation() {
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
  isChain = false;
  output.textContent = total;
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
  ".": function (num) {
    return (num / 100).toFixed(1);
  },
};

//Logic for storing & evaluating values

function calcLogic(oper) {
  if (numArray.length === 3) {
    // When chain is long enough to calculate
    total = operators[oper](numArray[0], numArray[2]);
    output.textContent = total;
    calcLog.textContent += oper;
    numArray = [];
    isChain = true;
    numArray.push(total);
    numArray.push(oper);
  } else {
    output.innerHTML = "&nbsp"; //clear
    calcLog.textContent += oper; 
    numArray.push(oper); //pushes oper
    isChain = true; 
  }
  console.log(numArray);
}

//Save values on array to later calcaulate
function num_() {
  let str = output.textContent;
  let num = parseFloat(str);
  if (numArray.length == 3){
    return
  } else {
    numArray.push(num);
  }
}

// Maintain calculator styling
function changeFontSize(fontvar, element) {
  let currentFont = element.style.fontSize.replace("px", "");
  element.style.fontSize = parseFloat(currentFont) - parseFloat(fontvar) + "px";
}

function noleak() {
  if (
    decimalCount(parseFloat(output.textContent)) > 8
  ) {
    output.textContent = Math.round(parseFloat(output.textContent));
    calcLog.innerHTML = "&nbsp";
  }
  if (calcLog.clientWidth > 231) {
    changeFontSize(0.5, calcLog);
  }
  if (output.clientWidth > 200) {
    changeFontSize(4.5, output);
  }
}

const decimalCount = num => {
   // Convert to String
   const numStr = String(num);
   // String Contains Decimal
   if (numStr.includes('.')) {
      return numStr.split('.')[1].length;
   };
   // String Does Not Contain Decimal
   return 0;
}

console.log(operators["."](9));
