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

// Initialise variables
let total = undefined;
let num1 = undefined;
let num2 = undefined;
let temp = 0;
let numPadState = 0;
let oper_ = "";
let prevOper_ = "";
let display = parseFloat(output.textContent);

//Initialising edge case styles
output.style.fontSize = "64px";
calcLog.style.fontSize = "16px";

//Event Listeners
clear.addEventListener("click", (e) => clear_operation());
//! Find a way to limit operation click after every number is inputted
posiNeg.addEventListener("click", (e) => positive_Negative());
percentage.addEventListener("click", (e) => {
  percentage_operation();
  noleak();
});
float.addEventListener("click", (e) => float_operation());
add.addEventListener("click", (e) => {
  noleak();
  other_operators("+");
  calcLog.textContent += "+";
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
minus.addEventListener("click", (e) => {
  noleak();
  calcLog.textContent += "-";
  other_operators("-");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
multiply.addEventListener("click", (e) => {
  noleak();
  calcLog.textContent += "×";
  other_operators("×");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
divide.addEventListener("click", (e) => {
  noleak();
  calcLog.textContent += "÷";
  other_operators("÷");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
equal.addEventListener("click", (e) => {
  //   calcLog.textContent += "+";
  noleak();
  equal_operation();
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});

numBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    noleak();
    prevOper_ = oper_;
    if (numPadState == 1) {
      numPadState = 0;
      output.innerHTML = "&nbsp";
    }
    let value = number.textContent;
    calcLog.textContent += value;
    output.textContent += value;
  });
});

//All operator functions
function operate(o, num1, num2) {
  return operators[o](num1, num2);
}

function other_operators(sign) {
  numPadState = 1;
  //! Find a way to make prevOper_ execute first
  if (oper_ != prevOper_ && prevOper_ != "") {
    sign = prevOper_;
  }
  if (!num1 && !num2) {
    num1 = parseInt(output.textContent);
    oper_ = sign;
  } else if ((!num2 && num1 > 0) || num1 < 0) {
    num2 = parseInt(output.textContent);
    oper_ = sign;
    total = operate(prevOper_, num1, num2);
    num1 = total;
    output.textContent = total;
  } else {
    num1 = total;
    num2 = parseFloat(output.textContent);
    oper_ = sign;
    total = operate(prevOper_, num1, num2);
    output.textContent = total;
  }
}

function clear_operation() {
  total = 0;
  num1 = 0;
  num2 = 0;
  oper_ = "";
  numPadState = 0;
  operaterPadState = 0;
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

function float_operation() {
  calcLog.textContent += ".";
  output.textContent += ".";
}

function equal_operation() {
  operaterPadState = 1;
  if (oper_ != prevOper_) {
    num1 = total;
    num2 = parseFloat(output.textContent);
    total = operate(prevOper_, num1, num2);
    output.textContent = total;
  } else {
    num2 = parseFloat(output.textContent);
    total = operate(oper_, num1, num2);
    output.textContent = total;
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
  ".": function (num) {
    return (num / 100).toFixed(1);
  },
};

// Maintain calculator styling
function changeFontSize(fontvar, element) {
  let currentFont = element.style.fontSize.replace("px", "");
  element.style.fontSize = parseFloat(currentFont) - parseFloat(fontvar) + "px";
}

function noleak() {
  if (decimalCount(parseFloat(output.textContent)) > 8) {
    output.textContent = Math.round(parseFloat(output.textContent));
    calcLog.innerHTML = "&nbsp";
  }
  if (calcLog.clientWidth > 231) {
    changeFontSize(5 / 100, calcLog);
  }
  if (output.clientWidth > 200) {
    changeFontSize(5 / 100, output);
  }
}

const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

console.log(operators["+"](123, 10));
