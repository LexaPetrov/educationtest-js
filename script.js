var tasks = JSON.parse(JSON.stringify(test));
var counter = 0;
var result = [];
var i;
var correctanswer;
var int;
function showQuestions(){
	if(document.getElementById("name").value === '') {
    	alert("Напиши свое имя!");
	}
	else {
		document.getElementById("test").className = "test";
		document.getElementById("hello").className = "hidden";
		refresh();
		document.getElementById("begin").style.display = "none";
		document.getElementById("next").style.display = "inline-block";
		document.getElementById("canceltest").style.display = "inline-block";
		next();
		for (var i = 0; i  < 205; i++) {
			var questions = new Array(tasks[i].question);
			var answers = new Array(tasks[i].answers);
	  		questions.sort();
	  		answers.sort();
		}
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function next() {
	document.getElementById("answers").style = "animation-name: no";
	if (counter > 0) {//проверка ответа
		for (i = 0; i < tasks[int].answers.length; i++) {
			let element = document.getElementById(`answer-${counter}-${i + 1}`);
			if (element.checked) {
				if (+element.value === +correctanswer){
					if (counter %2 === 0) {
						document.getElementById("answers").style = "animation-name: green;";
					}
					else {
						document.getElementById("answers").style = "animation-name: green2;";
					}
				}
				else {
					if (counter %2 === 0) {
						document.getElementById("answers").style = "animation-name: red;";
					}
					else {
						document.getElementById("answers").style = "animation-name: red2;";
					}
				}
				result.push({
					number: int,
					order: counter,
					userAnswer: element.value,
					rightAnswer: correctanswer
				});
				break;
			}
		}
	}
	counter++;
	if (counter > 30){
		complete();
	}
	else {
		document.getElementById("answers").innerHTML = "";
		int = getRandomInt(0, 204);
		document.getElementById("number").innerHTML = "<br>" + "Вопрос "+ counter +" из 30";
		document.getElementById("question").innerHTML = tasks[int].question;
		for (i = 0; i < tasks[int].answers.length; i++) {
			document.getElementById("answers").innerHTML += ` <input type="radio" id="answer-${counter}-${i+1}" value="${i+1}"></input>${tasks[int].answers[i]}<br> `;
		}
		correctanswer = tasks[int].index;
	}

}

function complete() {

	let res = 0;

	document.getElementById("result").className = "";
	document.getElementById("test").className = "hidden";
	let table = document.getElementById("result-table");
	let tr = document.createElement("tr");
	table.appendChild(tr);
	let td = document.createElement("td");
	td.appendChild(document.createTextNode("Номер вопроса"));
	tr.appendChild(td);
	td = document.createElement("td");
	td.appendChild(document.createTextNode("Правильность ответа"));
	tr.appendChild(td);

	for (i = 0; i < result.length; i++) {
		let tr = document.createElement("tr");
		tr.className = +result[i].userAnswer === +result[i].rightAnswer ? "green" : "red";
		table.appendChild(tr);
		let td = document.createElement("td");
		td.appendChild(document.createTextNode(result[i].order));
		tr.appendChild(td);
		td = document.createElement("td");
		td.appendChild(document.createTextNode(+result[i].userAnswer === +result[i].rightAnswer ? "Да" : "Нет"));
		console.log(result[i].userAnswer, result[i].rightAnswer);
		tr.appendChild(td);
		res += +result[i].userAnswer === +result[i].rightAnswer ? 1 : 0;
	}

	let rowLeft = 30 - result.length;
	for (i = 0; i < rowLeft; i++) {
		let tr = document.createElement("tr");
		tr.className = "red";
		table.appendChild(tr);
		let td = document.createElement("td");
		td.appendChild(document.createTextNode(result.length + i + 1));
		tr.appendChild(td);
		td = document.createElement("td");
		td.appendChild(document.createTextNode("Нет ответа"));
		tr.appendChild(td);
	}

	document.getElementById("result-brief").appendChild(document.createTextNode(`Ваш результат: ${Math.round(res/30*100)}%`));
	//сделать выгрузку в файл
}

var sec=00;
var min=60;
function refresh()
{
	sec--;
	if(sec==-01){
		sec=59; min -= 1;
	}
	else{
		min=min;
	}
	if(sec<=9){
		sec="0" + sec;
	}
	time=(min<=9 ? "0"+min : min) + ":" + sec;
	if(document.getElementById){
		timer.innerHTML="Осталось времени: " + time;
	}
	inter=setTimeout("refresh()", 1000);
	if(min=='00' && sec=='00'){
		sec="00";
		clearInterval(inter);
		/* выводим сообщение в элемент с id="sample", например <div id="sample"></div> */
                //sample.innerHTML="Время вышло, тест окончен.";
		complete();
	}
}
