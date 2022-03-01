function read_display_quote(){
    //get into the right collection
    db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
        console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    } )
}
read_display_quote();

function insertName() {
    //to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user =>{
        if (user){
            console.log(user.uid) //let me to know who is the user that logged in
            currentUser = db.collection("users").doc(user.uid); // will go the the firesotre to go to the document of the users.
            currentUser.get().then(userDoc =>{
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-goes-here").innerText=user_Name;
                //$("#name-goes-here").text(user_Name);//jquery
            })
        }
    })
}
insertName();

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Burnaby Lake Park Trail",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Elmo goes here regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Elmo goes here regularly"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Elmo goes here regularly"
    });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");