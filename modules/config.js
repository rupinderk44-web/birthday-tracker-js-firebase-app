const firebaseConfig = {
  apiKey: "AIzaSyAYpj91WVh_U1xmvd0dS9d-sX3b8_SiT3A",
  authDomain: "birthdaytracker-38e6f.firebaseapp.com",
  databaseURL: "https://birthdaytracker-38e6f-default-rtdb.firebaseio.com",
  projectId: "birthdaytracker-38e6f",
  storageBucket: "birthdaytracker-38e6f.firebasestorage.app",
  messagingSenderId: "24445873714",
  appId: "1:24445873714:web:b455f2dc20448b5edb962b"
};

//initializeFirebase
 export const app = firebase.initializeApp(firebaseConfig)

//  database reference
export const database=firebase.database(app);


