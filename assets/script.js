var timer = document.querySelector("#timer");
var mainEl = document.querySelector("main");
var quizBox = document.querySelector(".quizBox");
var myButton = document.querySelector(".myButton");
var highScore = document.querySelector(".highScore");
var answerOptions = document.querySelector(".answerButtons");
var result = document.querySelector("#result");
var score = document.querySelector("#score");
var gameOverScreen = document.querySelector(".gameOver");


var currentIndex = 0;
var wins = 0;


var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3= document.createElement("button");
var answer4= document.createElement("button");

answer1.classList.add("btn");
answer2.classList.add("btn");
answer3.classList.add("btn");
answer4.classList.add("btn");

answerOptions.appendChild(answer1);
answerOptions.appendChild(answer2);
answerOptions.appendChild(answer3);
answerOptions.appendChild(answer4);


//call function quiz
function rules() {
     
     var rules = document.createElement("p");
     rules.setAttribute("style", "margin-bottom: 10px");
     rules.setAttribute("id", "rulesFirst");
     rules.textContent = "Do your best at answering the questions. Remember that a wrong answer will subtract five seconds from the timer! Go get your highscore!";
     quizBox.appendChild(rules);
     //start button and then append it 
     var startButton = document.createElement("button");
     startButton.innerHTML = "Start Quiz";
     startButton.setAttribute("id", "startButton");
     //add some styling to the button and append it
     startButton.classList.add("btn");
     myButton.appendChild(startButton);
     startButton.addEventListener("click", startQuiz);

}


//timer set at 60 seconds and then countsdown
var timeLeft = 60;
function updateTimer() {
     timerInterval = setInterval(function () {

        if (timeLeft === 0) {
               clearInterval(timerInterval);
               gameOver();
          } else {
          timeLeft--;
          timer.textContent = timeLeft + " seconds left";
          }
     }, 1000);
}

// funtion for gameover and how to react
function gameOver() {
   timer = '';
    var gameOver = document.createElement("p");
    var userScore = document.createElement("p");
    var userinputWhat = document.createElement("span");
    var userInput = document.createElement("input");
    var submitButton = document.createElement("button");

    submitButton.classList.add("btn");

     userInput.type = "text";
     userInput.value = " ";
     userInput.classList.add("userInput");

     gameOver.textContent = "Game Over!"
     userScore.textContent = "Your final score is: " + wins;
     userinputWhat.textContent = "Enter initials: ";
     submitButton.innerHTML = "Submit";

    gameOverScreen.appendChild(gameOver);
    gameOverScreen.appendChild(userScore);
    gameOverScreen.appendChild(userinputWhat);
    gameOverScreen.appendChild(userInput); 
    myButton.appendChild(submitButton);


    submitButton.addEventListener("click", function (event){
         event.preventDefault();
         if (userInput.value.length === 0) {
              alert("Please enter initials before submitting");
         } else {

         localStorage.setItem("name", userInput.value);
         localStorage.setItem("score", wins);
         window.location.href = "results.html";
        
         }
    });

     answerOptions.remove();
     quizBox.remove();
}


//function to start quiz
function startQuiz() {
     //start timer
   updateTimer();
   var rules = document.querySelector("#rulesFirst");
   rules.remove();
   var startButton = document.querySelector("#startButton");
   startButton.remove();
   //queston function
   startQuestion();
}

//function that will display the questions
function startQuestion () {
      currentQuestion = theQuestions[currentIndex];
      quizBox.textContent = currentQuestion.question;

     
     answerOptions.classList.remove("visibility");

     answer1.textContent = currentQuestion.choice1;
     answer2.textContent = currentQuestion.choice2;
     answer3.textContent = currentQuestion.choice3;
     answer4.textContent = currentQuestion.choice4;

     answer1.addEventListener("click", selectAnswer);
     answer2.addEventListener("click", selectAnswer);
     answer3.addEventListener("click", selectAnswer);
     answer4.addEventListener("click", selectAnswer);
        }


//answer button function
function selectAnswer (event) {
     
   var clicked = event.currentTarget.textContent;

   if (clicked === currentQuestion.answer) {
        result.textContent = "Correct!";
        wins++;
        score.textContent = "Score: " + wins;
   }   
   else {
        result.textContent = "Wrong!";
        timeLeft -= 5;
   }
   
   if (currentIndex === theQuestions.length - 1) {
      
      timeLeft = 0
   } 
   else {
        currentIndex++
        startQuestion()
   }

}

//Queston and answers array
     var theQuestions = [
     {question: "What does HTML stand for?",
      choice1: "Hyper Trainer Marking Language",
      choice2: "Hyper Text Marketing Language",
      choice3: "Hyper Text Markup Language",
      choice4: "Hyper Text Markup Leveler",
      answer: "Hyper Text Markup Language"
     },
     {question: "Can you name one Javascript data type?",
      choice1: "Head",
      choice2: "HTML",
      choice3: "Body",
      choice4: "Object",
      answer: "Object"
     },
     {question: "Which of the following keywords is used to define a variable in Javascript?",
     choice1: "Var", 
     choice2: "script", 
     choice3: "link", 
     choice4: "string",
     answer: "Var"
     },           
     {question: "Which of the following methods is used to access HTML elements using Javascript?",
     choice1: "getElementById",
     choice2: "useElementById",
     choice3: "use ElementByName",
     choice4: "getElementByName",
     answer: "getElementById"
     },             
     {question: "Upon encountering empty statements, what does the Javascript interpreter do?",
     choice1: "Throws an Error",
     choice2: "Ignores the Statement",
     choice3: "Gives a Warning",
     choice4: "Drinks coffee and tries again",
     answer: "Ignores the Statement"
     }             
     ];



rules ();
