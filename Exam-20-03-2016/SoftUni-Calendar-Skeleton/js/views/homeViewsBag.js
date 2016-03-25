/**
 * Created by PC on 18.03.2016 г..
 */
var app = app || {};

app.homeViewsBag = (function () {
    function showWelcomePage(selector) {
        $('#menu').empty();
        $.get('templates/menu-login.html', function (template) {
            $('#menu').html(template);
        });
        $.get('templates/welcome-guest.html', function (template) {
            $(selector).html(template);
        });

    }

    function showHomePage(selector, data) {
        $('#menu').empty();
        $.get('templates/menu-home.html', function (template) {
            $('#menu').html(template);
        });
        $.get('templates/welcome-user.html', function (template) {
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