function addUser(){
    let newUser = document.getElementById('newUserInput').value;
    console.log("clicked")
    if (!!newUser) {
        firebase.database().ref('users/').child(userId).set({
            name: newUser
        });
    }
    e.preventDefault();

}
    document.getElementById('newUserSubmit').addEventListener('submit', addUser);