/**
 * Created by PC on 18.03.2016 г..
 */
var app = app || {};

app.homeViewsBag = (function () {
    function showWelcomePage(selector) {
        $.get('templates/welcome.html', function (template) {
            $(selector).html(template);
        });
    }

    function showHomePage(selector, data) {
        $.get('templates/home.html', function (template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
        });

    }

    return {
        load: function () {
            return {
                showWelcomePage: showWelcomePage,
                showHomePage: showHomePage
            }
        }
    }
})();