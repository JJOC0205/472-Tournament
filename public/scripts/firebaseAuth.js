let renderLogin = ()=>{
   $("#user").html(`
<button id="clickme">Login Please</button>
                  `);
   $("#clickme").on("click", ()=>{
    console.log("clicked");
     firebase.auth().signInWithRedirect(google_provider);
   })
}


let startApp = (user)=>{
   $("#user").html(`<h1>Welcome ${user.displayName}!!</h1><button id="logout">Log out here</button>`);

   $("#logout").click(()=>{
     firebase.auth().signOut();
   })
}


  var google_provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().onAuthStateChanged(user => {
    if (!!user){
      startApp(user);
      firebase.database().ref('users/').child(user.uid).set({
        name :user.displayName
      });
      joinBrackets(user);
    } else {
      renderLogin();
    }
  });
