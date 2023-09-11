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
let total = null;
let num1 = null;
let num2 = null;

let numPadState = 0;
let operatorPadState = 0;
let equalOperatorPadState = 0;
let oper_ = "";
let prevOper_ = "";

let order = [];

//Initialising edge case styles
output.style.fontSize = "64px";
calcLog.style.fontSize = "16px";

//Event Listeners
function clickButton() {}
clear.addEventListener("click", (e) => {
  clear_operation();
  if (calcLog.textContent == "NaN" || calcLog.textContent == "0") {
    clear.textContent = "AC";
    total = 0;
    num1 = 0;
    num2 = 0;
    oper_ = "";
    numPadState = 0;
    operatorPadState = 0;
    order = [];
    calcLog.innerHTML = "&nbsp";
    output.innerHTML = "&nbsp";
    output.style.fontSize = "64px";
    calcLog.style.fontSize = "16px";
  }
  noleak();
});
posiNeg.addEventListener("click", (e) => positive_Negative());
percentage.addEventListener("click", (e) => {
  noleak();
  percentage_operation();
});
float.addEventListener("click", (e) => float_operation());
add.addEventListener("click", (e) => {
  noleak();
  other_operators("+");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
minus.addEventListener("click", (e) => {
  noleak();
  other_operators("-");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
multiply.addEventListener("click", (e) => {
  noleak();
  other_operators("×");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
divide.addEventListener("click", (e) => {
  noleak();
  other_operators("÷");
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});
equal.addEventListener("click", (e) => {
  noleak();
  equal_operation();
  console.log("total= " + total);
  console.log("num1= " + num1);
  console.log("num2= " + num2);
  console.log("oper_= " + oper_);
});

numBtn.forEach((number) => {
  number.addEventListener("click", (e) => {
    prevOper_ = oper_;
    order.push("n");
    operatorPadState = 1;
    equalOperatorPadState = 1;
    if (numPadState == 1) {
      numPadState = 0;
      output.innerHTML = "&nbsp";
    }
    let value = number.textContent;
    calcLog.textContent += value;
    output.textContent += value;
    if (output.textContent.includes(value)) {
      clear.textContent = "C";
    }
    noleak();
  });
});

//All operator functions
function operate(o, num1, num2) {
  noleak();
  return roundResult(operators[o](num1, num2));
}

function other_operators(sign) {
  if (operatorPadState === 1) {
    numPadState = 1;
    operatorPadState = 0;
    order.push(sign);
    console.log(order);
    calcLog.textContent += " " + sign + " ";
    if (!num1 && !num2) {
      num1 = parseFloat(output.textContent);
      oper_ = sign;
      prevOper_ = oper_;
    } else {
      if (!num2 && !oper_) {
        oper_ = sign;
      } else {
        oper_ = sign;
        num2 = parseFloat(output.textContent);
        total = roundResult(operate(prevOper_, num1, num2));
        num1 = total;
        prevOper_ = oper_;
        output.textContent = total;
      }
    }
    if (order[0] == "-" && order[1] == "n") {
      num1 = num1 * -1;
      order = [];
    }
  }
}

function equal_operation() {
  if (equalOperatorPadState === 1) {
    equalOperatorPadState = 0;
    num2 = parseFloat(output.textContent);
    total = operate(oper_, num1, num2);
    num1 = total;
    num2 = undefined;
    oper_ = undefined;
    output.textContent = total;
  }
}

function clear_operation() {
  if (clear.textContent === "C") {
    output.innerHTML = "&nbsp";
    calcLog.innerHTML = "&nbsp";
    calcLog.textContent = total;
    clear.textContent = "AC";
  } else {
    total = 0;
    num1 = 0;
    num2 = 0;
    oper_ = "";
    numPadState = 0;
    order = [];
    calcLog.innerHTML = "&nbsp";
    output.innerHTML = "&nbsp";
    output.style.fontSize = "64px";
    calcLog.style.fontSize = "16px";
  }
}

function positive_Negative() {
  parseInt((calcLog.textContent += " × - 1"));
  parseInt((output.textContent *= -1));
}

function percentage_operation() {
  calcLog.textContent += " ÷ 100";
  total = operators["÷"](parseFloat(output.textContent), 100);
  output.textContent = total;
  num1 = total;
}

function float_operation() {
  calcLog.textContent += ".";
  output.textContent += ".";
}

const operators = {
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
  if (decimalCount(total) > 8) {
    output.innerHTML = Math.round(parseFloat(output.textContent));
    calcLog.innerHTML = "&nbsp";
  } else if (parseFloat(total) > 9999999) {
    output.textContent = "NaN";
    output.innerHTML = "&nbsp";
    calcLog.innerHTML = "&nbsp";
  }
}

const decimalCount = (num) => {
  const numStr = String(num);
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  return 0;
};

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
console.log(operators["+"](123, 10));
console.log(decimalCount(0.00001));
