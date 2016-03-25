/**
 * Created by PC on 13.03.2016 г..
 */
"use strict";
var data = {"people": [
    {
    "name": 'Garry Finch',
    "jobTitle": 'Front-end technical leader',
    "website": 'http://website.com'
    },
    {
        "name": 'Bob McFray',
        "jobTitle": 'Photographer',
        "website": 'http://goo.gle'
    },
    {
        "name": 'Jenny O\'Sullivan',
        "jobTitle": 'LEGO Geek',
        "website": 'http://stackoverflow.com'
    }]};

$.get('table-template.html', function(template) {
    var outputHtml = Mustache.render(template, data);
    $('#wrapper').html(outputHtml);
    /*$('table, th, td')
        .css('border', '2px solid #A3A3A3')
        .css('border-collapse', 'collapse')
        .css('padding', '5px');
    $('th').css('background-color', '#CCCCCC');*/
});