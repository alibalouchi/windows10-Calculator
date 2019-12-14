let screen = 0
let calculatorStack = []
let histories = []

const handleNumberClick = (number) => {
  screen = (screen * 10) + +number
  let result = document.getElementById("result")
  result.innerHTML = screen
}

const handleEquationClick = (equation) => {
  calculatorStack.push(screen)
  calculatorStack.push(equation)
  let historyResult = document.getElementById("history-result")
  historyResult.innerHTML = calculatorStack
  screen = 0
}

const equals = () => {
  calculatorStack.push(screen)
  let history = [...calculatorStack]
  for(let index = 0 ; index < calculatorStack.length ; index++){
    if (calculatorStack[index] == "-"){
      calculatorStack[index] = "+";
      calculatorStack[index + 1] = (-1) * calculatorStack[index + 1];
    }
  }
  // while (calculatorStack.length > 1){
    for (let index = calculatorStack.length ; index >= 0 ; index--){
      let tmpResult;
      if (typeof calculatorStack[index] == "string"){
        switch (calculatorStack[index]){
          case "*":
            tmpResult = calculatorStack[index - 1] * calculatorStack[index + 1];
            calculatorStack.pop(calculatorStack[index - 1]);
            calculatorStack.pop(calculatorStack[index])
            calculatorStack.pop(calculatorStack[index + 1])
            calculatorStack.push(tmpResult);
            break;
          case "+":
            tmpResult = calculatorStack[index - 1] + calculatorStack[index + 1];
            calculatorStack.pop(calculatorStack[index - 1]);
            calculatorStack.pop(calculatorStack[index])
            calculatorStack.pop(calculatorStack[index + 1])
            calculatorStack.push(tmpResult);
            break;
        }
      }
    // }
  }
  screen = 0
  let result = document.getElementById("result")
  result.innerHTML = calculatorStack[calculatorStack.length - 1]
  console.log(calculatorStack)
  history.push(calculatorStack[0])
  histories.push(history);
  calculatorStack = []
}

const clearScreen = () => {
  screen = 0
  let result = document.getElementById("result")
  result.innerHTML = 0
}