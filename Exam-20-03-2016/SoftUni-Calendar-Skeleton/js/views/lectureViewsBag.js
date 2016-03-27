/**
 * Created by PC on 20.03.2016 г..
 */
var app = app || {};

app.lectureViewsBag = (function () {
    function showAddLecturePage(selector) {
        $.get('templates/menu-home.html', function (template) {
            $('#menu').html(template);
        });
        $.get('templates/add-lecture.html', function (template) {
            $(selector).html(template);

            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                Sammy(function () {
                    this.trigger('addLecture', {
                        title: title,
                        start: start,
                        end: end,
                        lecturer: lecturer
                    });
                });
            });
        });
    }

    function showAllLecturesPage(selector, data) {
        $.get('templates/menu-home.html', function (template) {
            $('#menu').html(template);
        });
        $.get('templates/calendar.html', function (template) {
            $(selector).empty();
            $(selector).html(template);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: new Date(),
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').hide();
                        $('#deleteLecture').hide();
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showMyLecturesPage(selector, data) {
        $.get('templates/menu-home.html', function (template) {
            $('#menu').html(template);
        });
        $.get('templates/calendar.html', function (template) {
            $(selector).empty();
            $(selector).html(template);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: new Date(),
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/add/'});
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent),
                            lectureId;
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function () {
                            lectureId = $('#event-meta').parent().attr('id');
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/edit/' + lectureId});
                            })
                        });
                        $('#deleteLecture').on('click', function () {
                            lectureId = $('#event-meta').parent().attr('id');
                            Sammy(function () {
                                this.trigger('redirectUrl', {url: '#/calendar/delete/' + lectureId});
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        });
    }

    function showEditLecturePage(selector, data) {
        $.get('templates/edit-lecture.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function(event) {
                var id = $(event.target).attr('data-id'),
                    title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val();

                Sammy(function() {
                    this.trigger('editLecture', {
                        _id: id,
                        title: title,
                        start: start,
                        end: end
                    })
                });
            });
        })
    }

    function showDeleteLecturePage(selector, data) {
        $.get('templates/delete-lecture.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function() {
                var id = $(event.target).attr('data-id');

                Sammy(function() {
                    this.trigger('deleteLecture', {
                        _id: id
                    })
                });
            })
        });
    }

    return {
        load: function () {
            return {
                showAddLecturePage: showAddLecturePage,
                showAllLecturesPage: showAllLecturesPage,
                showMyLecturesPage: showMyLecturesPage,
                showEditLecturePage: showEditLecturePage,
                showDeleteLecturePage: showDeleteLecturePage
            }
        }
    }
})();