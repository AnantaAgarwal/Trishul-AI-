document.addEventListener("DOMContentLoaded", function(){

    const loginBtn = document.getElementById("loginBtn");
  
    loginBtn.addEventListener("click", function(){
  
      const provider = new firebase.auth.GoogleAuthProvider();
  
      firebase.auth().signInWithPopup(provider)
        .then((result)=>{
          console.log("Login Success:", result.user.email);
          window.location.href = "landing.html";
        })
        .catch((error)=>{
          alert("Authentication Failed");
          console.error(error);
        });
  
    });
  
  });
