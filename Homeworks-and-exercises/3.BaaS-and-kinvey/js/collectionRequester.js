/**
 * Created by PC on 06.03.2016 г..
 */
var app = app || {};

app.collectionRequester = (function() {
    function CollectionRequester(collection) {
        this.serviceUrl = app.requester.baseUrl + 'appdata/' + app.requester.appId + '/' + collection;
    }

    function checkItemExists(itemName, collection) {
        var doesExist = false;
        collection.forEach(function(item) {
            if (itemName === item) {
                doesExist = true;
            }
        });

        return doesExist;
    }

    CollectionRequester.prototype.getAll = function() {
        return app.requester.makeRequest('GET', this.serviceUrl, null, true);
    };

    CollectionRequester.prototype.addItem = function(name, countries, towns, countryId) {
        var defer = Q.defer(),
            countryExists = false,
            townExists;
        if (countries) {
            countryExists = checkItemExists(name, countries);
        }

        if (towns) {
            townExists = checkItemExists(name, towns);
        }

        if (countryExists) {
            defer.reject(new Error('The country you entered already exists in list!'));
        }
        else if(townExists) {
            defer.reject(new Error('The town you entered already exists in list!'));
        }
        else {
            var data = {
                "name": name
            };
            if (countryId) {
                data['country'] = {
                    "_type": "KinveyRef",
                    "_id": countryId,
                    "_collection": "Country"
                }
            }

            defer.resolve(app.requester.makeRequest('POST', this.serviceUrl, data, true));
        }

        return defer.promise;
    };

    CollectionRequester.prototype.editItem = function(itemId, name, countryId) {
        var defer = Q.defer(),
            hasCountryName = name || false,
            url = this.serviceUrl + '/' + itemId;


        if (!hasCountryName) {
            defer.reject(new Error('Enter a country name to make a valid correction!'))
        }
        else {
            var data = {
                "name": name
            };

            if (countryId) {
                data['country'] = {
                    "_type": "KinveyRef",
                    "_id": countryId,
                    "_collection": "Country"
                }
            }

            defer.resolve(app.requester.makeRequest('PUT', url, data, true));
        }

        return defer.promise;
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