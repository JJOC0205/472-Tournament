function joinBrackets(user) {
    let bracketRef = firebase.database().ref("brackets");
    $("#join").html(`
    <input type="text" id="bracketName" placeholder="Enter the bracket name" />
		<button class="joinButton" id="submit">
			Submit
		</button>
    `);
    $(".joinButton").click(() => {
        bracketName = $("#bracketName").val();
        bracketRef.child(bracketName).update({
            [user.uid]: user.displayName
    });
});
}