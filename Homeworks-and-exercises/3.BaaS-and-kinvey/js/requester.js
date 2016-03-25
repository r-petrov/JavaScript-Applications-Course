/**
 * Created by PC on 06.03.2016 г..
 */
var app = app || {};

app.requester = (function() {
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.makeRequest = function(method, url, data, useSession) {
        var defer = Q.defer(),
            _this = this,
            options = {
                'method': method,
                'url': url,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'data': JSON.stringify(data),
                'success': function(data) {
                    defer.resolve(data);
                },
                'error': function(error) {
                    defer.reject(error);
                }
            };

        if (method == 'DELETE') {
            delete options['headers'];
        }

        options.beforeSend = function(xhr) {
            var token;
            if (!useSession) {
                token = _this.appId + ':' + _this.appSecret;
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
            }
            else {
                token = sessionStorage['sessionAuth'];
                xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
            }
        };

        $.ajax(options);

        return defer.promise;
    };

    return {
        config: function(appId, appSecret) {
            app.requester = new Requester(appId, appSecret);
        }
    };
})();