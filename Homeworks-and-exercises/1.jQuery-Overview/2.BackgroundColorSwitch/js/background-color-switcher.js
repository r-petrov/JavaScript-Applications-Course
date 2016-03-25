/**
 * Created by PC on 26.02.2016 г..
 */
"use strict";
function switchBackgroundColor() {
    var inputClass = $('#input-animal').val(),
        animalClass = '.' + inputClass,
        color = $('#color').val();

    if (animalClass && ($(animalClass).length > 0)) {
        $(animalClass).css('background-color', color);
    }
    else {
        alert('Insert a valid class selector first!');
    }
}

$('#paint').on('click', switchBackgroundColor);