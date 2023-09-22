import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCPxWbIU8cxRcyjMPxEJkzRwtvp0VUlLY8",
  authDomain: "emailpasstodo.firebaseapp.com",
  projectId: "emailpasstodo",
  storageBucket: "emailpasstodo.appspot.com",
  messagingSenderId: "906969020254",
  appId: "1:906969020254:web:2de680124dc330f193c1cf"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
