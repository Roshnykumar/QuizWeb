document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('.start-btn');
  const popupInfo = document.querySelector('.popup-info');
  const exitBtn = document.querySelector('.exit-btn');
  const main = document.querySelector('.main');
  const continueBtn = document.querySelector('.continue-btn');
  const quizSection = document.querySelector('.quiz-section');
  const quizBox = document.querySelector('.quiz-box');
  const nextBtn = document.querySelector('.next-btn');
  const optionList = document.querySelector('.option-list');
  const resultBox = document.querySelector('.result-box');
  const tryAgainBtn = document.querySelector('.tryAgain-btn');
  const homeBtn = document.querySelector('.goHome-btn');

  let questionCount = 0;
  let questionNumb = 1;
  let userScore = 0;

  startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
  };

  exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
  };

  continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
  };

  nextBtn.onclick = () => {
    questionCount++;
    if (questionCount < questions.length) {
      showQuestions(questionCount);
      questionNumb++;
      questionCounter(questionNumb);
      nextBtn.classList.remove('active');
    } else {
      showResultBox();
    }
  };

  tryAgainBtn.onclick = () => {
    resetQuiz();
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
  };

  homeBtn.onclick = () => {
    resetQuiz();
    main.classList.remove('active');
    popupInfo.classList.remove('active');
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    quizBox.classList.remove('active');
  };

  function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(0);
    questionCounter(1);
    headerScore();
    nextBtn.classList.remove('active');
  }

  function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    optionList.innerHTML = questions[index].options.map(option => `<div class="option"><span>${option}</span></div>`).join('');

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.onclick = () => {
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        optionSelected(option);
      };
    });
  }

  function optionSelected(answer) {
    let userAnswer = answer.textContent.trim();
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
      answer.classList.add('correct');
      userScore += 1;
      headerScore();
    } else {
      answer.classList.add('incorrect');
      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent === correctAnswer) {
          optionList.children[i].classList.add('correct');
        }
      }
    }

    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active');
  }

  function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
  }

  function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
  }

  function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const percentage = (userScore / questions.length) * 100;
    const progressValue = document.querySelector('.progress-value');
    const circularProgress = document.querySelector('.circular-progress');
    const scoreText = document.querySelector('.score-test');
    const congratulationsMessage = document.querySelector('.congratulations-message');

    circularProgress.style.background = `conic-gradient(#c40094 0deg, rgba(255, 255, 255, 0.1) 0deg)`;
    setTimeout(() => {
      circularProgress.style.background = `conic-gradient(#c40094 ${percentage * 3.6}deg, rgba(255, 255, 255, 0.1) ${percentage * 3.6}deg)`;
    }, 10);

    let currentPercentage = 0;
    const interval = setInterval(() => {
      if (currentPercentage >= percentage) {
        clearInterval(interval);
      } else {
        currentPercentage++;
        progressValue.textContent = `${currentPercentage}%`;
      }
    }, 20);

    scoreText.textContent = `You scored ${userScore} out of ${questions.length}`;

    if (percentage === 100) {
      congratulationsMessage.style.display = 'block';
    }
  }
});
