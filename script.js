var tasks = JSON.parse(JSON.stringify(test));
var counter = 0;
function showQuestions(){
	if(document.getElementById("name").value === '') {
    	alert("Напиши свое имя!");
	}
	else {
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
		counter++;
		if (counter > 30){
			console.log("тест окончен");
		}
		else {
			document.getElementById("answers").innerHTML = "";
			var answer;
			var int = getRandomInt(0, 204);
			document.getElementById("number").innerHTML = "<br>" + "Вопрос "+ counter +" из 30";
			document.getElementById("question").innerHTML = tasks[int].question;
			for (answer of tasks[int].answers) {
				document.getElementById("answers").innerHTML += ' <input type="radio" value=""></input> ' + answer + '<br>';
			}
			var correctanswer = tasks[int].index;
			document.getElementById("correctanswers").innerHTML = correctanswer + "(правильный ответ - потом убрать надо)";//потом убрать, нужно сравнивать
			//нажатую кнопку ответа с этим индексом и засчитывать правильный или неправильный ответ.
		}
	
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
	}
}
