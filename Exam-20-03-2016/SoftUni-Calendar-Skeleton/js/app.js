/**
 * Created by PC on 20.03.2016 г..
 */
"use strict";
var app = app || {};

(function() {
    var router = Sammy(function() {
        var selector = '#container';

        var requester = app.requester.load('kid_-J-2Gkra1W', '31d7976d84ae42d4ae90db6a5e2ae67e', 'https://baas.kinvey.com/');

        var userModel = app.userModel.load(requester);
        var lectureModel = app.lectureModel.load(requester);

        var homeViewsBag = app.homeViewsBag.load();
        var userViewsBag = app.userViewsBag.load();
        var lectureViewsBag = app.lectureViewsBag.load();

        var homeController = app.homeController.load(homeViewsBag);
        var userController = app.userController.load(userViewsBag, userModel);
        var lectureController = app.lectureController.load(lectureViewsBag, lectureModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if (!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
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

        this.get('#/calendar/add/', function() {
            lectureController.loadAddLecturePage(selector);
        });

        this.get('#/calendar/list/', function() {
            lectureController.loadAllLectures(selector);
        });

        this.get('#/calendar/my/', function() {
            lectureController.loadMyLectures(selector);
        });

        this.get('#/calendar/edit/:lectureId', function() {
            var lectureId = this.params['lectureId'];
            lectureController.loadEditLecturePage(selector, lectureId);
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

        this.bind('addLecture', function(event, data) {
            lectureController.addLecture(data);
        });

        this.bind('editLecture', function(event, data) {
            lectureController.editLecture(data);
        });
    });

    router.run('#/');
})();