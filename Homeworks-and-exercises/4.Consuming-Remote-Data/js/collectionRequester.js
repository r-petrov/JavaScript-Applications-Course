/**
 * Created by PC on 06.03.2016 г..
 */
var app = app || {};

app.collectionRequester = (function() {
    function CollectionRequester(collection) {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/' + collection;
    }

    CollectionRequester.prototype.getAll = function() {
        return app.requester.makeRequest('GET', this.serviceUrl, null, true);
    };

    CollectionRequester.prototype.addItem = function(title, author, isbn, bookId) {
        var data = {
            "title": title,
            'author': author,
            'isbn': isbn
        };

        /*if (bookId) {
            data['country'] = {
                "_type": "KinveyRef",
                "_id": bookId,
                "_collection": "Book"
            }
        }*/

        return app.requester.makeRequest('POST', this.serviceUrl, data, true);
    };

    CollectionRequester.prototype.editItem = function(itemId, title, author, isbn, countryId) {
        var url = this.serviceUrl + '/' + itemId;

        var data = {
            "title": title,
            'author': author,
            'isbn': isbn
        };

        /*if (countryId) {
            data['country'] = {
                "_type": "KinveyRef",
                "_id": countryId,
                "_collection": "Country"
            }
        }*/

        return app.requester.makeRequest('PUT', url, data, true);
    };

    CollectionRequester.prototype.deleteItem = function(itemId, query) {
        var url = this.serviceUrl + '/' + itemId;
        if (query) {
            url = url + '?' + query;
        }

        return app.requester.makeRequest('DELETE', url, null, true);
    };

    return CollectionRequester;
})();