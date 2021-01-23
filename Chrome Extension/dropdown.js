let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e)=>{
    e.preventDefault();
    getDataFromSearch(document.getElementById('movie-name').value, data_callback);
});

function data_callback(data){
    if (data["Title"] != null){
        createInfoBox(data);
    }
}

function createInfoBox(data){
    let html = "<div class=\"ps-1 pb-2 clearfix\"><img src=\""+ data['Poster'] +"\" class=\'thumb\'><h4>" + data["Title"] + "</h4><button id=\"remove\" class=\"btn btn-danger btn-sm\">Remove</button></div>"
    let form = document.getElementById("search-form");
    form.insertAdjacentHTML('afterend', html);
}