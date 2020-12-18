function getHistory (){
  return document.getElementById ('history-value').innerText
}
function printHistory (num){
  document.getElementById ('history-value').innerText=num;
}  
function getOutput(){
  return document.getElementById ('output-value').innerText;
}
 function printOutput(num){
  if(num==''){
    document.getElementById ('output-value').innerText=num;
  }
  else{
    document.getElementById ('output-value').innerText=getFormattedNumber(num);
  }
}
function getFormattedNumber (num){
  var n = Number (num)
  var value = n.toLocaleString ('en'); 
  return value;
}
// printOutput('883792');

function reversNumberFormat(num) {
  return Number (num.replace(/,/g,''));
}
//alert (reversNumberFormat(getOutput()));

/* vim shortcuts
e = skip word forward
b = skip word back
v = select
V = select line
c = copy
x = cut
A = edit at end of line
I = edit at beginning of line
*/


// click handlers for the operators
var clickHandlerOperators = (event) => {
  var operatorId = event.target.id;
  var output = getOutput();
  var history = getHistory();
  if (output != '') {
    output=reversNumberFormat(output);
    history=history+output;
    let operators = ['*', '+', '-', '/'];
    if (operators.contains(operatorId)) {
      lastNumber = output;
      lastOperator = operatorId;
      printOutput('');
    }
    if (operatorId === '=') {
      // var result = eval(history);
      var result = 0;
      if (lastOperator === '*') {
        result = lastNumber * recentNumber;
      }
      if (lastOperator === '+') {
        result = lastNumber + recentNumber; // 82 + '37' = '8237'
      }
      if (lastOperator === '-') {
        result = lastNumber - recentNumber;
      }
      if (lastOperator === '/') {
        result = lastNumber / recentNumber;
      }
      printOutput(result);
      printHistory('');
    }
  }
}
// click handlers for the numbers
var clickHandlerNumbers = (event) => {
  var numberId = event.target.id;
  var output = getOutput();

  if (output !== NaN){//if output is a number 
    if (!isNaN(lastNumber) && lastOperator) { // and
      recentNumber = Number(output + numberId);
    }
    output = output + numberId;
    printOutput(output);
  }
}
var clickHandlerOperatorClear = () => {
  printHistory('');
  printOutput('');
  lastNumer = undefined;
  lastOperator = undefined;
  recentNumber = undefined;
}
var clickHandlerOperatorBackspace = () => {
  var output = getOutput();
  output = output.substr(0, output.length - 1);
  printOutput(output);
}
  
//history 12 * 34
var lastNumber; // 12
var lastOperator; // *
var recentNumber; // 34

var operators = [...document.getElementsByClassName('operator')];
var numbers = [ ...document.getElementsByClassName('number')];
var operatorClear = document.querySelector('.operatorClear');
var operatorBackspace = document.querySelector('.operatorBackspace');

operatorClear.addEventListener('click', clickHandlerOperatorClear)
operatorBackspace.addEventListener('click', clickHandlerOperatorBackspace)
operators.forEach(operator => {
  operator.addEventListener('click', clickHandlerOperators);
});
numbers.forEach(number => {
  number.addEventListener('click', clickHandlerNumbers)
});  
