chrome.webNavigation.onCompleted.addListener(function(details) {
    //Begin searching if page matches
    let regex = /\.imdb.com\/title\/(.*)\//;
    let url = details.url;

    let matches = url.match(regex);

    if (matches != null && matches.length == 2){
        getDataFromIMDB(matches[1]);
    }

}, {url: [{urlMatches : 'imdb.com/'}]});

function getDataFromIMDB(OMbd){
    let requestLink = "http://www.omdbapi.com/?apikey=2ac890b2&i=".concat(OMbd);
    fetch(requestLink).then(r => r.text()).then(response => {
        let result = JSON.parse(response);
        let data = {
            'Title': result['Title'],
            'Actors': result['Actors'],
            'Director': result['Director'],
            'Poster': result['Poster']
        };
        alert(JSON.stringify(data));
        return data;
    });
    return null;
}
