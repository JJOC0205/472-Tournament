function addUser(userName){
      if(!!userName){
      firebase.database().ref('users/').child(userId).set({
        name :userName
      });
      document.getElementById("text-wrapper").removeAttribute("hidden");
    }
  };