function getVals(bracket){
	var bracketRef = firebase.database().ref("brackets").child(bracket);
	bracketRef.on("value", (snapshot) => {
		var data = snapshot.val();
		var len = Object.values(data);
		console.log(len);
	});
	return len;
}
function getKeys(bracket){
	var bracketRef = firebase.database().ref("brackets").child(bracket);
	bracketRef.on("value", (snapshot) => {
		var data = snapshot.val();
		var keys = Object.keys(data);
		console.log(keys);
	});
	return keys;
}