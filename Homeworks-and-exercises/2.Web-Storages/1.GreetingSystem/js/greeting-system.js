/**
 * Created by PC on 01.03.2016 г..
 */
"use strict";
var input = $('input.put-info'),
    inputButton = $('button.put-info');

function saveInputName() {
    var name = input.val();
    localStorage.setItem('name', name);
}

function incrementSessionLoads() {
    if (!sessionStorage.counter) {
        sessionStorage.setItem('counter', 0);
    }

    var currentCount = sessionStorage.getItem('counter');
    currentCount++;
    sessionStorage.setItem('counter', currentCount);

    $('#session-visits-count').text('Session visits count: ' + currentCount);
}

function incrementTotalLoads () {
    if (!localStorage.counter) {
        localStorage.setItem('counter', 0);
    }

    var currentCount = localStorage.getItem('counter');
    currentCount++;
    localStorage.setItem('counter', currentCount);

    $('#total-visits-count').text('Total visits count: ' + currentCount);
}

incrementSessionLoads();
incrementTotalLoads();

inputButton.on('click', saveInputName);

if (localStorage.name !== 'undefined') {
    $('#greeting').text('Hello ' + localStorage.name);
    $('.put-info').hide();
}