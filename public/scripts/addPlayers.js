 function addPlayer(bracketName, numPlayers){
    console.log(numPlayers);
    let players = document.getElementById("players");
    for(var i = 0; i < numPlayers; i++){
        console.log("hello");
        var newInput = document.createElement("input")
        newInput.setAttribute("id", "player" + i);
        newInput.setAttribute("placeholder", "Enter player name");
        players.appendChild(newInput);
        console.log(newInput.id);
    }
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "joinBracket");
    newButton.innerHTML = "Submit";
    players.appendChild(newButton);
    console.log("made button")
    $("#joinBracket").click(()=>{
        console.log("before loop")
        var playerNames = [];
        for(var i = 0; i < numPlayers; i++){
            let yourname = document.getElementById("player"+i).value;
            console.log(yourname);
            playerNames.push(yourname);
        }
        console.log(playerNames);
         firebase.database().ref('brackets/').child(bracketName).update({
             playerNames
         });
         document.getElementById("joinBracket").setAttribute("hidden", true);
     });
 }