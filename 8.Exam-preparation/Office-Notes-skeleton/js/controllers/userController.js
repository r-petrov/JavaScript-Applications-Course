/**
 * Created by PC on 19.03.2016 г..
 */
var app = app || {};

app.userController = (function() {
    function UserController(viewsBag, model) {
        this.viewsBag = viewsBag;
        this.model = model;
    }

    UserController.prototype.loadLoginPage = function(selector) {
        this.viewsBag.showLoginPage(selector);
    };

    UserController.prototype.login = function(data) {
        this.model.login(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['fullName'] = success.fullName;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            })
            .done();
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewsBag.showRegisterPage(selector);
    };

    UserController.prototype.register = function(data) {
        this.model.register(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['fullName'] = success.fullName;
                sessionStorage['userId'] = success._id;

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/home/'});
                });
            })
            .done();
    };

    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            },
            function(error) {
                console.error(error);
            })
            .done();
    };

    return {
        load: function(model, viewsBag) {
              return new UserController(model, viewsBag);
        }
    }
})();