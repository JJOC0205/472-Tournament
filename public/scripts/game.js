/* document.querySelector("#createGame").addEventListener("click", function (event) {
    var name = document.getElementById("#bracketName").value;

});
*/
document.querySelector("#joinGame").addEventListener("click", function (event) {
    if (document.getElementById("playerName").value == "") {
        alert("Please enter a name");
        return;
    }
    let newPlayer = document.createElement("div");
    newPlayer.id = document.getElementById("playerName").value;
    newPlayer.innerHTML = document.getElementById("playerName").value;
    newPlayer.addEventListener("click", function (event) {
        newPlayer.remove();
    });
    document.getElementById("content").appendChild(newPlayer);
});
