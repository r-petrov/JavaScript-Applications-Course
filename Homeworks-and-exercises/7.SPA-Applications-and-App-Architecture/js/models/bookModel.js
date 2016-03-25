/**
 * Created by PC on 15.03.2016 г..
 */
var app = app || {};

app.bookModel = (function () {
    function BookModel(requester) {
        this._requester = requester;
        this._serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/Book';
    }

    BookModel.prototype.getAllBooks = function () {
        return this._requester.get(this._serviceUrl, true);
    };

    BookModel.prototype.addNewBook = function (data) {
        return this._requester.post(this._serviceUrl, data, true);
    };

    BookModel.prototype.editBook = function(data) {
        var editBookUrl = this._serviceUrl + '/' + data._id;
        return this._requester.put(editBookUrl, data, true);
    };

    BookModel.prototype.deleteBook = function(bookId) {
        var deleteBookUrl = this._serviceUrl + '/' + bookId;
        return this._requester.del(deleteBookUrl, true);
    };

    return {
        load: function (requester) {
            return new BookModel(requester);
        }
    }
})();