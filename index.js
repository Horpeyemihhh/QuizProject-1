const quizData = [
  {
    question: "Which university is popularly known as the Premier University in Nigeria?",
    options: ["UNILAG", "UI", "UNN", "OAU"],
    correctAnswer: "UI"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Machine Language"
    ],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "Which of these is used to style web pages?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    correctAnswer: "CSS"
  },
  {
    question: "Which programming language is mainly used to make web pages interactive?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: "JavaScript"
  },
  {
    question: "Which of the following is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correctAnswer: "Cascading Style Sheets"
  },
  {
    question: "Which tag is used to create a button in HTML?",
    options: ["<input>", "<btn>", "<button>", "<click>"],
    correctAnswer: "<button>"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "**"],
    correctAnswer: "//"
  },
  {
    question: "Which method is used to store data permanently in the browser?",
    options: ["sessionStorage", "cookies", "localStorage", "cache"],
    correctAnswer: "localStorage"
  },
  {
    question: "Which of these devices is an input device?",
    options: ["Monitor", "Printer", "Keyboard", "Speaker"],
    correctAnswer: "Keyboard"
  }
];




let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const startElem = document.getElementById("startDiv")
const timerElem = document.getElementById("timer")
const questionElem = document.getElementById("question")
const optionsElem = document.getElementById("options")
const nextBtnElem = document.getElementById("next-btn")
const resultElem = document.getElementById("result")
const qAndO = document.getElementById("qAndO-Div")

//const q = questions[currentQuestion];


function startFunc() {
  let QUESTION_TIME = 15; // seconds per question

  document.getElementById("totalQuestions").textContent = quizData.length;
  document.getElementById("timePerQuestion").textContent = QUESTION_TIME;
  
  let startBtnElem = document.getElementById("startBtn");

  startBtnElem.addEventListener("click", () => {
    const boxElem = document.getElementById("quize-box");
    boxElem.style.display = "block";
    
    let openAdminBtn = document.getElementById("openAdminBtn");
    openAdminBtn.style.display ="none"
    
    startElem.style.display = "none"; // hide start div completely
    startQuiz(); // start quiz
  });
}



function startQuiz() {
  questions = [...quizData].sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  score = 0;
  resultElem.innerHTML = "";
  loadQuestion();
}




function loadQuestion() {
    clearInterval(timer);
    let QUESTION_TIME = 15;
    timeLeft = QUESTION_TIME;
    updateTimer();
    timer = setInterval(countdown, 1000);
    
    const q = questions[currentQuestion];
    
    questionElem.textContent = `Q${currentQuestion + 1}. ${q.question}`;
    
    optionsElem.innerHTML = "";
    
    q.options.forEach((option, index) => {
       const btn = document.createElement("button")
       btn.classList.add("option-btn")
       btn.innerText = option;
       btn.addEventListener("click", () => selectAnswer(index, true))
       optionsElem.appendChild(btn); 
    })
    
    nextBtnElem.style.display = "none";
}


function countdown() {
  timeLeft--;
  updateTimer();
  
  if (timeLeft === 0) {
    clearInterval(timer);
    const correctIndex = questions[currentQuestion].options.indexOf(
      questions[currentQuestion].correctAnswer
    );
    selectAnswer(correctIndex, false);
  }
}


function updateTimer() {
  timerElem.textContent = `⏱️ ${timeLeft}`;
}



function selectAnswer(index, shouldScore) {
  clearInterval(timer);

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");
  const correctIndex = q.options.indexOf(q.correctAnswer);

  buttons.forEach(btn => btn.disabled = true);

  if (index === correctIndex) {
    shouldScore && score++;
    buttons[index].style.background = "green";
  } else {
    buttons[index].style.background = "red";
    buttons[correctIndex].style.background = "green";
  }

  nextBtnElem.style.display = "inline-block";
}
    
nextBtnElem.addEventListener("click", () => {
    currentQuestion++;
        
    if (currentQuestion < questions.length) {
            loadQuestion();
        }else {
            showResult();
    }
        
})
    
    

function showResult() {
  clearInterval(timer);
  nextBtnElem.style.display = "none";
  qAndO.style.display = "none"

  let currentScore = Number(score);
  const highScore = Number(localStorage.getItem("quizHighScore")) || 0;

  const isNew = currentScore > highScore;

  if (isNew) {
    localStorage.setItem("quizHighScore", currentScore);
  }

  resultElem.innerHTML = `
    <h2>Hurray!!! Quiz Completed</h2>
    <p>You have scored ${currentScore} out of ${questions.length} questions</p>
    <p>Highest Score: ${Math.max(currentScore, highScore)}</p>
    ${isNew ? "<p>Hey, New High Score!</p>" : ""}
    <button id="restartBtn">Restart Quiz</button>
  `;
 document.getElementById("restartBtn").addEventListener("click", restartQuiz);
}



function restartQuiz() {
  resultElem.innerHTML = "";
  nextBtnElem.style.display = "none";
  qAndO.style.display = "block"
  startQuiz();
}


startFunc();


// =============== ADMIN PANEL ===============
let openAdminBtn = document.getElementById("openAdminBtn");
const adminPanel = document.getElementById("adminPanel");


openAdminBtn.addEventListener("click", () => {
  adminPanel.style.display = "block";
  
  document.getElementById("newQuestion").value = "";
  document.getElementById("correctAnswerInput").value = "";
  
  const optionInputs = document.querySelectorAll(".optInput");
  optionInputs.forEach(input => (input.value = ""));
});


closeAdminBtn.addEventListener("click", () => {
  adminPanel.style.display = "none";  
});



document.getElementById("saveQuestionBtn").addEventListener("click", () => {
  const questionText = document.getElementById("newQuestion").value.trim();
  const optionInputs = document.querySelectorAll(".optInput");
  const correctAnswer = document
    .getElementById("correctAnswerInput")
    .value.trim();

  const options = [];

  optionInputs.forEach(input => {
    if (input.value.trim() !== "") {
      options.push(input.value.trim());
    }
  });

  // VALIDATION
  if (!questionText || options.length < 2 || !correctAnswer) {
    alert("Please fill all fields correctly");
    return;
  }

  if (!options.includes(correctAnswer)) {
    alert("Correct answer must match one of the options");
    return;
  }

  // ADD TO QUIZ DATA
  quizData.push({
    question: questionText,
    options: options,
    correctAnswer: correctAnswer
  });

  alert("Question added successfully!");

  // CLEAR INPUTS
  document.getElementById("newQuestion").value = "";
  document.getElementById("correctAnswerInput").value = "";
  optionInputs.forEach(input => (input.value = ""));
});
