/* let button = document.getElementById('submit');
button.addEventListener('click', (e) => {
    console.log("clicked")
    let yourname = newUserInput.value;
    if (!!yourname) {
        firebase.database().ref('users/').child(userId).set({
            name: yourname
        });
    }
    e.preventDefault();
}); */
let addUser = () => {
    let newUser = document.getElementById('newUserInput');
    console.log("clicked")
    if (!!newUser.value) {
        firebase.database().ref('users/').child(userId).set({
            name: newUser.value
        });
    }
    e.preventDefault();
}