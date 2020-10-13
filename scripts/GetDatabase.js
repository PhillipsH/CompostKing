function getData(){
    i = 200;
    console.log("data gotten")
    db.collection("Scores").orderBy("score", "desc").limit(10).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            myGame.showTableText(i += 50, "Name: " + doc.data().name + "Score: " + doc.data().score);

        });
    });
}
