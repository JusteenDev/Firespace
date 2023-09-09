import { initializeApp } from '@firebase/app';
import { getDatabase, ref, set } from '@firebase/database';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

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
const db = getDatabase(app);
const auth = getAuth(app);

const typingEffect = async (Element, Text, Speed) => {
  return new Promise(async (resolve) => {
    for (let current = 0; Text.length; current++) {
      Element.textContent += Text.charAt(current);
      await sleep(Speed);
    }
    resolve();
  });
};

const deletingEffect = async (Element, Speed) => {
  return new Promise(async (resolve) => {
    let text = Element.textContent;
    let backspace = text.length;
    while (backspace > 0) {
      backspace--;
      Element.textContent = text.substring(0, backspace);
      await sleep(Speed);
    }
    resolve();
  });
};

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const createInput = (id, type, placeholder, autocomplete = "true") => {
  const inputElement = document.createElement('input');
  createAttributes(inputElement, {
    id, type, placeholder, autocomplete
  });
  return inputElement;
};

const container = document.querySelector('.container');
const emailContainer = document.createElement('section');
createAttributes(emailContainer, {
  class: "emailContainer"
});

const emailElement = createInput("email", "email", "Email");
const passElement = createInput("pass", "password", "Password");
const secondPassElement = createInput("secondPass", "password", "Confirm Password");
const firstNextButton = document.createElement('button');
createAttributes(firstNextButton, {
  id: "nextToInfo"
});

firstNextButton.innerHTML = "Next";
emailContainer.appendChild(emailElement);
emailContainer.appendChild(passElement);
emailContainer.appendChild(secondPassElement);
emailContainer.appendChild(firstNextButton);

container.appendChild(emailContainer);

let hintElement = document.querySelector('.hint');
let contextElement = document.querySelector('.context');
let context = "Enter your email and password";
let hint = `Enter your valid email`;

contextElement.textContent = context;
typingEffect(hintElement, hint, 5);

document.querySelector('#nextToInfo').addEventListener('click', () => {
  
  let listOfError = [];
  const UPPERCASEONPASS = /[A-Z]/;
  const INTEGERONPASS = /[0-9]/;
  const EMAILCHECK = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  let EMAIL = document.querySelector('#email');
  let PASSWORD = document.querySelector('#pass');
  let RPASSWORD = document.querySelector("#secondPass");
  const VALIDITY = document.querySelector('.isvalid');
  
  const PASSDOESNTMATCH = PASSWORD.value !== RPASSWORD.value;
  const PASSNOTVALID = UPPERCASEONPASS.test(PASSWORD.value) && INTEGERONPASS.test(PASSWORD.value);
  const LENGHTNOTVALID = PASSWORD.value.length !== 16;
  const EMAILNOTVALID = EMAILCHECK.test(EMAIL.value);
  const INPUTVALID = EMAILCHECK.test(EMAIL.value.to) && UPPERCASEONPASS.test(PASSWORD.value) && INTEGERONPASS.test(PASSWORD.value);
  
  EMAIL.addEventListener('click', () => {
    VALIDITY.innerHTML = ""
  })
  PASSWORD.addEventListener('click',() => {
    VALIDITY.innerHTML = ""
  })
  RPASSWORD.addEventListener('click',() => {
    VALIDITY.innerHTML = ""
  })
  if (PASSWORD.value === RPASSWORD.value && EMAIL.value !== "" && PASSWORD.value !== "" && RPASSWORD.value !== "") {
    createUserWithEmailAndPassword(auth, EMAIL.value, PASSWORD.value)
      .then((credential) => {
        
        console.log(credential);
        let contextForInfo = "Basic information";
        let hintForInfo = "Use your real name.";
        
        emailElement.value = "";
        passElement.value = "";
        secondPassElement.value = "";
        contextElement.textContent = contextForInfo;
        
        const rslv = async () => {
          await deletingEffect(hintElement, 10);
          hintElement.textContent = "";
          await sleep(500);
          await typingEffect(hintElement, hintForInfo, 10);
        };
        
        rslv().then(() => { console.log('done') });

        const firstNameElement = createInput("name", "text", "First Name");
        const middleNameElement = createInput("middlename", "text", "Middle Name");
        const lastNameElement = createInput("lastname", "text", "Last Name");
        const nickname = createInput("nickname", "text", "Username");

        emailContainer.replaceChild(firstNameElement, emailElement);
        emailContainer.replaceChild(middleNameElement, passElement);
        emailContainer.replaceChild(lastNameElement, secondPassElement);
        emailContainer.appendChild(nickname);

        document.querySelector("#nextToInfo").remove();

        const done = document.createElement('button');
        const about = createAttributes(done, {
          id: 'done'
        });
        
        emailContainer.appendChild(done);
        const doneBtn = document.querySelector("#done");
        doneBtn.innerHTML = "Done";
        
        
      }).catch((error) => {
        console.log(error);
        VALIDITY.innerHTML = "Please enter valid email";
      });
      
      
  } else {
    EMAIL.value = "";
    PASSWORD.value = "";
    RPASSWORD.value = "";
    VALIDITY.innerHTML = "Enter valid email and Check if your password is identical";
  }
  
});