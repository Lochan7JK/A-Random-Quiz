const questions = [
    {
        question: "What is the capital of Canada?",
        answers: [
            {text: "Toronto", correct: false},
            {text: "Vancouver", correct: false},
            {text: "Ottawa", correct: true},
            {text: "Montreal", correct: false},
        ]
    },

    { 
        question: "Who is known as the 'Merc with a Mouth'?",
        answers: [
            {text: "Deadpool", correct: true},
            {text: "The Flash", correct: false},
            {text: "Wolverine", correct: false},
            {text: "Batman", correct: false},
        ]
    },

    {
        question: "What was the middle name of Chandler from the TV show F.r.i.e.n.d.s?",
        answers: [
            {text: "Bing", correct: false},
            {text: "Muriel", correct: true},
            {text: "Karen ", correct: false},
            {text: "Eustace", correct: false},
        ]
    },

    {
        question: "What is the name of the Death Note’s Shinigami?",
        answers: [
            {text: "Rem", correct: false},
            {text: "Light", correct: false},
            {text: "Ryuk", correct: true},
            {text: "Misa", correct: false},
        ]
    },

    {
        question: "Who directed the Hollywood movies Inception, Dunkirk and Oppenheimer?",
        answers: [
            {text: "Quentin Tarantino", correct: false},
            {text: " Christopher Nolan", correct: true},
            {text: "Steven Spielberg", correct: false},
            {text: "James Cameron", correct: false},
        ]
    },

    {
        question: "Which house values intelligence and wisdom?",
        answers: [
            {text: "Gryffindor", correct: false},
            {text: "Slytherin", correct: false},
            {text: "Ravenclaw", correct: true},
            {text: "Hufflepuff", correct: false},
        ]
    },

    {
        question: "Which Bollywood movie featured the song 'Kabira'?",
        answers: [
            {text: "Yeh Jawaani Hai Deewani", correct: true},
            {text: "Aashiqui 2", correct: false},
            {text: "Dilwale", correct: false},
            {text: "Kabir Singh", correct: false},
        ]
    },

    {
        question: "What will be the output of console.log(typeof NaN);??",
        answers: [
            {text: "null", correct: false},
            {text: "number", correct: true},
            {text: "undefined", correct: false},
            {text: "string", correct: false},
        ]
    },

    {
        question: "What brand has the slogan 'Just Do It'?",
        answers: [
            {text: "Adidas", correct: false},
            {text: "Puma", correct: false},
            {text: "Nike", correct: true},
            {text: "Reebok", correct: false},
        ]
    },

    {
        question: "What does setTimeout(function() { console.log('Hello'); }, 0); do?",
        answers: [
            {text: "Runs immediately", correct: false},
            {text: "Runs before synchronous code", correct: false},
            {text: "Throws an error", correct: false},
            {text: "Runs after all synchronous code", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(ans => {
        const button = document.createElement("button");
        button.innerHTML = ans.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(ans.correct){
            button.dataset.correct = ans.correct; // it'll add true or false in button.dataset.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

// This will remove all the previous (by default coming) answers
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){ // e = event
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    // we have to disable the click(colour) after selecting one answer
    // on selecting wrong answer it should automatically highlight the correct answer with green colour

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){ // for each button it will check the dataset
            button.classList.add("correct"); // add a class "correct" with green colour
        }
        // suppose if we've selected the wrong answer, then it'll go and check other answers in search of correct answer
        button.disabled = true; //button will get disabled (you can click on a button ONLY ONCE)
        // now we cannot click on any button 
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

// Next Button
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
