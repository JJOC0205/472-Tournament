function addUser(){
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
