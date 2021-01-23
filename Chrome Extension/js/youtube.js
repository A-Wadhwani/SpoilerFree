function removeSpoilers() {

    //Get all 'yt-formatted-string' elements on the page

    let youtubeStrings = document.getElementsByTagName("yt-formatted-string");

    for (let i = 0; i < youtubeStrings.length; i++) {
        //Check if they contain spoilers

        if (youtubeStrings[i].innerHTML.indexOf("Stranger Things") != -1) {

            //looks for the closest div with the class 
            let toBeBlocked = youtubeStrings[i].closest("style-scope ytd-rich-grid-media");
            while (true) {
                if (toBeBlocked.id.localeCompare("dismissable") == 0) {
                    break;
                }
            }

            if (toBeBlocked === null) {
                toBeBlocked = youtubeStrings[i];
                for (let j = 0;  j < 7; j++) {
                    toBeBlocked = toBeBlocked.parentNode;
                }
            }

            toBeBlocked.setAttribute("style", "display: none !important;");
        }
    }
}

removeSpoilers();

//repeats as user scrolls, every 100 ms

setInterval(function () {
    removeSpoilers();
}, 100)