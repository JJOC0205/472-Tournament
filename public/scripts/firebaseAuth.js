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


let renderLogout = () => {
	$("#user").html(`</h1><button id="logout">Log out here</button>`);
	$("#logout").click(() => {
		firebase.auth().signOut();
	})
}

function router(pathName) {
	renderLogout();
	if (pathName.length < 3) {
		//startApp();
	}
}


document.addEventListener("DOMContentLoaded", function () {
	let pathName = document.location.pathname;
	//let split = pathName.split("/");
	console.log(pathName);
	if (!!user) {
		router(pathName);
	}
	else {
		renderLogin();
	}
});
