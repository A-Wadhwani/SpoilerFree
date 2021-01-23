function removeSpoilers() {

    //Get all 'yt-formatted-string' elements on the page

    let youtubeStrings = document.getElementsByTagName("yt-formatted-string");

    for (let i = 0; i < youtubeStrings.length; i++) {
        //Check if they contain spoilers

        if (youtubeStrings[i].innerHTML.indexOf("Stranger Things") != -1) {

            console.log("Hello World!");

            //looks for the closest div with the class "style-scope ytd-rich-grid-media"
            let toBeBlocked = youtubeStrings[i].closest("style-scope ytd-rich-grid-media");
            console.log("This: " + toBeBlocked + " is what we got");
            if (!(toBeBlocked === null)) {
                while (true) {
                    if (toBeBlocked.id.localeCompare("dismissable") == 0) {
                        break;
                    }
                } 
                toBeBlocked = toBeBlocked.closest("style-scope ytd-rich-grid-media");  
            }

            if (toBeBlocked === null) {
                toBeBlocked = youtubeStrings[i];
                while(true) {
                    if (toBeBlocked.id.localeCompare("dismissable") == 0) {
                        break;
                    }
                    toBeBlocked = toBeBlocked.parentNode;
                }
            }
            console.log("reached here")
            console.log(toBeBlocked);
            toBeBlocked.setAttribute("style", "display: none !important;");
        }
    }
}

removeSpoilers();

//repeats as user scrolls, every 100 ms

setInterval(function () {
    removeSpoilers();
}, 100)