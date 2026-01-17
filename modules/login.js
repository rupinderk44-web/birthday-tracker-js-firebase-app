import { app ,database } from "./config.js";

// check the login detail and sign in
function SignIn(obj){
    firebase.auth().signInWithEmailAndPassword( obj.loginemail, obj.loginpassword)
    .then((userCredential)=>{
       const uid = userCredential.user.uid;
       window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
     });
}

// function to get data form login form by id
function getFormData(id){
    return document.getElementById(id).value;
}

//login function
function login(e){
    e.preventDefault();
    var obj= {
        loginemail: getFormData("loginemail"),
        loginpassword: getFormData("loginpassword")
     }
    SignIn(obj);

}

// Call login function on click login form submit button
document.getElementById("loginForm").addEventListener( "submit" , login );