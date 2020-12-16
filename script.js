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
  // alert ('the operator clicked:'+operatorId);
  if (operatorId == 'clear') {
    printHistory('');
    printOutput('');
    lastNumer = undefined;
    lastOperator = undefined;
    recentNumber = undefined;
  }
  if (operatorId=='backspace') {
    var output=reversNumberFormat(getOutput()).toString();
    if (output) { //if output has a value
      output=output.substr(0,output.length-1)
      printOutput(output);
    }
  }
  else {
    var output = getOutput();
    var history = getHistory();
    if (output != '') {
      output=reversNumberFormat(output);
      history=history+output;
      if (operatorId === '*') {
        lastNumber = output;
        lastOperator = operatorId;
        printOutput('');
      }
      if (operatorId === '+') {
        lastNumber = output;
        lastOperator = operatorId;
        printOutput('');
      }
      if (operatorId === '-') {
        lastNumber = output;
        lastOperator = operatorId;
        printOutput('');
      }
      if (operatorId === '/') {
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

  
//history 12 * 34
var lastNumber; // 12
var lastOperator; // *
var recentNumber; // 34

var operators = [...document.getElementsByClassName('operator')];
var numbers = [ ...document.getElementsByClassName('number')];


operators.forEach(operator => {
  operator.addEventListener('click', clickHandlerOperators);
});
numbers.forEach(number => {
  number.addEventListener('click', clickHandlerNumbers)
});  



// // 
// function getHistory(){
// 	return document.getElementById('history-value').innerText;
// }
// function printHistory(num){
// 	document.getElementById('history-value').innerText=num;
// }
// function getOutput(){
// 	return document.getElementById('output-value').innerText;
// }
// function printOutput(num){
// 	if(num==''){
// 		document.getElementById('output-value').innerText=num;
// 	}
// 	else{
// 		document.getElementById('output-value').innerText=getFormattedNumber(num);
// 	}	
// }
// function getFormattedNumber(num){
// 	if(num=='-'){
// 		return '';
// 	}
// 	var n = Number(num);
// 	var value = n.toLocaleString('en');
// 	return value;
// }
// function reverseNumberFormat(num){
// 	return Number(num.replace(/,/g,''));
// }
// var operator = document.getElementsByClassName('operator');
// for(var i =0;i<operator.length;i++){
// 	operator[i].addEventListener('click',function(){
// 		if(this.id=='clear'){
// 			printHistory('');
// 			printOutput('');
// 		}
// 		else if(this.id=='backspace'){
// 			var output=reverseNumberFormat(getOutput()).toString();
// 			if(output){//if output has a value
// 				output= output.substr(0,output.length-1);
// 				printOutput(output);
// 			}
// 		}
// 		else{
// 			var output=getOutput();
// 			var history=getHistory();
// 			if(output==''&&history!=''){
// 				if(isNaN(history[history.length-1])){
// 					history= history.substr(0,history.length-1);
// 				}
// 			}
// 			if(output!='' || history!=''){
// 				output= output==''?output:reverseNumberFormat(output);
// 				history=history+output;
// 				if(this.id=='='){
// 					var result=eval(history);
// 					printOutput(result);
// 					printHistory('');
// 				}
// 				else{
// 					history=history+this.id;
// 					printHistory(history);
// 					printOutput('');
// 				}
// 			}
// 		}
        
// 	});
// }
// var number = document.getElementsByClassName('number');
// for(var i =0;i<number.length;i++){
// 	number[i].addEventListener('click',function(){
// 		var output=reverseNumberFormat(getOutput());
// 		if(output!=NaN){ //if output is a number
// 			output=output+this.id;
// 			printOutput(output);
// 		}
// 	});
// }
 
