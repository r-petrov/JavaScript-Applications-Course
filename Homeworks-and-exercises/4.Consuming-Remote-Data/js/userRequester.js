/**
 * Created by PC on 06.03.2016 г..
 */
var app = app || {};

app.userRequester = (function() {
    function UserRequester() {
        this.serviceUrl = app.requester.baseUrl + 'user/' + app.requester.appId;
    }

    UserRequester.prototype.signUp = function(username, password, email) {
        var requestUrl = this.serviceUrl,
            data = {
                'username': username,
                'password': password,
                'email': email
            };

        app.requester.makeRequest('POST', requestUrl, data).then(
            function(success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
            },
            function(error) {
                console.error(error);
            }
        ).done();
    };

    UserRequester.prototype.login = function(username, password) {
        var defer = Q.defer();
        var requestUrl = this.serviceUrl + '/login',
            data = {
                'username': username,
                'password': password
            };

        app.requester.makeRequest('POST', requestUrl, data).then(function(success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['userId'] = success._id;
                defer.resolve();
            },
            function(error) {
                console.log(error);
                defer.reject();
            }
        ).done();

        return defer.promise;
    };

    UserRequester.prototype.getInfo = function() {
        var requestUrl = this.serviceUrl + '/_me';

        app.requester.makeRequest('GET', requestUrl, null, true).then(function(success) {
                console.log(success);
            },
            function(error) {
                console.log(error);
            }
        ).done();
    };

    return UserRequester;
})();