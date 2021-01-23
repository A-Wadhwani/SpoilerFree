
loadData();

function loadData(){
    let data = localStorage.getItem('spoilerFree');
    if (data == null){ 
        data = [];
        localStorage.setItem('spoilerFree', []);
    }
    return data;
}

function addShow(show){
    let data = localStorage.getItem('spoilerFree');
    data.data_list.push(show);
    localStorage.setItem('spoilerFreeShows', data);
    db.collection("users").add(data);
}
    