/* detects when the browswer has started to load a webpage */

chrome.webNavigation.onCommitted.addListener(function (tab) {
    if (tab.frameId == 0) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            
            //check the URL
            if (!tabs[0]){
                return;
            }

            let url =  tabs[0].url;

            if (url.indexOf("youtube.com") != -1) {
                removeSpoilers();
                return;
            }
            else {
                return;
            }

            /*let url = tabs[0].url;

            //remove things from the beginning
            let parsedUrl = url.replace("https://", "").replace("http://", "")
                .replace("www.", "");

            //remove things after / 
            let domain = parsedUrl.slice(0, parsedUrl.indexOf('/') == -1 ? parsedUrl.length : parsedUrl.indexOf('/'))
                .slice(0, parsedUrl.indexOf('?') == -1 ? parsedUrl.length : parsedUrl.indexOf('?'));

            try {
                if (domain.length < 1 || domain === null || domain === undefined) {
                    return;
                } else if (domain == "youtube.com") {
                    runYoutubeScript();
                    return;
                }
            } catch (err) {
                throw err;
            }*/
                
        });
    }
});

function runYoutubeScript() {
    chrome.tabs.executeScript({
        file: 'js/youtube.js'
    });
    return true;
}


function removeSpoilers() {

    //Get all 'yt-formatted-string' elements on the page

    let youtubeStrings = document.getElementsByTagName("yt-formatted-string");

    for (var i = 0; i < youtubeStrings.length; i++) {
        //Check if they contain spoilers

        console.log("Logging");

        let spoilerWords = loadSpoilerWords();

        console.log("Here: " + spoilerWords);

        for (var j = 0; j < spoilerWords.length; j++) {

            if (youtubeStrings[i].innerHTML.indexOf(spoilerWords[j]) != -1) {

                j = spoilerWords.length;

                //looks for the closest div with the class "style-scope ytd-rich-grid-media"
                let toBeBlocked = youtubeStrings[i].closest("style-scope ytd-rich-grid-media");
                //console.log("This: " + toBeBlocked + " is what we got");
                if (!(toBeBlocked === null)) {
                    while (true) {
                        if (toBeBlocked.id.localeCompare("dismissable") == 0) {
                            break;
                        }
                    } 
                    toBeBlocked = toBeBlocked.closest("text-wrapper style-scope ytd-video-renderer");  
                }

                if (toBeBlocked === null) {
                    toBeBlocked = youtubeStrings[i];
                    while(true) {
                        if ((toBeBlocked.className.localeCompare("text-wrapper style-scope ytd-video-renderer") == 0)
                        || (toBeBlocked.id.localeCompare("details"))) {
                            break;
                        }
                        toBeBlocked = toBeBlocked.parentNode;
                    }
                }
                //console.log("reached here")
                //console.log(toBeBlocked);

                toBeBlocked.setAttribute("style", "visibility: hidden");

                let dismissable = toBeBlocked;
                while (true) {
                    if ((dismissable).id.localeCompare("dismissable") == 0) {
                        break;
                    }
                    dismissable = dismissable.parentNode;
                }

                let thumbnail = dismissable.getElementsByClassName("style-scope yt-img-shadow");

                //console.log(thumbnail[0]);
            
                thumbnail[0].setAttribute("src", "https://static.wixstatic.com/media/8c5e04_9a676e5cf1d24391b0fd980105ab4d23~mv2.jpg/v1/fill/w_514,h_360,al_c,q_90/8c5e04_9a676e5cf1d24391b0fd980105ab4d23~mv2.jpg");

            //toBeBlocked.setAttribute("style", "display: none !important;");

            /*console.log(toBeBlocked.getElementsByClassName("overlay"));

            if (toBeBlocked.getElementsByClassName("overlay").length == 0) {


                let thumbnail = toBeBlocked.getElementsByTagName("ytd-thumbnail");
                thumbnail[0].setAttribute("style", "display: none !important;")
                
                var node = document.createElement("DIV");
                node.setAttribute("class", "overlay");

                toBeBlocked.appendChild(node);

                var imageNode = document.createElement("IMG");
                imageNode.setAttribute("src", "https://i.ytimg.com/vi/CV4he9sDXL8/maxresdefault.jpg");
                imageNode.setAttribute("class", "image");
                node.appendChild(imageNode);
            }*/

            /*let thumbnail = toBeBlocked.getElementsByClassName("style-scope yt-img-shadow");
            console.log(thumbnail);
            node.appendChild(imageNode);
            toBeBlocked.appendChild(node);*/

            

            /*youtubeStrings[i].setAttribute("style", "visibility: hidden");

            let thumbnail = toBeBlocked.getElementsByClassName("style-scope ytd-video-renderer");
            console.log(thumbnail);

            thumbnail.setAttribute("style", "visibility: hidden");*/

            //let oldAttribute = toBeBlocked.getAttribute("style");

            //toBeBlocked.setAttribute("style", "display: none !important;");
            }
        }
    }
}

removeSpoilers();

//repeats as user scrolls, every 200 ms

setInterval(function () {
    removeSpoilers();
}, 200)

function loadSpoilerWordsList() {
    let data = JSON.parse(localStorage.getItem('showsArray'));
    let badWords = [];
    data.forEach(element => {
        badWords.push(...element['Title'].split(" "));
        let actors = element['Actors'].toString().replace(",", " ");
        badWords.push(...actors.split(" "));
        if (element['Director'] != 'N\\A' && element['Director'] != ''){
            badWords.push(...element['Director'].split(" "));
        }
    })
    var filteredWords = badWords.filter(function (item) {return item != "The" && item != "" && item != null})
    return filteredWords;
}