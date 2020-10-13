console.log("database launched")

function storeData(){

    db.collection("Scores").add({
    name: player,
    score: myGame.score
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}
