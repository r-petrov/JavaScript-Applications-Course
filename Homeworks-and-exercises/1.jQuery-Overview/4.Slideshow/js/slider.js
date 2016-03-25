/**
 * Created by PC on 27.02.2016 г..
 */
"use strict";
var currentIndex = 0,
    items = $('.slides div'),
    itemsAmount = items.length;

var autoSlide = setInterval(function() {
    increaseCurrentIndex();
    cycleItems();
}, 5000);

function increaseCurrentIndex() {
    currentIndex += 1;
    if (currentIndex > itemsAmount - 1) {
        currentIndex = 0;
    }
}

function cycleItems() {
    var item = items.eq(currentIndex);
    items.hide();
    item.css('display', 'inline-block');
}

$('.slides').first().css('display', 'inline-block');

$('.next').on('click', function() {
    clearInterval(autoSlide);
    increaseCurrentIndex();
    cycleItems();
});

$('.prev').on('click', function() {
    clearInterval(autoSlide);
    currentIndex -= 1;
    if(currentIndex < 0) {
        currentIndex = itemsAmount - 1;
    }

    cycleItems();
});



