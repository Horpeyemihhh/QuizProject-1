const quizData = [
    {
      question : "The best University in Nigeria is?",
      options : ["UNILAG", "LASU", "UI", "UNILORIN"],
      correct : 2
    },
    {
      question : "The Name of the social secretary in department of History, UI is?",
      options : ["Faruq", "Nabeelah", "Nabadam", "Hassan"],
      correct : 1
    },
    {
      question : "Who is the most beautiful girl in UI?",
      options : ["Nabeelah", "Aishat", "Janet", "Ruqoyah"],
      correct : 0
    }
]

let questions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

const timerElem = document.getElementById("timer")
const questionElem = document.getElementById("question")
const optionsElem = document.getElementById("options")
const nextBtnElem = document.getElementById("next-btn")
const resultElem = document.getElementById("result")

const q = questions[currentQuestion];

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
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
      selectAnswer(questions[currentQuestion]?.correct, false)
  }
}

function updateTimer() {
  timerElem.textContent = `⏱️ ${timeLeft}`;
}



function selectAnswer(index, shouldScore) {
    clearInterval(timer);
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option-btn");
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (index === q.correct) {
        shouldScore && score++;
        buttons[index].style.background = "green"; 
    }else {
       buttons[index].style.background = "red"; 
       buttons[q.correct].style.background = "green"
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
  nextBtnElem.style.display = "none";

  const currentScore = Number(score);
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
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}




loadQuestion();