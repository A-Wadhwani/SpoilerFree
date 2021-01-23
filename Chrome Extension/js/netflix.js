// this holds the last url that had "https://www.netflix.com/watch/" in its name.
// this way it doesn't keep updating the page with the same show/movie repeatedly
let lastNetflixUrl = "";


/*
let url = "https://www.netflix.com/title/80057281";

const myInit = {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'omit'
};
  
fetch(url, myInit)
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
        

        console.log(title);
        console.log(image);
        console.log(actors);
        console.log(actorList);
        console.log(creator);
        console.log(director);
    });

*/
/*
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
*/
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
                console.log("Watching Netflix");
                console.log(showId);

                
                const myInit = {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    credentials: 'omit'
                };

                console.log(lastNetflixUrl);

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
                        let finalData = {
                            'Title': title,
                            'Actors': actorList,
                            'Director': director,
                            'Poster': image
                        };
                        addShow(finalData);
                        });
            }
        });
    });
}

chrome.tabs.onUpdated.addListener(scanTabs);
chrome.tabs.onCreated.addListener(scanTabs);




