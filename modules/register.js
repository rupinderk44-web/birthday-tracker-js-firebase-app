import { database } from "./config.js";

//Post data function
function addDataToFirebase(obj){
  firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password)
  .then((credential) => {
     var user = credential.user;
     const userId = credential.user.uid;

     var ref=firebase.database().ref("users/"+ userId);
     ref.set({
        username: obj.userName,
        birthDate: obj.birthDate,
     }).then(() => {
        alert("Your account has been created successfully. Click OK to log in.");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  })
  .catch((error) => {
    alert(error.message);
  });
}

// get data from register form
function getFormData(id){
      return document.getElementById(id).value;
}

// register data function
function submitRegisterForm(e){
    e.preventDefault();
    var obj= {
        userName: getFormData("username"),
        birthDate: getFormData("userbirthdate"),
        email: getFormData("registeremail"),
        password: getFormData("registerpassword"), 
    }
    addDataToFirebase(obj);
   
}

// action on click the register button
document.getElementById("registerForm").addEventListener("submit", submitRegisterForm);


