/* global lfmInstance, lfmUser */
/* eslint-env jquery */

function renderList(theTag) {
    var lastfm = lfmInstance();

    lastfm.user.getPersonalTags(
        {
            user: lfmUser(),
            tag: theTag,
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

            document.getElementById('list').innerHTML = '<ol>' + list + '</ol>';
        }},
        {error: function(code, message) {
            document.getElementById('list').innerHTML = 'Error: ' + message + ' (' + code +')';
        }}
    );
}

// document.addEventListener('DOMContentLoaded', function() {
//     renderList('seen live');
// });
