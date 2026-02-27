//References
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;

//Questions and Options array

const quizData = [
  {
    id: "0",
    question: "What is the correct syntax to declare a variable in Javascript?",
    options: ["let myVariable;", "let = myVariable;", "let myVariable:", "myVariable let"],
    answer: "let myVariable;",
  },
  {
    id: "1",
    question: "How do you write a conditional statement in Javascript?",
    options: ["if (condition){}", "if condition {}", "if condition then {}", "if {condition}"],
    answer: "if (condition){}",
  },
  {
    id: "2",
    question: "Which loop will execute at least once even if the condition is false?",
    options: ["for loop", "while loop", "do...while loop", "foreach loop"],
    answer: "do...while loop",
  },
  {
    id: "3",
    question: "How do you create an array in JavaScript?",
    options: ["var arr = [];", "var arr = {};", "var arr = ();", "var arr = <>;"],
    answer: "var arr = [];",
  }
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hidden");
  scoreContainer.classList.add("hidden");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizData.length) {
      //hide question container and display score
      displayContainer.classList.add("hidden");
      scoreContainer.classList.remove("hidden");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizData.length + " Question";
      //display quiz
      quizDisplay(questionCount);
    }
  })
);

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hidden");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hidden");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizData.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizData) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hidden");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizData.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizData[questionCount].answer) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizData[questionCount].answer) {
        element.classList.add("correct");
      }
    });
  }

  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  displayContainer.classList.remove("hidden");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hidden");
  displayContainer.classList.add("hidden");
};