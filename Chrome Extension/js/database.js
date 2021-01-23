
loadData();

function loadData(){
    let data = JSON.parse(localStorage.getItem('showsArray'));
    if (data == null){ 
        data = [];
        localStorage.setItem('showsArray', JSON.stringify(data));
    }
    return data;
}

function loadBlacklist(){
    let data = JSON.parse(localStorage.getItem('blacklist'));
    if (data == null){
        data = [];
        localStorage.setItem('blacklist', JSON.stringify(data));
    }
}

function addToblacklist(title){
    let data = JSON.parse(localStorage.getItem('blacklist'));
    data.forEach(element => {
        if (element == title){
            return;
        }
    });
    data.push(show);
    localStorage.setItem('blacklist', JSON.stringify(data));
}

function isBlackListed(title){
    let data = JSON.parse(localStorage.getItem('blacklist'));
    data.forEach(element => {
        if (element == title){
            return true;
        }
    });
    return false;
}

function addShow(show){
    let data = JSON.parse(localStorage.getItem('showsArray'));
    data.forEach(element => {
        if (element['Title'] == show['Title']){
            return;
        }
    });
    data.push(show);
    localStorage.setItem('showsArray', JSON.stringify(data));
}

function removeShow(title){
    let data = JSON.parse(localStorage.getItem('showsArray'));
    data.forEach(element => {
        if (element['Title'] == title){
            let index = data.indexOf(element);
            data.splice(index, 1);
        }
    });
    localStorage.setItem('showsArray', JSON.stringify(data));
}