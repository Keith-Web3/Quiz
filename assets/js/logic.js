// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0
let time = questions.length * 15
let timerId

// add variables to reference DOM elements
// example is below
const questionsEl = document.getElementById('questions')
const startBtn = document.getElementById('start')
const start_screen = document.getElementById('start-screen')
const wrapper = document.getElementById('wrapper')
const submitBtn = document.getElementById('submit')
const ques_title = document.getElementById('question-title')
const ques_choices = document.getElementById('choices')
const timeEl = document.getElementById('time')
const endScreenEl = document.getElementById('end-screen')
const feedbackEl = document.getElementById('feedback')
const finalScore = document.getElementById('final-score')
const initials = document.getElementById('initials')

// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav')
let sfxWrong = new Audio('assets/sfx/incorrect.wav')

function startQuiz() {
  // hide start screen
  start_screen.style.display = 'none'

  // un-hide questions section
  questionsEl.style.display = 'block'
  //not working

  // start timer
  timerId = window.setInterval(function () {
    timeEl.innerHTML = --time
    if (time <= 0) {
      time = 0
      timeEl.innerHTML = 0
      quizEnd()
    }
  }, 1000)

  // show starting time
  timeEl.innerHTML = time

  // call a function to show the next question
  getQuestion()
}

function getQuestion() {
  // get current question object from array
  let currentQuestion = questions[currentQuestionIndex]

  ques_title.textContent = currentQuestion.title

  currentQuestion.choices.map((el, idx) => {
    const option = document.createElement('li')
    option.textContent = el
    option.className = 'option'

    option.addEventListener('click', function () {
      if (el === currentQuestion.answer) {
        sfxRight.play()
        feedbackEl.textContent = 'Correct'
        feedbackEl.classList.remove('hide')
        window.setTimeout(function () {
          currentQuestionIndex++
          ques_choices.innerHTML = ''
          feedbackEl.classList.add('hide')
          if (currentQuestionIndex === questions.length - 1) {
            quizEnd()
            return
          }
          getQuestion()
        }, 1000)
        return
      }

      sfxWrong.play()
      time = time - 15
      feedbackEl.textContent = 'Wrong'
      feedbackEl.classList.remove('hide')
      window.setTimeout(function () {
        feedbackEl.classList.add('hide')
      }, 1000)
    })

    ques_choices.appendChild(option)
  }, '')
}

initials.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return
  saveHighScore()
})

function questionClick(event) {
  // identify the targeted button that was clicked on
  // if the clicked element is not a choice button, do nothing.
  // check if user guessed wrong
  // if () {
  // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
  // recall the timer is the score they get at the end
  // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz
  // display new time on page
  // play "wrong" sound effect
  // display "wrong" feedback on page
}

//else {
// play "right" sound effect

// display "right" feedback on page by displaying the text "Correct!" in the feedback element

//}
// flash right/wrong feedback on page for half a second
// set the feedback element to have the class of "feedback"

// after one second, remove the "feedback" class from the feedback element

// move to next question
// check if we've run out of questions
// if the time is less than zero and we have reached the end of the questions array,
// call a function that ends the quiz (quizEnd function)
// or else get the next question

// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  window.clearInterval(timerId)

  questionsEl.style.display = 'none'
  endScreenEl.style.display = 'block'
  finalScore.textContent = time
  // show end screen
  // show final score
  // hide the "questions" section
}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time
  let updateTimer = window.setInterval()
  // update the element to display the new time value

  // check if user ran out of time; if so, call the quizEnd() function
}

// complete the steps to save the high score
function saveHighScore() {
  const userInitials = initials.value
  let highscores = localStorage.getItem('highscores')

  if (userInitials.trim() === '') {
    feedbackEl.textContent = 'Please enter initials'
    feedbackEl.classList.remove('hide')
  }
  if (highscores === null) {
    highscores = [{ initials: userInitials, score: time }]
  } else {
    highscores = JSON.parse(highscores)
    highscores = [...highscores, { initials: userInitials, score: time }]
  }

  localStorage.setItem('highscores', JSON.stringify(highscores))
  window.location = 'highscores.html'

  // get the value of the initials input box
  // make sure the value of the initials input box wasn't empty
  // if it is not, check and see if there is a value of high scores in local storage
  // if there isn't any, then create a new array to store the high score
  // add the new initials and high score to the array
  // convert the array to a piece of text
  // store the high score in local storage
  // otherwise, if there are high scores stored in local storage,
  // retrieve the local storage value that has the high scores,
  // convert it back to an array,
  // add the new initials and high score to the array,
  // then convert the array back to a piece of text,
  // then store the new array (converted to text) back in local storage
  // finally, redirect the user to the high scores page.
}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
}

// user clicks button to submit initials
submitBtn.onclick = saveHighScore

// user clicks button to start quiz
startBtn.onclick = startQuiz

// user clicks on an element containing choices
// choicesEl.onclick = questionClick

// initialsEl.onkeyup = checkForEnter
