let time = 10;
let timer = null;
let score = 0;
let maxScore = 0;
let renderTime = function () {
    $('#timer').text(time);
}
let starTime = function () {
    if (!timer) {
        timer = setInterval(function () {
            time--;
            renderTime();
            if (time === 0) {
                clearInterval(timer);
                timer = null;
                time = 10;
                $('#answer-input').val('');
                renderTime();
                maxScore = score;
                score = 0;
                $('#score').text(score);
                $('#high-score').text(maxScore);


            }
        }, 1000);
    }
}

let createQuestion = function (limit) {
    return [Math.floor(Math.random() * limit), Math.floor(Math.random() * limit)];
}
let question = createQuestion($('#question-range').val());

$('#question').text(`${question[0]} + ${question[1]}`);
$('#answer-input').on('keyup', function () {
    starTime();
    let answerInput = $('#answer-input').val();
    compareAnwser(question.reduce((a, b) => a + b), parseInt(answerInput));
});

$('#question-range').on('change', function () {
    $('#range-text').text($(this).val());
})

let compareAnwser = function (qs, answer) {
    if (qs === answer) {
        time++;
        renderTime();
        score++;    
        $('#score').text(score);
        question = createQuestion($('#question-range').val());
        renderQuestion();
    }
}

let renderQuestion = function () {
    question = createQuestion($('#question-range').val());
    $('#question').text(`${question[0]} + ${question[1]}`);
    $('#answer-input').val('');
}