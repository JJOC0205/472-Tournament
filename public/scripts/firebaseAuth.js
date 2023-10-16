let theUser = null;
function createBracket() {
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
function renderHome() {
	$("#user").html(`<h1>Welcome ${theUser.displayName}!!</h1><button id="logout">Log out here</button>`);
	$("#content").html(`
	<button id="createGame">Create a Bracket</button>
	<div id="brackets"></div>
	`);
	$("#createGame").on("click", () => {
		let bracketName = prompt("Enter a name for your bracket");
		if (!bracketName) {
			alert("Please enter a name");
			return;
		}
		let newBracket = db.ref("brackets/").push();
		newBracket.set({ "name": bracketName, "id": newBracket.key, "players": [] });
	});
	firebase.database().ref("brackets/").on("value", (snapshot) => {
		$("#brackets").html("");
		let allBrackets = snapshot.val() || {};
		Object.keys(allBrackets).map((bracketId) => {
			theBracket = allBrackets[bracketId];
			$("#brackets").append(`
		<a class= "bracket-wrap" href="/bracket/${theBracket.id}">
		<h2>${theBracket.name}</h2>
		</a>
		`);
		});
	});

}

function renderBracket(bracketId) {
	$('#content').html('loading...');
	db.ref('brackets/').child(bracketId).once('value').then((snapshot) => {
		theBracket = snapshot.val();
		console.log(theBracket);
		$('#content').html(`
			<h1>${theBracket.name}</h1>
			<div id="bracket"></div>
			<button id="addPlayer">Add Player</button>
			<button id="startGame">Start Game</button>
		`);
		let joined = false;
		theBracket.players.map((player) => {
			if (player.name == theUser.displayName) {
				joined = true;
			}
		});
		if (!joined) {
			$("#addPlayer").on("click", () => {
				db.ref("brackets/").child(bracketId).child("players").push({ "name": theUser.displayName, "id": theUser.uid });
			});
		}
		else {
			$("#addPlayer").remove();
		}
	});
}

let startApp = (parts) => {


	$("#logout").click(() => {
		firebase.auth().signOut();
	})
	if (parts.length < 3) {
		renderHome();
	}
	else {
		if (parts[1] == 'brackets' && parts[2].length > 1) {
			renderBracket(parts[2]);
		}
		else {
			renderHome();
		}
	}
}
document.addEventListener("DOMContentLoaded", function (event) {
	let pathName = document.location.pathname;
	let splitPath = pathName.split("/");
	firebase.auth().onAuthStateChanged(user => {
		if (!!user) {
			theUser = user;
			startApp(splitPath);
		} else {
			theUser = null;
			renderLogin();
		}
	});
});
let db = firebase.database();
document.querySelector("#createGame").addEventListener("click", function (event) {
	let bracketName = document.getElementById("bracketName").value;
	if (bracketName == "") {
		alert("Please enter a name");
		return;
	}
	let newBracket = db.ref("brackets/").push();
	document.location.pathname = "/bracket/" + newBracket.key;
	$("#content").html(`HELLS YEAH`);

});
let players = [];
document.querySelector("#joinGame").addEventListener("click", function (event) {
	console.log("clicked");
	for (var i = 0; i < document.getElementById("numPlayers").value; i++) {
		console.log("inloop")
		var newInput = document.createElement("input");
		newInput.className = "player";
		newInput.type = "text";
		newInput.placeholder = "enter player name";
		document.getElementById("content").appendChild(newInput);
	};
	document.getElementById("numPlayers").value = 0;
});