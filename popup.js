function renderAnimeList () {
    chrome.storage.sync.get('anime', function (val) {
        var content = '';

        for (var i = 0; i < val.anime.length; i++) {
            var date = new Date(val.anime[i].timestamp);

            content +='<li>' +
                        '<a target="_blank" href="' + val.anime[i].url + '">' +
                            '<p style="font-weight: bold;" >' + val.anime[i].name + '</p>' +
                            '<p>' +
                                '<span>Episode ' + val.anime[i].episode + '</span>' + 
                                '<span style="float:right; font-size: 12px;" >' + moment(date).fromNow() + '</span>' +
                            '</p>' +
                        '</a>' +
                      '</li>';
        }

        document.getElementById('listing').innerHTML = content;
    });
}

renderAnimeList();
