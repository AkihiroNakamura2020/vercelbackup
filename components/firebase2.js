//import firebase from 'firebase/app'
//import 'firebase/storage'
import { getStorage } from "firebase/storage"
import { getFirestore,collection } from "firebase/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVf-PeDNOkpiU_TX-MfqPKpjYIFpnr6zw",
  authDomain: "myapp-8e583.firebaseapp.com",
  projectId: "myapp-8e583",
  storageBucket: "myapp-8e583.appspot.com",
  messagingSenderId: "427138307048",
  appId: "1:427138307048:web:a7ce76d325211b60478a5d"
};

// Initialize Firebase app
const firebase = initializeApp(firebaseConfig)
//init services


// export const firebaseApp = {
//   firestore,
// }
export default firebase
//const storage = getStorage(firebaseApp);

// const firebase = initializeApp(firebaseConfig)
// export default firebase

  
  
