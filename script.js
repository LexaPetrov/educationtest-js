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
			document.getElementById("answers").innerHTML += ` <input type="radio" name="group" id="answer-${counter}-${i+1}" value="${i+1}"></input>${tasks[int].answers[i]}<br> `;
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

	document.getElementById("result-brief").appendChild(document.createTextNode(`Результат теста для ${document.getElementById("name").value} : ${Math.round(res/30*100)}%`));

	let answers = result.map(function (item) {
		return `
		номер вопроса: ${item.number}, вопрос: ${tasks[item.number].question},
		выбранный ответ: ${tasks[item.number].answers[item.userAnswer - 1]},
		правильный ответ: ${tasks[item.number].answers[item.rightAnswer - 1]}`;
	});

	let brief = `
		Имя: ${document.getElementById("name").value}.
		Процент решения: ${Math.round(res/30*100)}.
	`;

	let report = `
		Имя: ${document.getElementById("name").value}.
		Процент решения: ${Math.round(res/30*100)}.
		Детали:
		${answers}
	`;

	
	//var share = `Я решил тест по информационной безопасности на ${Math.round(res/30*100)}%! Сможешь меня обойти? ` ;
	//document.getElementById('share').setAttribute("data-title", share);
	//$('#share').attr('data-description', 'wadsfd');
	
	//setTimeout(download, 10, report, 'myfile.txt', 'text/plain');

	setTimeout(download, 10, brief, 'extrafile.txt', 'text/plain');
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
		complete();
	}
}

function download(text, name, type) {
	console.log("function called!");
 	var a = document.getElementById("a");
 	var file = new Blob([text], {type: type});
 	a.href = URL.createObjectURL(file);
 	a.download = name;
}

 // function PrintElem(elem)
 //    {
 //        Popup($(elem).html());
 //    }

  
 //    function Popup(data)
 //    {
 //        var mywindow = window.open('', 'result', 'height=400,width=600');
 //        mywindow.document.write('<html><head><title>РЕЗУЛЬТАТЫ ВЫПОЛНЕНИЯ ТЕСТА</title>');
 //        var now = new Date();
 //        mywindow.document.write('_______________________________________________________________________ <br><br>');
 //        mywindow.document.write(now);
 //        //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
 //        mywindow.document.write('</head><body >');
 //        mywindow.document.write('<style> body { font-size:20px; } </style>');
 //        mywindow.document.write(data);
 //        var name = document.getElementById("name").value
 //        var res = document.getElementById("result-table");
 //        mywindow.document.write(res);   
 //        mywindow.document.write('</body></html>');
 // 		mywindow.document.write('<br> _______________________________________________________________________ <br> ');
 //        mywindow.document.close(); // necessary for IE >= 10
 //        mywindow.focus(); // necessary for IE >= 10
 //        mywindow.print();
 //        mywindow.close();
 //        return true;
 //    }


 //    function printdata() {
 //    	PrintElem('#result');
 //    }