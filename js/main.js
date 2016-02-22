/* global lfmInstance, lfmDefaultUser, lfmDefaultTag */
/* exported renderList, renderUserTags */
/* eslint-env jquery */

function showTaggedArtists() {
    var lastfm = lfmInstance();
    var theUser = document.getElementById('user').value;
    var theTag = document.getElementById('tag').value;

    lastfm.user.getPersonalTags(
        {
            user: theUser,
            tag: theTag,
            taggingtype: 'artist',
            limit: 1000
        },
        {
            success: function(data) {
                var list = data.taggings.artists.artist
                    .map(function (v) {return v.name;})
                    .sort(function (a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    })
                    .reduce(function (p, v) {
                        return p + '<li>' + v + '</li>';
                    }, '');

                document.getElementById('list').innerHTML = '<ol>' + list + '</ol>';
            }
        },
        {
            error: function(code, message) {
                document.getElementById('list').innerHTML = 'Error: ' + message + ' (' + code +')';
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('user').value = lfmDefaultUser;
    document.getElementById('tag').value  = lfmDefaultTag;
    showTaggedArtists();
});
