
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgbfbX3BgP0p3Q_swWWykRWImZXnL0jM4",
  authDomain: "dropbox-48342.firebaseapp.com",
  projectId: "dropbox-48342",
  storageBucket: "dropbox-48342.appspot.com",
  messagingSenderId: "564672216262",
  appId: "1:564672216262:web:3a5ed303632dc017c8ebc7"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};