const questions = [
  {
    emoji: "🦁",
    question: "What is a group of lions called?",
    options: ["A pack", "A pride", "A herd", "A colony"],
    answer: 1,
  },
  {
    emoji: "🐘",
    question: "Which is the largest land animal on Earth?",
    options: ["African elephant", "White rhino", "Giraffe", "Hippopotamus"],
    answer: 0,
  },
  {
    emoji: "🐆",
    question: "Which animal is the fastest land runner?",
    options: ["Lion", "Pronghorn", "Cheetah", "Ostrich"],
    answer: 2,
  },
  {
    emoji: "🦉",
    question: "Owls are famous for being able to rotate their heads up to how many degrees?",
    options: ["180°", "270°", "360°", "90°"],
    answer: 1,
  },
  {
    emoji: "🐬",
    question: "Which of these animals is a mammal, not a fish?",
    options: ["Shark", "Dolphin", "Eel", "Tuna"],
    answer: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEmoji = document.getElementById("questionEmoji");
const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");
const confettiContainer = document.getElementById("confettiContainer");

function loadQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.classList.add("hidden");

  const q = questions[currentQuestion];
  questionEmoji.textContent = q.emoji;
  questionText.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(btn);
  });

  progressFill.style.width = `${((currentQuestion) / questions.length) * 100 + 20}%`;
  progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = optionsEl.querySelectorAll(".option-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.answer) {
    score++;
    feedbackEl.textContent = "🎉 Correct! Nicely done.";
    feedbackEl.classList.add("correct-text");
    burstConfetti(20);
  } else {
    feedbackEl.textContent = `❌ Not quite — the right answer was "${q.options[q.answer]}".`;
    feedbackEl.classList.add("wrong-text");
  }

  nextBtn.classList.remove("hidden");
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "See My Score 🏁" : "Next Question ➡️";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizCard.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultCard.classList.remove("hidden");
  progressFill.style.width = "100%";
  progressText.textContent = "Quiz Complete!";

  scoreText.textContent = `You scored ${score} / ${questions.length}`;

  let emoji, title, message;
  const pct = score / questions.length;
  if (pct === 1) {
    emoji = "🏆";
    title = "Perfect Score!";
    message = "You're a certified animal genius! 🐾";
    burstConfetti(80);
  } else if (pct >= 0.6) {
    emoji = "🌟";
    title = "Great Job!";
    message = "You really know your wildlife!";
    burstConfetti(40);
  } else if (pct >= 0.4) {
    emoji = "🙂";
    title = "Not Bad!";
    message = "A little more safari time and you'll be an expert.";
  } else {
    emoji = "🐣";
    title = "Keep Exploring!";
    message = "Every expert started as a beginner — try again!";
  }

  resultEmoji.textContent = emoji;
  resultTitle.textContent = title;
  resultMessage.textContent = message;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  loadQuestion();
});

function burstConfetti(count) {
  const colors = ["#8e44ff", "#ff5ea8", "#ff9a3c", "#ffd93d", "#3ddc97", "#3ca5ff"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = Math.random() * 8 + 6;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.4}px`;
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${Math.random() * 1.5 + 2}s`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}

function spawnFloatingEmojis() {
  const container = document.getElementById("floatingEmojis");
  const animals = ["🐾", "🦋", "🐢", "🦜", "🐝", "🐞", "🦢"];
  for (let i = 0; i < 14; i++) {
    const span = document.createElement("span");
    span.textContent = animals[Math.floor(Math.random() * animals.length)];
    span.style.left = `${Math.random() * 100}vw`;
    span.style.animationDuration = `${Math.random() * 10 + 12}s`;
    span.style.animationDelay = `${Math.random() * 12}s`;
    span.style.fontSize = `${Math.random() * 18 + 20}px`;
    container.appendChild(span);
  }
}

spawnFloatingEmojis();
loadQuestion();
