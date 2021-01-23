    let searchButton = document.getElementById("search-button");

    loadInfoBoxes();

    searchButton.addEventListener("click", (e)=>{
        e.preventDefault();
        getDataFromSearch(document.getElementById('movie-name').value, addToSpoilerList);
    });

    function addToSpoilerList(data){
        if (data["Title"] != null){
            addShow(data);
            createInfoBox(data);
        }
    }

    function loadInfoBoxes(){
        let boxes = loadData();
        boxes.forEach(element => createInfoBox(element));
    }

    function createInfoBox(data){
        let html = "<div class=\"ps-1 pb-2 clearfix\"><img src=\""+ data['Poster'] +"\" class=\'thumb\'><h6>" + data["Title"] + "</h6><button id=\"remove\" class=\"btn btn-danger btn-sm\">Remove</button></div>"
        let form = document.getElementById("search-form");
        form.insertAdjacentHTML('afterend', html);
    }