loadData()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('messaged.');
  if (request.greeting == 'hello')
    sendResponse({ farewell: loadSpoilerWords()})
})

function loadData () {
  let data = JSON.parse(localStorage.getItem('showsArray'))
  if (data == null) {
    data = []
    localStorage.setItem('showsArray', JSON.stringify(data))
  }
  return data
}

function checkForSpoilers (youtubeURL, callback) {
  request = 'http://35.232.212.63/getdesc?url=' + youtubeURL
  fetch(request)
    .then(r => r.text())
    .then(result => {
      var flag = false
      var list = loadSpoilerWords()
      list.forEach(function (element) {
        if (result.toLowerCase().includes(element.toLowerCase())) {
          flag = element
        }
      })
      if (flag==false) callback("No spoilers found in description");
      else callback("Potential spoilers in description");
    })
}

function checkForSpoilersInSubtitles (youtubeURL, callback) {
  request = 'http://35.232.212.63/transcribe?url=' + youtubeURL
  fetch(request)
    .then(r => r.text())
    .then(result => {
      var flag = false
      var list = loadSpoilerWords()
      list.forEach(function (element) {
        if (result.toLowerCase().includes(element.toLowerCase())) {
          flag = element
        }
      })
      if (flag==false) callback("No spoilers found in transcription");
      else callback("Potential spoilers in transcription");
    })
}

function loadSpoilerWords () {
  let data = JSON.parse(localStorage.getItem('showsArray'))
  let badWords = []
  data.forEach(element => {
    badWords.push(...element['Title'].split(' '))
    //let actors = element['Actors'].toString().replace(",", " ");
    //badWords.push(...actors.split(" "));
    if (element['Director'] != 'N\\A' && element['Director'] != '') {
      badWords.push(...element['Director'].split(' '))
    }
  })
  var filteredWords = badWords.filter(function (item) {
    return item != 'The' && item != '' && item != null
  })
  return filteredWords
}

function loadBlacklist () {
  let data = JSON.parse(localStorage.getItem('blacklist'))
  if (data == null) {
    data = []
    localStorage.setItem('blacklist', JSON.stringify(data))
  }
}

function addToblacklist (title) {
  let data = JSON.parse(localStorage.getItem('blacklist'))
  data.forEach(element => {
    if (element == title) {
      return
    }
  })
  data.push(show)
  localStorage.setItem('blacklist', JSON.stringify(data))
}

function isBlackListed (title) {
  let data = JSON.parse(localStorage.getItem('blacklist'))
  data.forEach(element => {
    if (element == title) {
      return true
    }
  })
  return false
}

function addShow (show) {
  let data = JSON.parse(localStorage.getItem('showsArray'))
  let flag = true
  data.forEach(element => {
    if (element['Title'] == show['Title']) {
      flag = false
    }
  })
  if (flag == true) {
    data.push(show)
    localStorage.setItem('showsArray', JSON.stringify(data))
  }
  return flag
}

function removeShow (title) {
  let data = JSON.parse(localStorage.getItem('showsArray'))
  data.forEach(element => {
    if (element['Title'] == title) {
      let index = data.indexOf(element)
      data.splice(index, 1)
    }
  })
  localStorage.setItem('showsArray', JSON.stringify(data))
}
