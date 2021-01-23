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
            console.log("reached here")
            console.log(toBeBlocked);

            toBeBlocked.setAttribute("style", "visibility: hidden");

            let dismissable = toBeBlocked;
            while (true) {
                if ((dismissable).id.localeCompare("dismissable") == 0) {
                    break;
                }
                dismissable = dismissable.parentNode;
            }

            let thumbnail = dismissable.getElementsByClassName("style-scope yt-img-shadow");

            console.log(thumbnail[0]);
            
            thumbnail[0].setAttribute("src", "https://i.ytimg.com/vi/CV4he9sDXL8/maxresdefault.jpg");

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

removeSpoilers();

//repeats as user scrolls, every 100 ms

setInterval(function () {
    removeSpoilers();
}, 100)