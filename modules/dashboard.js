import { app ,database } from "./config.js";

// check user login or not if not move to login  page
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    getBirthDate(uid);
  } else {
    window.location.href = "index.html";
    console.log("error")
  }
});


// Get Birthdate from db
function getBirthDate(uid){
    const dbRef = firebase.database().ref().child("users");
    dbRef.child(uid).get()
     .then((snapshot) => {
        if (snapshot.exists()) {
            const username = snapshot.val().username;
            const userbirthday = snapshot.val().birthDate;
            birthmessage(username,userbirthday);
        } else {
             alert("User data not found.");
        }
    }).catch((error) => {
        alert(error.message);
     });

 }

 // message div id
const message=document.getElementById("birthdayMessage");

// get bithday quotes from Api and display 
 async function getQuotes(username){
    try{
        const response = await fetch('https://corsproxy.io/?https://type.fit/api/quotes');
        if(response.ok){
            const jsonResponse = await response.json();
            const length = jsonResponse.length;
            const quotes = Math.floor(Math.random() * length);
            message.innerHTML = `<h1 class="fw-bold">Happy Birthday, ${username}!</h1>
                <p>"${jsonResponse[quotes].text}"</p>
                <p><small><i>${jsonResponse[quotes].author}<i></small></p>`;
        }
    }catch(error){
        alert(error.message);
    }
   
 }

 //Count the pending birthday days
 function birthmessage(username,userbirthday){
    const[year, month, day] = userbirthday.split("-").map(Number);
  
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const currentYear = currentDate.getFullYear();

    let currentYearBirthday = new Date(currentYear,month-1,day);

    if (currentYearBirthday < currentDate){
       const increaseYear = currentYearBirthday.getFullYear() + 1;
      currentYearBirthday.setFullYear(increaseYear);
        
    } 
     const timediffernce = currentYearBirthday-currentDate;
     const days = timediffernce / (1000 * 60 * 60 * 24);
     const pendingDay = Math.ceil(days);

    if(pendingDay==0){
        getQuotes(username);
    } else{
        message.innerHTML= `<h1 class="fw-bold text-uppercase">${pendingDay} Days Left</h1>
                            <p class="fw-bold text-uppercase">Until Your Birthday!</p>`;
    }
 }

// User Signout function
function userSignout(){
    firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
    }).catch((error) => {
        alert(error.message);
    });
}

// action on click signout button
document.getElementById("userlogout").addEventListener("click", userSignout)