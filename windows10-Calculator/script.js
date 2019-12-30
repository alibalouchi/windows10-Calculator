let screen = ""
let calculatorStack = []
let histories = []
let dot = false;
let executed = false;

const handleNumberClick = (number) => {
  if (!executed){
    executed = true;
    screen = "";
  }
  if (calculatorStack.length == 1){
    calculatorStack = []
  }
  screen += `${number}`
  let result = document.getElementById("result")
  result.innerHTML = screen
}

const handleEquationClick = (equation) => {
  if (calculatorStack.length != 1){
    calculatorStack.push(+screen);
  }else{
    calculatorStack = [calculatorStack[0]]
  }
  calculatorStack.push(equation);
  let historyResult = document.getElementById("history-result");
  historyResult.innerHTML = calculatorStack.join(' ');
  dot = false;
  screen = "";
}

const equals = () => {
  calculatorStack.push(screen)
  let history = [...calculatorStack]
  let result = document.getElementById("result")
  let historyScreen = document.getElementById("history-screen")
  let historyResultDocument = document.getElementById("history-result")
  let calculatorStackFixer = (tmpResult, index) => {
    calculatorStack.pop(calculatorStack[index - 1]);
    calculatorStack.pop(calculatorStack[index])
    calculatorStack.pop(calculatorStack[index + 1])
    calculatorStack.push(tmpResult);
  }

  for(let index = 0 ; index < calculatorStack.length ; index++){
    if (calculatorStack[index] == "-"){
      calculatorStack[index] = "+";
      calculatorStack[index + 1] = (-1) * calculatorStack[index + 1];
    }
  }

    for (let index = calculatorStack.length ; index >= 0 ; index--){
      let tmpResult;
      if (typeof calculatorStack[index] == "string"){
        switch (calculatorStack[index]){
          case "*":
            tmpResult = +calculatorStack[index - 1] * +calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
          case "+":
            tmpResult = +calculatorStack[index - 1] + +calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
          case "/":
            tmpResult = +calculatorStack[index - 1] / +calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
        }
      }
  }
  result.innerHTML = calculatorStack[calculatorStack.length - 1];
  history.push(calculatorStack[0]);
  histories.push(history);
  let historyResult = history.pop(history[history.length - 1])
  history.push("=")
  historyScreen.innerHTML += `<div class="history"><span class='grey'>${history.join(' ')}</span>`
    + '<br />' 
    + `<span class='black'>${historyResult}</span></div>`;
  historyResultDocument.innerHTML = " "
  dot = false;
  executed = false;
  screen = historyResult
}

const renderHistory = (historyArray, index) => {
  let result = historyArray[index].pop(historyArray[index][historyArray[index].length])
  historyArray[index].push("=")
  return [(historyArray[index].join(' ')), result];
}

const clearScreen = () => {
  screen = ""
  let result = document.getElementById("result")
  result.innerHTML = 0
  dot = false;
}

const clearStack = () => {
  let result = document.getElementById("result");
  let historyResult = document.getElementById("history-result")
  screen = ""
  calculatorStack = []
  result.innerHTML = 0
  historyResult.innerHTML = " "
  dot = false
}

const deleteDigit = () => {
  let result = document.getElementById("result");
  if (screen % 1 == 0){
    screen = Math.floor(screen / 10);
  }else{
    screen = Math.floor((screen * (10 ** fractionalDigits(screen))) / 10) / (10 ** (fractionalDigits(screen) - 1))
  }
  result.innerHTML = screen;
}

const squareRoot = () => {
  if (calculatorStack.length == 1){
    calculatorStack[0] = (calculatorStack[0] ** 0.5)
  }
  let result = document.getElementById("result");
  screen = (screen ** 0.5);
  calculatorStack.push(screen);
  result.innerHTML = screen;
}

const power2 = () => {
  if (calculatorStack.length == 1){
    calculatorStack[0] = (calculatorStack[0] ** 2)
  }
  let result = document.getElementById("result");
  screen = (screen ** 2);
  result.innerHTML = screen;
}

const power3 = () => {
  if (calculatorStack.length == 1){
    calculatorStack[0] = (calculatorStack[0] ** 3)
  }
  let result = document.getElementById("result");
  screen = (screen ** 3);
  result.innerHTML = screen;
}

const divideX = () => {
  if (calculatorStack.length == 1){
    calculatorStack[0] = (1 / calculatorStack[0])
  }
  let result = document.getElementById("result");
  screen = (1 / screen);
  result.innerHTML = screen;
}

const fractionalDigits = (number) => {
  let i = 1
  while (((number * i) % 1) != 0){
    i = i * 10
  }
  return (Math.log10(i))
}

const dotFunction = () => {
  if (dot) return
  dot = true
  screen = screen + "."
}

const plusMinus = () => {
  let result = document.getElementById("result");
  screen = screen * (-1);
  result.innerHTML = screen;
}

const percent = () => {
  screen = (+calculatorStack[0]/100) * (+screen)
  let result = document.getElementById("result")
  result.innerHTML = `${screen}`
}

const changeClass = (char) => {
  let historyScreen = document.getElementById("history-screen");
  let memoryScreen = document.getElementById("memory-screen");
  let history = document.getElementById("history");
  let memory = document.getElementById("memory");
  if (char == "history"){
    historyScreen.classList.remove("hidden");
    memoryScreen.classList.add("hidden");
    history.classList.add("border");
    memory.classList.remove("border");
  }else if (char == "memory"){
    historyScreen.classList.add("hidden");
    memoryScreen.classList.remove("hidden");
    history.classList.remove("border");
    memory.classList.add("border");
  }
}