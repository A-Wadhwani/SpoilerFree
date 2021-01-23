// this holds the last url that had "https://www.netflix.com/watch/" in its name.
// this way it doesn't keep updating the page with the same show/movie repeatedly
let lastNetflixUrl = "";


let url = "https://www.netflix.com/watch/80057281";

let xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      const regex = /"name":".*?","description":"/;
      let found = xhr.responseText.match(regex)[0];
      found = found.replace("\"name\":\"", "").replace("\",\"description\":\"", "");
      console.log(found);
   }};

xhr.send();


function scanTabs() {
    chrome.windows.getAll({populate: true}, function(windows) {
        chrome.tabs.getSelected(null,function(tab) {
            let tablink2 = tab.url;
            chrome.extension.getBackgroundPage().console.log(tablink2);
            if (tablink2.includes("https://www.netflix.com/watch/") && lastNetflixUrl != tablink2) {
                // now we know they are watching a netflix show.
                lastNetflixUrl = tablink2;
                const regex = /https:\/\/www.netflix.com\/watch\/[0-9]*/;
                let found = lastNetflixUrl.match(regex)[0];
                let showId = found.substring(30, found.length);
                
                // print debugging stuff
                chrome.extension.getBackgroundPage().console.log("Watching Netflix");
                chrome.extension.getBackgroundPage().console.log(showId);
                getDataFromNetflix(showId);
            }
        });
    });
}

chrome.tabs.onUpdated.addListener(scanTabs);
chrome.tabs.onCreated.addListener(scanTabs);