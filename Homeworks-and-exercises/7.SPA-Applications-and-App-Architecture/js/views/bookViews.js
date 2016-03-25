/**
 * Created by PC on 15.03.2016 г..
 */
var app = app || {};

app.bookViews = (function() {
    var editBookTemplate = {};

    function showAllBooks(selector, data) {
        $.get('templates/books.html', function(templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('.edit-book').on('click', function() {
                var bookId = $(this).parent().attr('id'),
                    titleId = bookId + 'title',
                    authorId = bookId + 'author',
                    isbnId = bookId + 'isbn',
                    bookData = {
                        title: $('#' + titleId).text(),
                        author: $('#' + authorId).text(),
                        isbn: $('#' + isbnId).text(),
                        _id: bookId
                    },
                    bookDataKeys = Object.keys(bookData),
                    index,
                    key,
                    value;


                for (index in bookDataKeys) {
                    key = bookDataKeys[index];
                    value = bookData[key];
                    sessionStorage[key] = value;
                }

                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/editBook'});
                });
            });

            $('.delete-book-btn').on('click', function() {
                var bookId = $(this).parent().parent().parent().attr('id');
                Sammy(function() {
                    this.trigger('delete-book', {id: bookId});
                });
            });

            $('#add-new-book-btn').on('click', function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/addNewBook'});
                });
            });
        });
    }

    function showAddNewBook(selector) {
        $.get('templates/add-new-book.html', function(templ) {
            $(selector).html(templ);
            $('#add-new-book').on('click', function() {
                var bookData = {
                    title: $('#title').val(),
                    author: $('#author').val(),
                    isbn: $('#isbn').val()
                };

                Sammy(function() {
                    this.trigger('add-new-book', bookData);
                });
            });
        });

    }

    function showEditBook(selector) {
        var bookData = {
            title: sessionStorage['title'],
            author: sessionStorage['author'],
            isbn: sessionStorage['isbn'],
            _id: sessionStorage['_id']
        };

        $.get('templates/edit-book.html', function(template) {
            var renderedTemplate = Mustache.render(template, bookData);
            selector.html(renderedTemplate);

            $('#edit-btn').on('click', function() {
                var title = $('#title').val(),
                    author = $('#author').val(),
                    isbn = $('#isbn').val(),
                    id = $(this).parent().attr('id');

                Sammy(function () {
                    this.trigger('edit-book', {
                        _id: id,
                        title: title,
                        author: author,
                        isbn: isbn
                    });
                });
            });
        });
    }

    return {
        load: function() {
            return {
                showAllBooks: showAllBooks,
                showAddNewBook: showAddNewBook,
                showEditBook: showEditBook
            }
        }
    }
})();