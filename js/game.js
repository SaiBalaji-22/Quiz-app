const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const ques_cnt = document.getElementById("ques_cnt");
const scoreText = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let counter = 0;
let avail_questions = [];

let All_Questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple")
    .then(res => {
    return res.json();
    })
    .then(data => {
        console.log(data.results);
        All_Questions = data.results.map(data => {
            const formattedquestion = {
                question: data.question
            };
            const answerChoices = [...data.incorrect_answers];
            formattedquestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedquestion.answer - 1, 0, data.correct_answer);
            answerChoices.forEach((choice, index) => {
                formattedquestion["choice" + (index + 1)] = choice;
            })

            return formattedquestion;
        })
    startGame();
    })
    .catch(err => {
        console.log(err);
    })

const correct_mark = 1;
const max_questions = 5;

startGame = () => {
    counter = 0;
    score = 0;
    avail_questions = [...All_Questions];
    getNewquestion();
};

getNewquestion = () => {
    if (avail_questions.length === 0 || counter >= max_questions) {
        localStorage.setItem('recentscore', score);
        return window.location.assign("./end.html");
    }

    counter++;
    ques_cnt.innerText = 'Question ' + counter + '/' + max_questions;
    progressbarfull.style.width = `${(counter / max_questions) * 100}%`

    const index = Math.floor(Math.random() * avail_questions.length);
    currentQuestion = avail_questions[index];

    question.innerHTML =  currentQuestion.question;

    choices.forEach(choice => {
        const num = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + num];
    });

    avail_questions.splice(index, 1);

    acceptAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptAnswers) return;
        
        acceptAnswers = false;
        const selected = e.target;
        const selectedAnswer = selected.dataset['number'];

        let classApply = 'wrong'
        if (selectedAnswer == currentQuestion.answer) {
            classApply = 'correct';
            score += correct_mark;
        }

        selected.parentElement.classList.add(classApply);
        scoreText.innerText = score;
        setTimeout(() => {
            selected.parentElement.classList.remove(classApply);
            getNewquestion();
        }, 1000);
    });
});

