function joinBrackets(user) {
    let db = firebase.database().ref("brackets");
    let userId = user.uid;
    console.log(db.get());
}