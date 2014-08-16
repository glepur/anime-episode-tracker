var anime = [];

function renderAnimeList () {
    chrome.storage.sync.get('anime', function (val) {
        var content = '';

        var anime = val.anime;

        for (var i = 0; i < val.anime.length; i++) {
            var date = new Date(val.anime[i].timestamp);

            content +='<li>' +
                        '<a href="#" class="remove">Remove</a>' +
                        '<a target="_blank" href="' + val.anime[i].url + '">' +
                            '<p class="title">' + val.anime[i].name + '</p>' +
                            '<p>' +
                                '<span>Episode ' + val.anime[i].episode + '</span>' + 
                                '<span style="float:right; font-size: 12px;" >' + moment(date).fromNow() + '</span>' +
                            '</p>' +
                        '</a>' +
                      '</li>';
        }

        document.getElementById('listing').innerHTML = content;


        var closeButtons = document.getElementsByClassName('remove'); console.log(closeButtons);

        for (var i = 0; i < closeButtons.length; i++) {
            (function (index) {
                closeButtons[index].onclick = function () {
                    if (confirm('Are you sure you want to remove "' + anime[index].name + '" from your list?')) {
                        anime.splice(index, 1);
                        chrome.storage.sync.set({'anime': anime});
                        renderAnimeList();
                    }
                }
            })(i);
        }

    });
}

renderAnimeList();