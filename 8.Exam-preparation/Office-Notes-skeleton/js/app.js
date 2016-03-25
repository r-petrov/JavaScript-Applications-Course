/**
 * Created by PC on 18.03.2016 г..
 */
var app = app || {};

(function() {
    var router = Sammy(function() {
        var selector = '#container';

        var requester = app.requester.load('kid_WyIFK3v2JW', 'f2a5c40eb95f4563bfac744854d748a2', 'https://baas.kinvey.com/');

        var homeViewsBag = app.homeViewsBag.load();
        var userViewsBag = app.userViewsBag.load();
        var noteViewsBag = app.noteViewsBag.load();

        var userModel = app.userModel.load(requester);
        var noteModel = app.noteModel.load(requester);

        var userController = app.userController.load(userViewsBag, userModel);
        var homeController = app.homeController.load(homeViewsBag);
        var noteController = app.noteController.load(noteViewsBag, noteModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if (!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if (!sessionStorage['sessionId']) {
                $('#menu').hide();
            }
            else {
                $('#welcomeMenu').text('Welcome, ' + sessionStorage['fullName']);
                $('#menu').show();
            }
        });

        this.get('#/', function() {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/login/', function() {
           userController.loadLoginPage(selector);
        });

        this.get('#/home/', function() {
            homeController.loadHomePage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/addNote/', function() {
            noteController.loadAddNotePage(selector);
        });

        this.get('#/officeNotes/', function() {
            noteController.loadOfficeNotes(selector);
        });

        this.get('#/myNotes/', function() {
            noteController.loadMyNotes(selector);
        });

        this.bind('redirectUrl', function(event, data) {
            this.redirect(data.url);
        });

        this.bind('register', function(event, data) {
            userController.register(data);
        });

        this.bind('login', function(event, data) {
            userController.login(data);
        });

        this.bind('addNote', function(event, data) {
            noteController.addNote(data);
        });

        this.bind('loadDeleteNotePage', function(event, data) {
            noteController.loadDeleteNotePage(selector, data);
        });

        this.bind('deleteNote', function(event, data) {
            noteController.deleteNote(data);
        });
    });

    router.run('#/');
})();