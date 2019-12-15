let screen = 0
let calculatorStack = []
let histories = []
let dot = false;

const handleNumberClick = (number) => {
  if ((screen == 0 || screen % 1 == 0) && (dot == false)){
    screen = (screen * 10) + +number
  }else if(screen == 0 && dot == true && +number == 0){
    screen = screen / 10;
  } else{
    screen = (screen + +number / (10 **(fractionalDigits(screen) + 1)))
  }
  let result = document.getElementById("result")
  result.innerHTML = screen
}

const handleEquationClick = (equation) => {
  calculatorStack.push(screen);
  calculatorStack.push(equation);
  let historyResult = document.getElementById("history-result");
  historyResult.innerHTML = calculatorStack.join(' ');
  dot = false;
  screen = 0;
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
            tmpResult = calculatorStack[index - 1] * calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
          case "+":
            tmpResult = calculatorStack[index - 1] + calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
          case "/":
            tmpResult = calculatorStack[index - 1] / calculatorStack[index + 1];
            calculatorStackFixer(tmpResult, index)
            break;
        }
      }
  }
  screen = 0
  result.innerHTML = calculatorStack[calculatorStack.length - 1];
  history.push(calculatorStack[0]);
  histories.push(history);
  let historyResult = history.pop(history[history.length - 1])
  history.push("=")
  historyScreen.innerHTML += `<div class="history"><span class='grey'>${history.join(' ')}</span>` + '<br />' + `<span class='black'>${historyResult}</span></div>`;
  historyResultDocument.innerHTML = " "
  calculatorStack = []
  dot = false;
}

const renderHistory = (historyArray, index) => {
  let result = historyArray[index].pop(historyArray[index][historyArray[index].length])
  historyArray[index].push("=")
  console.log(result)

  return [(historyArray[index].join(' ')), result];
}

const clearScreen = () => {
  screen = 0
  let result = document.getElementById("result")
  result.innerHTML = 0
}

const clearStack = () => {
  let result = document.getElementById("result");
  let historyResult = document.getElementById("history-result")
  screen = 0
  calculatorStack = []
  result.innerHTML = 0
  historyResult.innerHTML = " "
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
  let result = document.getElementById("result");
  screen = (screen ** 0.5);
  (screen % 1 != 0) ? dot = true : dot = false;
  result.innerHTML = screen;
}

const power2 = () => {
  let result = document.getElementById("result");
  screen = (screen ** 2);
  result.innerHTML = screen;
}

const power3 = () => {
  let result = document.getElementById("result");
  screen = (screen ** 3);
  result.innerHTML = screen;
}

const divideX = () => {
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
  dot = true
}

const plusMinus = () => {
  let result = document.getElementById("result");
  screen = screen * (-1);
  result.innerHTML = screen;
}