// this holds the last url that had "https://www.netflix.com/watch/" in its name.
// this way it doesn't keep updating the page with the same show/movie repeatedly
let lastNetflixUrl = "";
let finalData = {
    'Title': '',
    'Actors': [],
    'Director': '',
    'Poster': ''
};
/*
function newPopup(url) {
	popupWindow = window.open(url,'popUpWindow','height=300,width=400,left=10,top=10,resizable=false,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}*/

/* Respond to the user's clicking one of the buttons */
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
        if (btnIdx === 0) {
            console.log("YES");
            addShow(finalData);
        } else if (btnIdx === 1) {
            console.log("NO");
        }
});


function scanTabs() {
    chrome.windows.getAll({populate: true}, function(windows) {
        chrome.tabs.getSelected(null,function(tab) {
            let tablink2 = tab.url;
            if (tablink2.includes("https://www.netflix.com/watch/") && lastNetflixUrl != tablink2) {
                lastNetflixUrl = tablink2;
                const regex = /https:\/\/www.netflix.com\/watch\/[0-9]*/;
                let found = lastNetflixUrl.match(regex)[0];
                let showId = found.substring(30, found.length);
                
                // print debugging stuff
                console.log("Watching Netflix");
                console.log(showId);

                
                const myInit = {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    credentials: 'omit'
                };

                fetch(lastNetflixUrl, myInit)
                .then(response => response.text())
                .then(data => {
                    
                        const regexForTitle = /"name":".*?","description":"/;
                        const regexForImage = /","image":".*?","dateCreated":"/;
                        const regexForActors = /,"actors":\[{"@type":".*?}\],"creator":/;
                        const regexForCreator = /,"creator":\[{"@type":"Person","name":".*?"}],"director":/;
                        const regexForDirector = /,"director":\[{"@type":"Person","name":".*?"}],"awards":/;

                        let title = "";
                        try {
                            title = data.match(regexForTitle)[0];
                            title = title.replace("\"name\":\"", "").replace("\",\"description\":\"", "");
                        } catch (error) {}

                        
                        let image = "";
                        try {
                            image = data.match(regexForImage)[0];
                            image = image.replace("\",\"image\":\"", "").replace("\",\"dateCreated\":\"", "");
                        } catch (error) {}

                        let actors = "";
                        let actorList = [];
                        try {
                            actors = data.match(regexForActors)[0];
                            actors = actors.replace(",\"actors\":[", "").replace("\"}],\"creator\":", "")
                                .replaceAll("{\"@type\":\"Person\",\"name\":\"", "").replaceAll("\"}", "").replaceAll("{", "");
                            actorList = actors.split(",");
                        } catch (error) {}

                        let creator = "";
                        try {
                            creator = data.match(regexForCreator)[0];
                            creator = creator.replace(",\"creator\":\[{\"@type\":\"Person\",\"name\":\"", "").replace("\"}],\"director\":", "");
                        } catch (error) {}

                        let director = "";
                        try {
                            director = data.match(regexForDirector)[0];
                            director = director.replace(",\"director\":\[{\"@type\":\"Person\",\"name\":\"", "").replace("\"}],\"awards\":", "");
                        } catch (error) {}

                        finalData = {
                            'Title': title,
                            'Actors': actorList,
                            'Director': director,
                            'Poster': image
                        };

                        if (isBlackListed(title) == false) {
                            console.log("sending");
                            chrome.notifications.create('', {
                                title: 'SpoilerFilter',
                                message: 'Do you want to add \"' + title + '\" to SpoilerFilter?',
                                iconUrl: '/icon.png',
                                type: 'basic',
                                buttons: [{
                                    title: "Yes",
                                }, {
                                    title: "No",
                                }]
                            });
                        }
                });
                        
            }
        });
    });
}

chrome.tabs.onUpdated.addListener(scanTabs);
chrome.tabs.onCreated.addListener(scanTabs);




