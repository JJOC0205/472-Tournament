
 function renderMe(user){
  console.log("render me");
  userId = user.uid;
  $(".numButton").click(()=>{
     let num = $("#num").val();
     bracketName = $("#bracketName").val();
     if(!!num && num > 0 && bracketName != ""){
       firebase.database().ref('brackets').child(bracketName).update(
         {
           num: num
         }
       );
         addPlayer(bracketName,num);
         document.getElementById("submit").setAttribute("hidden", true);
     }
     else{
       console.log(firebase.database().ref('brackets').child(bracketName).get());
    }
  });
  $(".coolbutton").click(()=>{
    let yourname = $("#text").val();
    if(!!yourname){
      firebase.database().ref('users/').child(userId).set({
        name :yourname
      });
    }
  });
}