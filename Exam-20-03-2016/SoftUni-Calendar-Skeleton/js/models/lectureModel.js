/**
 * Created by PC on 20.03.2016 г..
 */
var app = app || {};

app.lectureModel = (function() {
    function LectureModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + this.requester.appId + '/lectures/'
    }

    LectureModel.prototype.addLecture = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    LectureModel.prototype.getAllLectures = function() {
        return this.requester.get(this.serviceUrl, true);
    };

    LectureModel.prototype.getLecturesByUserId = function(userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    LectureModel.prototype.getLectureById = function(lectureId) {
        var requestUrl = this.serviceUrl + lectureId;
        return this.requester.get(requestUrl, true);
    };

    LectureModel.prototype.editLecture = function(data) {
        var requestUrl = this.serviceUrl + data._id;
        return this.requester.post(requestUrl, data, true);
    };

    return {
        load: function(requester) {
            return new LectureModel(requester);
        }
    };
})();