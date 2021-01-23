firebase.initializeApp({
    apiKey: "AIzaSyByOITM0Z8dblOuHYBghbSofXER7_nLxT4",
    authDomain: "silver-rain-302602.firebaseapp.com",
    projectId: "silver-rain-302602"
});
  
var db = firebase.firestore();


//TODO: Create Cookie with localStorage and use that to figure out if there's an id already
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

