/**
 * Created by PC on 02.03.2016 г..
 */
"use strict";
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }

    // we don't want to wait a full second before the timer starts
    timer();
    timerId = setInterval(timer, 1000);
}

window.addEventListener('load', function () {
    var duration = 60 * 5,
        display = document.querySelector('#time');
    startTimer(duration, display);
    loadFromLocalStorage();
});

function saveToLocalStorage(input) {
    input = $(input);
    if (input.attr('type') == 'radio') {
        var id = input.parents('fieldset').children('legend').text(),
            value = input.val();

        answers[id] = value;
        localStorage['info'] = JSON.stringify(answers);
    }
}

function loadFromLocalStorage() {
    if (localStorage.getItem('info') && localStorage.getItem('info').length > 0) {
        var info = JSON.parse(localStorage.getItem('info')),
            keys = Object.keys(info),
            radioTags = $('input'),
            names = $('#names').val(),
            index,
            key,
            value,
            i,
            tag;

        for (index in keys) {
            key = keys[index];
            value = info[key];

            for (i in radioTags) {
                tag = radioTags[i];

                if (value === tag.value) {
                    tag.checked = true;
                }
            }
        }
    }
}

function displayAnswers() {
    if (localStorage.getItem('info') && localStorage.getItem('info').length > 0) {
        var info = JSON.parse(localStorage.getItem('info')),
            keys = Object.keys(info),
            ul = $('#info'),
            names = $('#names').val(), // моля, ако разполагате с повече време, знаете отговора, ми обяснете защо името е празен стринг?!!
            index,
            key,
            value;

        ul.append("<li>" + names + "</li>");
        for (index in keys) {
            key = keys[index];
            value = info[key];

            ul.append('<li>' + key + ' ' + value + '</li>');
        }
    }
}

var input = $('label input'),
    timerId,
    answers = {};

input.on('click', function() {
    saveToLocalStorage(this);
});

$('#submit').on('click', displayAnswers());

$('#clear').on('click', function() {
    window.localStorage.clear();
    location.reload();
    return false;
});

$('button').on('click', function() {
    console.log(timerId);
    clearInterval(timerId);
});
