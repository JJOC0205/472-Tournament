let theUser = null;
let db = firebase.database();
bracketName = "test";
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
		Object.keys(allBrackets).map(bracketId => {
			theBracket = allBrackets[bracketId];
			$("#brackets").append(`
		<a class= "bracket-wrap" href="/brackets/${bracketId}">
		<h2>${theBracket.name}</h2>
		</a>
		`);
		});
	});

}

function renderBracket(bracketId) {
	$('#content').html('loading...');
	console.log(bracketId);
	db.ref("/brackets/").on("value", (snapshot) => {
		let theBracket = snapshot.val();
		
		console.log("HERE");
		theBracket = JSON.parse(JSON.stringify(theBracket[bracketId]));
		console.log(theBracket["players"]);
		$('#content').html(`
			<h1>${theBracket.name}</h1>
			<div id="bracket"></div>
			<button id="addPlayer">Add Player</button>
			<button id="startGame">Start Game</button>
		`);
		let joined = false;
		let playersObj = theBracket["players"];
		let players = [];
		for (let key in playersObj) {
			players.push(playersObj[key]);
		}
		players.map((player) => {
			if (player == theUser.displayName) {
				console.log(joined)
				joined = true;
				console.log(joined)
			}
		});
		if (!joined) {
			$("#addPlayer").on("click", () => {
				db.ref("brackets/").child(bracketId).child("players").push(theUser.displayName);
			});
		}
		else {
			$("#addPlayer").remove();
		}
		$("#startGame").on("click", () => {
			startGame(bracketId, players);
		});
	});

}

function matchUp(player1, player2) {
	let p1 = document.createElement("div");
	let p2 = document.createElement("div");
	p1.innerHTML = player1;
	p2.innerHTML = player2;
	p1.className = "player";
	p2.className = "player";
	let match = document.createElement("div");
	match.className = "match";
	match.appendChild(p1);
	match.appendChild(p2);
	document.getElementById("bracket").appendChild(match);
	p1.addEventListener("click", () => {
		console.log("clicked");
		console.log(p1.getAttribute("class"));
		console.log(p2.getAttribute("class"));
		p1.classList.add("winner");
		p2.classList.remove("winner");
		console.log(p1.getAttribute("class"));
		console.log(p2.getAttribute("class"));
	});
	p2.addEventListener("click", () => {
		console.log("clicked");
		console.log(p1.getAttribute("class"));
		console.log(p2.getAttribute("class"));
		p2.classList.add("winner");
		p1.classList.remove("winner");
		console.log(p1.getAttribute("class"));
		console.log(p2.getAttribute("class"));
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

function startGame(bracketId, players) {
	if(players.length % 2 == 1){
		players.push("bye");
	}
	for (let i = 0; i < players.length; i += 2) {
		matchUp(players[i], players[i + 1]);
	}
}

function getWinners(){
	let winners = [];
	let matches = document.getElementsByClassName("match");
	for(let i = 0; i < matches.length; i++){
		let match = matches[i];
		let players = match.getElementsByClassName("player");
		let winner = players[0].innerHTML;
		if(players[0].classList.contains("winner")){
			winner = players[1].innerHTML;
		}
		winners.push(winner);
	}
	return winners;
}

document.addEventListener("DOMContentLoaded", function (event) {
	let pathName = document.location.pathname;
	console.log(pathName);
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
