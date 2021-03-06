var pageContentEl = document.querySelector("#page-content");
var questionIndex = 0;
var sec = 75;
var initialsEl = document.getElementById('initials');
// var highScoreButton = document.querySelector("#submit");
// initialsEl.setAttribute("class", "hide");

function timer() {
    var timer = setInterval(function () {
        sec--;
        document.getElementById("time-left").innerHTML = "Time: " + sec;
        if (sec < 0 || !myQuestions[questionIndex]) {
            endQuiz();
            clearInterval(timer);
        }
    }, 1000);
}

var taskButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    console.log(targetEl);
    if (targetEl.matches(".start")) {
        timer();
        getQuestion();
    } else if (targetEl.matches("#correct")) {
        questionIndex++;
        getQuestion();
    } else if (targetEl.matches("#wrong")) {
        sec = sec - 10;
        questionIndex++;
        getQuestion();
    }
};

const myQuestions = [
    {
        question: "Commonly used data types do NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers"
        },
        correctAnswer: 3
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        answers: {
            1: "quotes",
            2: "curly brackets",
            3: "parenthesis",
            4: "square brackets"
        },
        correctAnswer: 2
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        answers: {
            1: "number and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above"
        },
        correctAnswer: 4
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        answers: {
            1: "commas",
            2: "curly brackets",
            3: "quotes",
            4: "parenthesis"
        },
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "JavaScript",
            2: "terminal/bash",
            3: "for loops",
            4: "console.log"
        },
        correctAnswer: 4
    }
];

var getQuestion = function () {
    if (questionIndex < myQuestions.length) {
        var currentQuestion = myQuestions[questionIndex]
        var quiz = document.getElementById('page-content');
        quiz.innerHTML = "<h1>" + currentQuestion.question + "</h1>";
        for (let i = 1; i < myQuestions.length; i++) {
            quiz.insertAdjacentHTML('beforeend', "<div class='row'><div class='col-12'><button type='button' id='answer' class='btn btn-primary btn-lg'>" + currentQuestion.answers[i] + "</button></div></div>");
            if (i === currentQuestion.correctAnswer) {
                document.getElementById("answer").id = "correct";
            } else {
                document.getElementById("answer").id = "wrong";
            }
        }
    }

}

var endQuiz = function () {
    // initialsEl.setAttribute("id", "end-score");
    // document.getElementById("end-score").className = "high-score";
    var score = document.getElementById('page-content');
    score.innerHTML = "<h1>All done!</h1><p>Your final score is " + sec + ".</p>";
    score.appendChild(document.createTextNode("Enter initials: "));
    var input = document.createElement("input");
    input.id = "initials";
    input.type = "text";
    input.name = "initials";

    score.appendChild(input);
    var highScoreButton = document.createElement('input');
    highScoreButton.type = 'button';
    highScoreButton.id = 'submit';
    highScoreButton.value = 'Submit';
    highScoreButton.className = 'btn btn-primary btn-lg';
    score.appendChild(highScoreButton);

    console.log(initialsEl);
    console.log(input.value);

    highScoreButton.onclick = saveHighScore;



    console.log(initialsEl);
    }

var saveHighScore = function (event) {
    event.preventDefault();
    console.log(initialsEl);
    var temp = document.getElementById('initials');
    console.log(temp.value);
    var initialsText = temp.value;
    if (initialsText !== "") {
        var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
        var newScore = {
            score: sec,
            initials: initialsText
        }
        highScores.push(newScore);
        window.localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href = "highscores.html";
    }
}

// var checkEnter = function (event) {
//     if (event.key === "Enter") {
//         saveHighScore();
//     }
// }

// initialsEl.onkeyup = checkEnter;

// highScoreButton.onclick = saveHighScore;


pageContentEl.addEventListener("click", taskButtonHandler);

