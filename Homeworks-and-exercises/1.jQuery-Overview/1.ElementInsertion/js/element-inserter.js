/**
 * Created by PC on 26.02.2016 г..
 */
'use strict';
function onButtonAddBeforeClick() {
    var animal = $('input').val();
    $('#wrapper ul').prepend('<li>' + animal + '</li>');
}

function onButtonAddAfterClick() {
    var animal = $('input').val();
    $('#wrapper ul').append('<li>' + animal + '</li>');
}

$('#add-before').on('click', onButtonAddBeforeClick);
$('#add-after').on('click', onButtonAddAfterClick);