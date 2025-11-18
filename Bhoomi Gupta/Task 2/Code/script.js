const quizData = [
  {
    question: "1️⃣ Which language runs in a web browser?",
    type: "mcq",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "2️⃣ The Earth revolves around the Sun.",
    type: "truefalse",
    options: ["True", "False"],
    correct: "True"
  },
  {
    question: "3️⃣ Select all programming languages.",
    type: "checkbox",
    options: ["HTML", "Python", "CSS", "C++"],
    correct: ["Python", "C++"]
  },
  {
    question: "4️⃣ What does HTML stand for?",
    type: "mcq",
    options: [
      "Hyper Text Markup Language",
      "Highlevel Text Making Language",
      "Hyper Transfer Machine Language",
      "None"
    ],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "5️⃣ CSS is used for styling web pages.",
    type: "truefalse",
    options: ["True", "False"],
    correct: "True"
  }
];
let currentQuestion = 0;
let score = 0;
// Load question
function loadQuestion() {
  const quiz = quizData[currentQuestion];
  document.getElementById("question").innerText = quiz.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  if (quiz.type === "checkbox") {
    quiz.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label><input type="checkbox" name="option" value="${opt}"> ${opt}</label>`;
    });
  } else {
    quiz.options.forEach(opt => {
      optionsDiv.innerHTML += `
        <label><input type="radio" name="option" value="${opt}"> ${opt}</label> `;
    });
  }
  updateProgress();
}
// Next question
function nextQuestion() {
  checkAnswer();
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResult();
  }
}
// Previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}
// Check answer
function checkAnswer() {
  const quiz = quizData[currentQuestion];
  let selected = [];
  if (quiz.type === "checkbox") {
    document.querySelectorAll('input[name="option"]:checked')
      .forEach(opt => selected.push(opt.value));
  } else {
    const checked = document.querySelector('input[name="option"]:checked');
    if (checked) selected.push(checked.value);
  }
  if (selected.length === 0) return;
  if (quiz.type === "checkbox") {
    if (JSON.stringify(selected.sort()) === JSON.stringify(quiz.correct.sort())) score++;
  } else if (selected[0] === quiz.correct) score++;
}
// Progress bar
function updateProgress() {
  const progress = document.getElementById("progress");
  progress.style.width = ((currentQuestion / quizData.length) * 100) + "%";
}
// Show result
function showResult() {
  document.getElementById("quiz").innerHTML = `
    <div class="emoji">🎉</div>
    <h2>Quiz Completed!</h2>
    <p class="result">Your Score: ${score} / ${quizData.length}</p>
    <p>${score === quizData.length ? "🏆 Perfect!" :
         score >= 3 ? "🔥 Great Job!" :
                      "Keep Practicing 💪"}</p>
    <button onclick="restartQuiz()">Restart</button>
  `;
}
// Restart
function restartQuiz() {
  location.reload();
}
loadQuestion();
