import { initializeApp } from '@firebase/app';
import { getDatabase, ref, set, onValue, child, get, push, update, runTransaction, increment } from "@firebase/database";

class System {
  

  addAtrribute(element, attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  listenLogin() {
    const UID = localStorage.getItem('uid');
    const TIMELOGGED = localStorage.getItem('timelogin');
    const PURL = localStorage.getItem('displayName');

    if (UID !== null && TIMELOGGED !== null && PURL !== null) {
      return true;
    } else {
      return false;
    }
  }

  timeListen() {
    const DATE = new Date();
    let time = DATE.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return time;
  }

  createThread(NAME, THREADID) {
    const INBOX = document.querySelector('.inbox');
    const THREAD = document.createElement('section');
    const SETUSERNAME = document.createElement('p');
    const GETUSERNAME = document.createTextNode(NAME);
    const PROFILE = document.createElement('img');

    const THREADATTR = {
      class: 'thread',
      id: THREADID
    };

    const PROFILEATTR = {
      class: "profileImg",
      alt: "profile",
      src: "https://firebasestorage.googleapis.com/v0/b/firechat-community.appspot.com/o/default.jpg?alt=media&token=9ce2b444-54c3-4826-8e96-db96aea9bfa1"
    };

    this.addAtrribute(THREAD, THREADATTR);
    this.addAtrribute(PROFILE, PROFILEATTR);

    THREAD.appendChild(PROFILE);
    THREAD.appendChild(SETUSERNAME);
    SETUSERNAME.appendChild(GETUSERNAME);
    INBOX.appendChild(THREAD);
  }

  displayThreads(ID) {
    let INDEX = 0;
    const DELAY = 50;
    const createNextThread = () => {
      if (INDEX < ID.length) { 
        this.createThread(ID[INDEX]);
        setTimeout(createNextThread, DELAY);
        INDEX++;
      }
    };
    createNextThread();
  }


}

const config = {
  apiKey: "AIzaSyD6gK9xU-PadewruUVb4PI56ETsrMO-FNs",
  authDomain: "firechat-community.firebaseapp.com",
  databaseURL: "https://firechat-community-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firechat-community",
  storageBucket: "firechat-community.appspot.com",
  messagingSenderId: "996499977405",
  appId: "1:996499977405:web:2923ba90564e6d1bf273d4",
  measurementId: "G-DDR00KC0B4"
};

const system = new System();
if (system.listenLogin() === true) {

  const UID = localStorage.getItem('uid');
  const app = initializeApp(config);
  const db = getDatabase();
  const inbox = ref(db, 'user/' + UID + '/inbox');
  onValue(inbox, (snapshot) => {
    const data = snapshot.val();
    
  });

} else {
  window.location.href = '/signin.html';
}

document.querySelector(".inbox").addEventListener("click", (event) => {
  const thread = event.target.closest(".thread"); // Find the closest ancestor with class "thread"
  if (thread) {
    const tid = thread.getAttribute("id");
    const uid = localStorage.getItem('ID');
    
    console.log(tid);
  }
});