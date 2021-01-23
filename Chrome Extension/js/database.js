
loadData();

function loadData(){
    let data = JSON.parse(localStorage.getItem('showsArray'));
    if (data == null){ 
        data = [];
        localStorage.setItem('showsArray', JSON.stringify(data));
    }
    return data;
}

function addShow(show){
    let data = JSON.parse(localStorage.getItem('showsArray'));
    data.push(show);
    localStorage.setItem('showsArray', JSON.stringify(data));
}

    