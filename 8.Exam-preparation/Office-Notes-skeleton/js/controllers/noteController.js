/**
 * Created by PC on 19.03.2016 г..
 */
var app = app || {};

app.noteController = (function() {
    function NoteController(viewsBag, model) {
        this.model = model;
        this.viewsBag = viewsBag;
    }

    NoteController.prototype.loadOfficeNotes = function(selector) {
        var _this = this,
            date = new Date().toISOString().substr(0, 10);
        this.model.getOfficeNotesForToday(date)
            .then(function(success) {
                var data = {
                    notes: []
                };

                success.forEach(function(note) {
                    data.notes.push({
                        id: note._id,
                        title: note.title,
                        text: note.text,
                        author: note.author,
                        deadline: note.deadline
                    });
                });

                _this.viewsBag.showOfficeNotesPage(selector, data);

            })
            .done();
    };

    NoteController.prototype.loadMyNotes = function(selector) {
        var _this = this,
            userId = sessionStorage['userId'];

        this.model.getMyNotes(userId)
            .then(function(success) {
                var data = {
                    notes: []
                };

                success.forEach(function(note) {
                    data.notes.push({
                        id: note._id,
                        title: note.title,
                        text: note.text,
                        author: note.author,
                        deadline: note.deadline
                    });
                });

                _this.viewsBag.showMyNotesPage(selector, data);
            })
            .done();
    };

    NoteController.prototype.loadAddNotePage = function(selector) {
        this.viewsBag.showAddNotePage(selector);
    };

    NoteController.prototype.addNote = function(data) {
        data['author'] = sessionStorage['fullName'];
        this.model.addNote(data)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/officeNotes/'})
                });
            })
            .done();
    };

    NoteController.prototype.loadDeleteNotePage = function(selector, data) {
        this.viewsBag.showDeleteNotePage(selector, data);
    };

    NoteController.prototype.deleteNote = function(data) {
        var noteId = data.notes.id;
        this.model.deleteNote(noteId)
            .then(function (success) {
            window.location.reload();
        });
    };

    return {
        load: function(model, viewsBag) {
            return new NoteController(model, viewsBag);
        }
    };
})();