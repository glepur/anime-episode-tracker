
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.get(tabId, function (tab) {

        	if (tab.url.indexOf('animefreak.tv') == -1) {
        		return;
        	}

    		chrome.storage.sync.get('anime', function (val) {
				var anime = val.anime;
				
				if (!anime || !anime.length) {
					anime = [];
				}

				chrome.tabs.executeScript(tabId, {file: "title_grabber.js"}, function (results) {
					if (results[0].length > 1) {

						var filtered = anime.filter(function (val) {
							if (val.name == results[0][0]) {
								if (+val.episode > +results[0][1]) {
									return true;
								}
								val.url = tab.url;
								val.episode = results[0][1];
								val.timestamp = Date.now();
								return true;
							} else {
								return false;
							}
						});

						if (filtered.length == 0) {
							anime.push({
								url: tab.url,
								name: results[0][0],
								episode: results[0][1],
								timestamp: Date.now()
							});
						}

						if (anime.length > 1) {
				            anime.sort(function (a, b) {
				                return b.timestamp-a.timestamp;
				            });
				        }

						chrome.storage.sync.set({'anime': anime});

						var popups = chrome.extension.getViews({type: "popup"});
						if (0 < popups.length) {
						  	popups[0].renderAnimeList();
						}

						console.log(anime);
					}
				});
				
    		});
	        
        });
    }
});