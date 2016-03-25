/**
 * Created by PC on 13.03.2016 г..
 */
var app = app || {};

(function() {
    app.router = Sammy(function() {
        var selector = $('#wrapper'),
            greeting = 'Hello, ';

        this.get('#/', function() {
            $(selector).html($('<h2>').text('Welcome to Home page'));
        });

        this.get('#/:name', function() {
            $(selector).html($('<h2>').text(greeting + this.params['name']));
            //this.trigger('click-a-tag');
        });

        /*this.bind('click-a-tag', function() {
            $('a').on('click', function(e) {
                $(selector).html($('<h2>')).text(greeting + $(e.target).text());
            })
        });*/

        /*this.get('#/Sam', function() {
            $(selector).html($('<h2>').text(greeting + 'Sam'));
        });

        this.get('#/Bob', function() {
            $(selector).html($('<h2>').text(greeting + 'Bob'));
        });

        this.get('#/Lora', function() {
            $(selector).html($('<h2>').text(greeting + 'Lora'));
        });*/
    });

    app.router.run('#/');
})();
