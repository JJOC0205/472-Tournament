
function createBracket(){
	let playerNum = document.getElementsByClassName("player").length;
}
let renderLogin = () => {
	var google_provider = new firebase.auth.GoogleAuthProvider();
	$("#user").html(`
 <button id="clickme">Login Please</button>
				   `);
	$("#clickme").on("click", () => {
		console.log("clicked");
		firebase.auth().signInWithRedirect(google_provider);
	})
}


let startApp = (user) => {
	$("#user").html(`<h1>Welcome ${user.displayName}!!</h1><button id="logout">Log out here</button>`);

	$("#logout").click(() => {
		firebase.auth().signOut();
	})
	return user.displayName;
}

firebase.auth().onAuthStateChanged(user => {
	if (!!user) {
		userName = startApp(user);
	} else {
		renderLogin();
	}
});
let db = firebase.database();
document.querySelector("#createGame").addEventListener("click", function (event) {
	let bracketName = document.getElementById("bracketName").value;
	if (bracketName == "") {
		alert("Please enter a name");
		return;
	}
	console.log("clicked");
	for(var i = 0; i < document.getElementById("numPlayers").value; i++){
		console.log("inloop")
		var newInput = document.createElement("input");
		newInput.className = "player";
		newInput.type = "text";
		newInput.placeholder = "enter player name";
    	document.getElementById("content").appendChild(newInput);
	};
	document.getElementById("numPlayers").value = 0;

});
let players = [];
document.querySelector("#joinGame").addEventListener("click", function (event) {
	for(var i = 0; i < document.getElementsByClassName("player").length; i++){
		console.log(document.getElementsByClassName("player")[i].value)
		players.push(document.getElementsByClassName("player")[i].value);
	}
	db.ref("brackets").child(bracketName).push(players);
});