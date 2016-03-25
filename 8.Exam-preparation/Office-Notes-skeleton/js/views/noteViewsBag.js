/**
 * Created by PC on 19.03.2016 г..
 */
var app = app || {};

app.noteViewsBag = (function() {
    function showOfficeNotesPage(selector, data) {
        $.get('templates/officeNoteTemplate.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
        });
    }

    function showMyNotesPage(selector, data) {
        $.get('templates/myNoteTemplate.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('.delete').on('click', function() {
                var noteId = $(this).parent().attr('data-id'),
                    note = data.notes.filter(function(note) {
                        return note.id == noteId;
                    });

                if (note.length) {
                    Sammy(function() {
                        this.trigger('loadDeleteNotePage', note[0]);
                    });
                }
            });
        });
    }

    function showAddNotePage(selector) {
        $.get('templates/addNote.html', function(template) {
            $(selector).html(template);
            $('#addNoteButton').on('click', function() {
                var title = $('#title').val(),
                    text = $('#text').val(),
                    deadline = $('#deadline').val();
                    //author = sessionStorage['fullName'];

                Sammy(function() {
                    this.trigger('addNote', {title: title, text: text, deadline: deadline});
                });
            });
        });
    }

    function showDeleteNotePage(selector, data) {
        $.get('templates/deleteNote.html', function(template) {
            var rendered = Mustache.render(template, data);
            $(selector).html(rendered);
            $('#deleteNoteButton').on('click', function() {
                Sammy(function() {
                    Sammy.trigger('deleteNote', data);
                })
            })
        })
    }

    return {
        load: function() {
            {
                return {
                    showAddNotePage: showAddNotePage,
                    showOfficeNotesPage: showOfficeNotesPage,
                    showMyNotesPage: showMyNotesPage,
                    showDeleteNotePage: showDeleteNotePage
                }
            }
        }
    }
})();