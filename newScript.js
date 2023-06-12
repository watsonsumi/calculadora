//Seletores HTML
let buttons = document.querySelectorAll("button");
let inferiorView = document.querySelector("#inferior");
let superiorView = document.querySelector("#superior");
//Event Handler
const handleEvent = (userInput, typeOfInput) => {
  if (calculationDone && typeOfInput === "numbers") {
    superiorView.innerHTML = "";
    inferiorView.innerHTML = userInput;
    calculationDone = false;
  } else if (calculationDone && typeOfInput === "operations") {
    operador1 = inferiorView.innerHTML;
    operation = userInput;
    superiorView.innerHTML = inferiorView.innerHTML + " " + userInput + " ";
    inferiorView.innerHTML = "";
    calculationDone = false;
  } else if (typeOfInput === "numbers") {
    addNumberOnVisor(userInput);
  } else if (typeOfInput === "operations") {
    executeOperations(userInput);
  } else if (typeOfInput === "functions") {
    executeFunctions(userInput);
  }
};
//Event Listener do Mouse
buttons.forEach((element) => {
  element.addEventListener("click", (event) => {
    handleEvent(event.target.innerHTML, event.target.className);
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    executeFunctions("Delete");
  } else if (event.key === "Enter") {
    executeOperations("=");
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "/" ||
    event.key === "*" ||
    event.key === "^" ||
    event.key === "√"
  ) {
    operation = event.key;
    handleEvent(event.key, "operations");
  } else if (
    (parseInt(event.key, 10) >= 0 && parseInt(event.key, 10) < 10) ||
    event.key === "."
  ) {
    addNumberOnVisor(event.key);
  }
});

//Add Number
const addNumberOnVisor = (userInput) => {
  if (userInput === "." && inferiorView.innerHTML.indexOf(".") < 0) {
    inferiorView.innerHTML += userInput;
  } else {
    inferiorView.innerHTML += userInput;
    inferiorView.innerHTML = parseFloat(inferiorView.innerHTML);
  }
};
//Operations
//Variáveis Usadas
let operador1, operador2, operation;
let calculationDone = false;
const executeOperations = (userInput) => {
  if (!calculationDone) {
    if (userInput === "√") {
      superiorView.innerHTML = "√";
      inferiorView.innerHTML = "";
    } else if (superiorView.innerHTML[0] === "√" && userInput === "=") {
      operation = "√";
      operador1 = inferiorView.innerHTML;
      superiorView.innerHTML += inferiorView.innerHTML + " = ";
      inferiorView.innerHTML = solveExpression();
    } else if (superiorView.innerHTML.length < 1) {
      operador1 = inferiorView.innerHTML;
      operation = userInput;
      superiorView.innerHTML = inferiorView.innerHTML + " " + userInput + " ";
      inferiorView.innerHTML = "";
    } else if (userInput === "=") {
      operador2 = inferiorView.innerHTML;
      superiorView.innerHTML += inferiorView.innerHTML + " = ";
      inferiorView.innerHTML = solveExpression();
    }
  }
};
//Solve
const solveExpression = () => {
  calculationDone = true;
  switch (operation) {
    case "+":
      return sum(parseFloat(operador1), parseFloat(operador2));
    case "-":
      return subtraction(parseFloat(operador1), parseFloat(operador2));
    case "x":
      return multiply(parseFloat(operador1), parseFloat(operador2));
    case "*":
      return multiply(parseFloat(operador1), parseFloat(operador2));
    case "/":
      return division(parseFloat(operador1), parseFloat(operador2));
    case "^":
      return exp(parseFloat(operador1), parseFloat(operador2));
    case "√":
      return squareRoot(parseFloat(operador1));
    default:
      return;
  }
};
//Functions
//Variáveis usadas
let saveNumber = 0;
const executeFunctions = (userInput) => {
  if (userInput === "Clear") {
    inferiorView.innerHTML = "0";
    superiorView.innerHTML = "";
  } else if (userInput === "Save") {
    saveNumber = inferiorView.innerHTML;
  } else if (userInput === "Paste") {
    inferiorView.innerHTML += saveNumber;
    inferiorView.innerHTML = parseFloat(inferiorView.innerHTML);
  } else if (userInput === "Delete") {
    if (inferiorView.innerHTML.length > 1) {
      inferiorView.innerHTML = inferiorView.innerHTML.slice(0, -1);
    } else {
      inferiorView.innerHTML = "0";
    }
  }
};
let state = true;
setInterval(function () {
  if (state) {
    state = false;
    document.querySelector(".calculadora").style.boxShadow =
      "black 5px 5px 5px, yellow 10px 10px 10px, brown 15px 15px 15px";
  } else {
    state = true;
    document.querySelector(".calculadora").style.boxShadow =
      "green 5px 5px 10px, yellow 10px 10px 20px, brown 15px 15px 100px";
  }
}, 2000);
//Operations
function sum(a, b) {
  return a + b;
}
function subtraction(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function squareRoot(a) {
  return Math.sqrt(a);
}
function exp(a, b) {
  return Math.pow(a, b);
}
