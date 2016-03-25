/**
 * Created by PC on 15.03.2016 г..
 */
var app = app || {};

app.bookController = (function() {
    function BookController(model, viewsBag) {
        this._model = model;
        this._viewsBag = viewsBag;
    }

    BookController.prototype.loadAllBooks = function(selector) {
        var _this = this;

        return this._model.getAllBooks()
            .then(function(books) {
                var result = {
                    books: []
                };

                books.forEach(function(book) {
                    result.books.push(
                        {
                            title: book.title,
                            author: book.author,
                            isbn: book.isbn,
                            bookId: book._id
                        }
                    );
                });

                _this._viewsBag.showAllBooks(selector, result);
            });
    };

    BookController.prototype.loadAddBookPage = function(selector) {
        this._viewsBag.showAddNewBook(selector);
    };

    BookController.prototype.addNewBook = function(data) {
        this._model.addNewBook(data)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books'});
                });
            })
            .done();
    };

    BookController.prototype.loadEditBookPage = function(selector) {
        this._viewsBag.showEditBook(selector);
    };

    BookController.prototype.editBook = function(data) {
        this._model.editBook(data)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books'});
                });
            },
            function(error) {
                console.log(error);
            })
            .done();
    };

    BookController.prototype.deleteBook = function(bookId) {
        this._model.deleteBook(bookId)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books'});
                })
            });
    };

    return {
        load: function(model, viewsBag) {
            return new BookController(model, viewsBag);
        }
    }
})();