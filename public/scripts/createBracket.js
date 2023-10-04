let removeHidden = ()=>{
  let hidden = document.querySelectorAll(".hidden");
  hidden.forEach((item)=>{
    item.removeAttribute("hidden");
  });
}
let userId = false;
let yourname = "";
let renderMe = ()=>{
/*     $("bracket").html(
`
<div id="bracket-wrapper">
    <input type="text" id="bracketID" placeholder="Enter your bracket name/ID"/>
    <button class="bracketButton" id="submit">
</div>
`
    ); */
/*   $("#creator").html(
`
<div id="text-wrapper">
<input type="text" id="num" placeholder="Enter number of players"/>
<button class="numButton" id="submit">
Submit
</button>
<input type="text" id="text" placeholder="Enter your name"/>
<button class="coolbutton" id="submit">
Submit
</button>
</div>
`
  ); */
  $(".numButton").click(()=>{
    let num = $("#num").val();
    if(!!num){
      firebase.database().ref('brackets').set({
        num: num
      });
      removeHidden();
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
document.addEventListener('DOMContentLoaded', function() {
  firebase.auth().onAuthStateChanged(user => {
    if(!user){
      console.log("not logged in");
      return;
    }
    else{
      console.log(user);
      userId = user.uid;
      renderMe();
    }
  });
  firebase.auth().signInAnonymously();
});