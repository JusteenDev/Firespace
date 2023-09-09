import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "@firebase/auth";
import { getDatabase, child, ref, set, get } from "@firebase/database";

const timeNow = new Date().getTime();

const firebaseConfig = {
  apiKey: "AIzaSyD6gK9xU-PadewruUVb4PI56ETsrMO-FNs",
  authDomain: "firechat-community.firebaseapp.com",
  databaseURL: "https://firechat-community-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firechat-community",
  storageBucket: "firechat-community.appspot.com",
  messagingSenderId: "996499977405",
  appId: "1:996499977405:web:2923ba90564e6d1bf273d4",
  measurementId: "G-DDR00KC0B4",
};

const app = initializeApp(firebaseConfig);
const facebook = new FacebookAuthProvider();
const google = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);
const email = document.querySelector("#email");
const pass = document.querySelector("#password");

const hasNextAttemp = (timestamp) => {
  const timeHasChanged = timeNow - timestamp,
    timeLeft = 60 * 60 * 1000;

  if (timeHasChanged >= timeNow) {
    return true;
  } else {
    return false;
  }
};

email.addEventListener("click", () => {
  email.style.borderStyle = "none";
  pass.style.borderStyle = "none";
  document.querySelector('#check-validation').innerHTML = "";
});

pass.addEventListener("click", () => {
  email.style.borderStyle = "none";
  pass.style.borderStyle = "none";
  document.querySelector('#check-validation').innerHTML = "";
});


document.querySelector(".login-google").addEventListener('click', () => {
  signInWithPopup(auth, google)
    .then((credential) => {
      console.log(credential);
    })
    .catch((error) => {
      console.log(error);
    });
});

document.querySelector('.login-facebook').addEventListener('click', () => {
  signInWithPopup(auth, facebook)
    .then((credential) => {
      console.log(credential);
    }).catch((error) => {
      console.log(error);
    });
});

document.querySelector("#login-btn").addEventListener("click", () => {

  const check = document.querySelector('#check-validation');
  if (email.value === "" && pass.value !== "") {
    check.innerHTML = "Email field is empty";
  }

  else if (pass.value === "" && email.value !== "") {
    check.innerHTML = "Password field is empty";
  }

  else if (email.value !== "" && pass.value !== "") {
    signInWithEmailAndPassword(auth, email.value, pass.value)
      .then((credentials) => {
        
        //user.uid;
        //user.email;
        //user.photoURL;
        //user.displayName;
        
        localStorage.setItem("displayName", credentials.user.displayName);
        localStorage.setItem("uid", credentials.user.uid);
        localStorage.setItem("timelogin", timeNow.toString());
        
        set(ref(db, 'user/' + credentials.user.uid), {
          email: credentials.user.email.toString(),
          'inbox':['0'],
        });
        
        //window.location.href = "index.html";
      })
      
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/wrong-password") {
          check.innerHTML = "Password doesn't match.";
          pass.style.borderStyle = "solid";
          pass.style.borderColor = "red";
        } else {
          check.innerHTML = "Email doesn't Exist";
          pass.style.borderStyle = "solid";
          pass.style.borderColor = "red";
          email.style.borderStyle = "solid";
          email.style.borderColor = "red";
        }
      });
  }
  
  else if (email.value === "" && pass.value === "") {
    check.innerHTML = " Your email and password field is Empty";
  }
});


document.querySelector('.create-account-field').addEventListener('click', () => {
  window.location.href = "signup.html";
});