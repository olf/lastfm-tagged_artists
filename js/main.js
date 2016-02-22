/* global lfmInstance, lfmUser */
/* eslint-env jquery */

document.addEventListener("DOMContentLoaded", function() {
    var lastfm = lfmInstance();

    lastfm.user.getPersonalTags(
        {
            user: lfmUser(),
            tag: 'seen live',
            taggingtype: 'artist',
            limit: 500
        },
        {success: function(data) {
            var list = data.taggings.artists.artist
                .map(function (v) {return v.name;})
                .sort(function (a, b) {
                    return a.toLowerCase().localeCompare(b.toLowerCase());
                })
                .reduce(function (p, v) {
                    return p + '<li>' + v + '</li>';
                }, '');

            document.getElementById('main').innerHTML = '<ol>' + list + '</ol>';
        }},
        {error: function(code, message) {
            document.getElementById('main').innerHTML = 'Error: ' + message + ' (' + code +')';
        }}
    );
});
