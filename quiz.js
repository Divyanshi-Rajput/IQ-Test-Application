import { questions as allQuestions } from './ques.js';

let questions = [];  // To store the randomly selected 25 questions
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer;

// Function to select 25 random questions
function selectRandomQuestions() {
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }
  questions = allQuestions.slice(0, 5);  // Select 25 random questions
}

// Function to start the timer
function startTimer() {
  let startTime = Date.now();
  timer = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let seconds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / (1000 * 60));
    document.getElementById('timer').innerText = `Time Elapsed: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Function to load the current question
function loadQuestion() {
  const questionNumberElement = document.getElementById('question-number');
  const questionElement = document.getElementById('question');
  const questionImageElement = document.getElementById('question-image');
  const optionsContainer = document.getElementById('options');

  // Clear previous options
  optionsContainer.innerHTML = '';

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Set question number and question text
  questionNumberElement.innerText = `Question: ${currentQuestionIndex + 1}`;
  questionElement.innerHTML = currentQuestion.question;

  // Handle question image (if available)
  if (currentQuestion.questionImage) {
    questionImageElement.src = currentQuestion.questionImage;
    questionImageElement.style.display = 'block';
  } else {
    questionImageElement.style.display = 'none';
  }

  // Add options to the page
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('li');
    optionElement.innerHTML = `
      <input type="radio" name="option" id="option${index}" value="${option.value}">
      <label for="option${index}">
        ${option.imgSrc ? `<img src="${option.imgSrc}" alt="Option ${index}">` : option}
      </label>
    `;
    optionsContainer.appendChild(optionElement);
  });
}

// Function to check the selected answer
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  const selectedAnswer = selectedOption.value;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.answer) {
    correctAnswers++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Function to display the results
function showResults() {
  clearInterval(timer);  // Stop the timer

  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  const scoreElement = document.getElementById('score');

  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  scoreElement.innerText = `${correctAnswers} / ${questions.length}`;
}

// Initialize the quiz
selectRandomQuestions();  // Randomly select 25 questions
loadQuestion();  // Start the quiz
startTimer();

// Attach the click event to the submit button
document.getElementById('submit-btn').addEventListener('click', checkAnswer);