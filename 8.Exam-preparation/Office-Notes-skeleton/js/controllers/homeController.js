/**
 * Created by PC on 18.03.2016 г..
 */
var app = app || {};

app.homeController = (function() {
    function HomeController(viewsBag) {
        this.viewsBag = viewsBag;
    }

    HomeController.prototype.loadWelcomePage = function(selector) {
        this.viewsBag.showWelcomePage(selector);
    };


    HomeController.prototype.loadHomePage = function(selector) {
        var data = {
            fullName: sessionStorage['fullName'],
            username: sessionStorage['username']
        };

        this.viewsBag.showHomePage(selector, data);
    };

    return {
        load: function(viewsBag) {
            return new HomeController(viewsBag);
        }
    };
})();