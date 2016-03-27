/**
 * Created by PC on 20.03.2016 г..
 */
var app = app || {};

app.lectureController = (function() {
    function LectureController(viewsBag, model) {
        this.viewsBag = viewsBag;
        this.model = model;
    }

    LectureController.prototype.loadAddLecturePage = function(selector) {
        this.viewsBag.showAddLecturePage(selector);
    };

    LectureController.prototype.addLecture = function(data) {
        this.model.addLecture(data)
            .then(function() {
                //todo notification success message
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                },
                function(error) {
                    window.location.reload();
                    //todo error notification message
                });
            })
            .done();
    };

    LectureController.prototype.loadAllLectures = function(selector) {
        var _this = this;
        this.model.getAllLectures()
            .then(function(success) {
                var data = [];
                //{_id:"nj1g23lkj23475576njkl", "title":"Test2", "start":"2016-01-17T16:00:00","end":"2016-01-18T10:00:00", "lecturer":"Gosho"}
                success.forEach(function(lecture) {
                   data.push({
                       _id: lecture._id,
                       title: lecture.title,
                       start: lecture.start,
                       end: lecture.end,
                       lecturer: lecture.lecturer
                   });
                });

                _this.viewsBag.showAllLecturesPage(selector, data);
            },
            function(error) {
                //todo error notification message
            })
            .done();
    };

    LectureController.prototype.loadMyLectures = function(selector) {
        var _this = this,
            userId = sessionStorage['userId'];
        this.model.getLecturesByUserId(userId)
            .then(function(success) {
                    var data = [];
                    success.forEach(function(lecture) {
                        data.push({
                            _id: lecture._id,
                            title: lecture.title,
                            start: lecture.start,
                            end: lecture.end,
                            lecturer: lecture.lecturer
                        });
                    });

                    _this.viewsBag.showMyLecturesPage(selector, data);
                },
                function(error) {
                    //todo error notification message
                })
            .done();
    };

    LectureController.prototype.loadEditLecturePage = function(selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId)
            .then(function(success) {
                var data = {
                    _id: success._id,
                    title: success.title,
                    start: success.start,
                    end: success.end
                };

                _this.viewsBag.showEditLecturePage(selector, data);
            },
            function(error) {
                //todo error notification message
            })
            .done();
    };

    LectureController.prototype.editLecture = function(data) {
        this.model.editLecture(data)
            .then(function() {
                //todo notification success message
                Sammy(function() {
                        this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    },
                    function(error) {
                        //todo error notification message
                    });
            })
            .done();
    };

    LectureController.prototype.loadDeleteLecturePage = function(selector, lectureId) {
        var _this = this;
        this.model.getLectureById(lectureId)
            .then(function(success) {
                var data = {
                    _id: success._id,
                    title: success.title,
                    start: success.start,
                    end: success.end
                };

                _this.viewsBag.showDeleteLecturePage(selector, data);
            },
            function(error) {
                //todo error notification message
            })
            .done();
    };

    LectureController.prototype.deleteLecture = function(lectureId) {
        console.log(lectureId);
        this.model.deleteLecture(lectureId)
            .then(function() {
                //todo notification success message
                Sammy(function() {
                        this.trigger('redirectUrl', {url: '#/calendar/my/'});
                    },
                    function(error) {
                        //todo error notification message
                    });
            })
            .done();
    };

    return {
        load: function(viewsBag, model) {
            return new LectureController(viewsBag, model);
        }
    }
})();