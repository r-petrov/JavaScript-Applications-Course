/**
 * Created by PC on 06.03.2016 г..
 */
"use strict";
var app = app || {};

app.requester.config('kid_byOWfrwQJb', 'f8b396ce68484c35a2de6000b7a10584');

var userRequester = new app.userRequester(),
    bookRequester = new app.collectionRequester('Book');

userRequester.login('Hachiman', '1234')
    .then(function(success){
        bookRequester.getAll().then(
            function(success){
                var ul = $('#books'),
                    counter = 0,
                    bookInfo = '',
                    keys,
                    value;
                success.forEach(function(book) {
                    var li = $('<li>'),
                        form = $('<form>').attr('id', 'edit-' + book._id),
                        deleteButton = $('<button>' + 'Delete' + '</button>').attr('id', 'delete' + book._id);
                    counter++;
                    keys = Object.keys(book);
                    keys.forEach(function(key) {
                        if (key === 'title' || key === 'author' || key === 'isbn') {
                            value = book[key];
                            bookInfo += key + ': ' + value + '; ';
                        }
                    });

                    if (counter % 2 === 0) {
                        li.css('background-color', 'darkolivegreen').css('color', 'white').css('border-color', 'grey');
                        deleteButton.css('background-color', 'darkolivegreen').css('color', 'white');
                    }
                    else {
                        li.css('background-color', 'lightgrey');
                    }

                    li.attr('id', book._id).text(bookInfo).appendTo(ul);
                    form.appendTo(li);
                    deleteButton.appendTo(ul);
                    bookInfo = '';

                    li.on('click', function() {
                        var id = li.attr('id'),
                            inputTitle = $('<input>')
                                .attr('id', 'title')
                                .attr('type', 'text')
                                .attr('value', book.title)
                                .appendTo(form),
                            inputAuthor = $('<input>')
                                .attr('id', 'author')
                                .attr('type', 'text')
                                .attr('value', book.author)
                                .appendTo(form),
                            inputIsbn = $('<input>')
                                .attr('id', 'isbn')
                                .attr('type', 'text')
                                .attr('value', book.isbn)
                                .appendTo(form),
                            editButton = $('<button>' + 'Edit' + '</button>')
                                .attr('id', 'edit-book-btn')
                                .attr('type', 'submit')
                                .appendTo(form);

                        editButton.on('click', function() {
                            bookRequester.editItem(id, inputTitle.val(), inputAuthor.val(), inputIsbn.val());
                        });
                    });

                    deleteButton.on('click', function() {
                        bookRequester.deleteItem(book._id);
                        location.reload();
                    })
                });
            },
            function(error){
                $('#books').val(error);
            });

        $('#create-book').on('click', function() {
            var title = $('#input-title').val(),
                author = $('#input-author').val(),
                isbn = $('#input-isbn').val();

            if (title && author && isbn) {
                bookRequester.addItem(title, author, isbn);
            }
            else {
                alert('Please, enter a title, author and isbn to create a book');
            }
        });
    },
    function(error){
        console.error(error)
    });
