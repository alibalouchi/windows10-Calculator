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
  historyResult.innerHTML = calculatorStack.join(' ')
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
  let historyResult = document.getElementById("history-result")
  let historyScreen = document.getElementById("history-screen")
  let historyResultScreen = document.getElementById("result-history-screen")
  result.innerHTML = calculatorStack[calculatorStack.length - 1]
  history.push(calculatorStack[0])
  histories.push(history);
  histories.map((item, index) => {historyScreen.innerHTML = renderHistory(histories, index)[0] 
    ; historyResultScreen.innerHTML = calculatorStack[0]})
  // renderHistory(histories, 0)
  historyResult.innerHTML = ""
  calculatorStack = []
}

const renderResult = (historyArray) => {
  let result = document.getElementById("result");
  result.innerHTML = historyArray.map
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