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
                if(score > maxScore) maxScore = score;
                score = 0;
                $('#score').text(score);
                $('#high-score').text(maxScore);


            }
        }, 1000);
    }
}

let createQuestion = function (limit) {
    let typeArr = [];
    $('input[type=checkbox]').each(function () {
        if ($(this).is(':checked')) typeArr.push($(this).siblings().first().text());
    });
    let rand = Math.floor(Math.random() * typeArr.length);
    return { values: [Math.floor(Math.random() * limit) + 1, Math.floor(Math.random() * limit) + 1], type: typeArr[rand] }

}
let question = createQuestion($('#question-range').val());

$('#question').text(`${question.values[0]} + ${question.values[1]}`);
$('#answer-input').on('keyup', function () {
    starTime();
    let answerInput = $('#answer-input').val();
    compareAnwser(parseInt(answerInput));
});

$('#question-range').on('change', function () {
    $('#range-text').text($(this).val());
})

let compareAnwser = function (answer) {
    let qs = createAnswer();
    if (qs === answer) {
        time++;
        renderTime();
        score++;
        $('#score').text(score);
        question = createQuestion($('#question-range').val());
        renderQuestion();
    }
}

let createAnswer = function () {
    switch (question.type) {
        case '+':
            return question.values.reduce((a, b) => a + b);
        case '-':
            return question.values.reduce((a, b) => a - b);
        case 'x':
            return question.values.reduce((a, b) => a * b);
        case '/':
            return Math.floor(question.values.reduce((a, b) => b / a));
    }
}

let renderQuestion = function () {
    let range = $('#question-range').val();
    question = createQuestion(range);
    if(question.type === '/') {
        question.values[0] = (Math.floor(Math.random() * range) + 1);
        question.values[1] = question.values[0] * (Math.floor(Math.random() * range) + 1);
        $('#question').text(`${question.values[1]} ${question.type} ${question.values[0]}`);
    } else if (question.type === '-') {
        question.values.sort((a,b) => b - a);
        $('#question').text(`${question.values[0]} ${question.type} ${question.values[1]}`);
    } 
    else {
        $('#question').text(`${question.values[0]} ${question.type} ${question.values[1]}`);
    }
    $('#answer-input').val('');
}