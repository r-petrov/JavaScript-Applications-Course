/**
 * Created by PC on 18.03.2016 г..
 */
var app = app || {};

app.userViewsBag = (function() {
    function showLoginPage(selector) {
        $.get('templates/login.html', function(template) {
            $(selector).html(template);
            $('#login-button').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });
            });
        })
    }

    function showRegisterPage(selector) {
        $.get('templates/register.html', function(template) {
            $(selector).html(template);
            $('#register-button').on('click', function() {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPassword = $('#confirm-password').val();

                if (password === confirmPassword) {
                    Sammy(function() {
                        //todo notification success message
                        this.trigger('register', {username: username, password: password})
                    });
                }
                else {
                    //todo error notification
                    window.location.reload();
                }
            });


        });
    }

    return {
        load: function() {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    };
})();