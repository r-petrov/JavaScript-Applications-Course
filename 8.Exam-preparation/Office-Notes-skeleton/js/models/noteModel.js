/**
 * Created by PC on 19.03.2016 г..
 */
var app = app || {};
app.noteModel = (function() {
    function NoteModel(requester) {
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + this.requester.appId + '/Note/'
    }

    NoteModel.prototype.getOfficeNotesForToday = function(deadline) {
        var requestUrl = this.serviceUrl + '?query={"deadline":"' + deadline + '"}&resolve=_acl.creator';
        return this.requester.get(requestUrl, true);
    };

    NoteModel.prototype.getMyNotes = function(userId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return this.requester.get(requestUrl, true);
    };

    NoteModel.prototype.addNote = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    NoteModel.prototype.deleteNote = function(noteId) {
        return this.requester.delete(noteId);
    };

    return {
        load: function(requester) {
            return new NoteModel(requester)
        }
    };
})();