/* detects when the browswer has started to load a webpage */

chrome.webNavigation.onDOMContentLoaded.addListener(function (tab) {
    if (tab.frameId == 0) {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            
            //check the URL

            let url =  tabs[0].url;

            if (url.indexOf("youtube.com") != -1) {
                runYoutubeScript();
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