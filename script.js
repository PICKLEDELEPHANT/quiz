const startButton = document.getElementById('start-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const statusElement = document.getElementById('status')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0
    score = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer-btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
        score++
    }
    currentQuestionIndex++
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion()
    } else {
        endGame()
    }
}

function endGame() {
    questionContainer.classList.add('hide')
    statusElement.innerText = `Your Score: ${score}/${shuffledQuestions.length}`
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'London', correct: false },
            { text: 'Paris', correct: true }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Harper Lee', correct: true },
            { text: 'Stephen King', correct: false }
        ]
    },
    {
        question: 'What is the powerhouse of the cell?',
        answers: [
            { text: 'Mitochondria', correct: true },
            { text: 'Ribosome', correct: false },
            { text: 'Nucleus', correct: false },
            { text: 'Endoplasmic reticulum', correct: false }
        ]
    },
    {
        question: 'What year did World War II end?',
        answers: [
            { text: '1945', correct: true },
            { text: '1939', correct: false },
            { text: '1940', correct: false },
            { text: '1950', correct: false }
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Michelangelo', correct: false }
        ]
    }
];

