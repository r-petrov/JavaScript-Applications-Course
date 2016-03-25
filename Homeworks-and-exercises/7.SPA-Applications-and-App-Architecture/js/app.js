/**
 * Created by PC on 15.03.2016 г..
 */
var app = app || {};

(function() {
    var router = Sammy(function() {
        var selector = $('#wrapper');
        var requester = app.requester.config('kid_byOWfrwQJb', 'f8b396ce68484c35a2de6000b7a10584');

        var userModel = app.userModel.load(requester);
        var bookModel = app.bookModel.load(requester);

        var userViewsBag = app.userViews.load();
        var bookViewsBag = app.bookViews.load();

        var userController = app.userController.load(userModel, userViewsBag);
        var bookController = app.bookController.load(bookModel, bookViewsBag);

        this.before(function() {
            if (!sessionStorage['sessionAuth']) {
                this.redirect('#/login');
            }
        });

        this.get('#/', function() {
            this.redirect('#/login');
        });

        this.get('#/register', function() {
            userController.showRegisterPage(selector);
        });

        this.get('#/login', function() {
            userController.showLoginPage(selector);
        });

        this.get('#/logout', function() {
            userController.logout();
        });

        this.get('#/books', function() {
            bookController.loadAllBooks(selector);
        });

        this.get('#/addNewBook', function() {
            bookController.loadAddBookPage(selector);
        });

        this.get('#/editBook', function() {
            bookController.loadEditBookPage(selector);
        });

        this.bind('redirectUrl', function(event, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(event, data) {
            userController.login(data);
        });

        this.bind('register', function(event, data) {
            userController.register(data);
        });

        this.bind('add-new-book', function(event, data) {
            bookController.addNewBook(data);
        });

        this.bind('edit-book', function(event, data) {
            bookController.editBook(data);
        });

        this.bind('delete-book', function(event, data) {
            console.log(data.id);
            bookController.deleteBook(data.id);
        });
    });

    router.run('#/');
})();