let userId = false;
let userName = "";
let addUser = ()=>{
  $("#newUserSubmit").click(()=>{
    let userName = $("#newUserText").val();
    if(!!userName){
      firebase.database().ref('users/').child(userId).set({
        name :userName
      });
      document.getElementById("text-wrapper").removeAttribute("hidden");
    }
  }
  );
}
document.addEventListener('DOMContentLoaded', function() {
  firebase.auth().onAuthStateChanged(user => {
    if(!user){
      console.log("not logged in");
      return;
    }
    else{
      console.log(user);
      userId = user.uid;
      addUser();
    }
  });
  firebase.auth().signInAnonymously();
});