/* detects when the browswer has started to load a webpage */

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
      title: 'X-ray check and description check',
      id: 'menu1', // you'll use this in the handler function to identify this context menu item
      contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "menu1") { // here's where you'll need the ID
      checkForSpoilers(info.linkUrl,alert);
      checkForSpoilersInSubtitles(info.linkUrl, alert);
  }
});

chrome.webNavigation.onDOMContentLoaded.addListener(function (tab) {
  if (tab.frameId == 0) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      //check the URL
      let url = tabs[0].url

      if (url.indexOf('youtube.com') != -1) {
        runYoutubeScript()
        return
      } else {
        return
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
    })
  }
})

function runYoutubeScript () {
  chrome.tabs.executeScript({
    file: 'js/youtube2.js'
  })
  return true
}
