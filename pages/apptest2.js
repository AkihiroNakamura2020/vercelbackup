import React, {useState,useEffect} from 'react'
//import firebase from "../components/firebase"

//import { ref } from "firebase/storage"
//import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot } from "firebase/firestore"

import { useRouter } from 'next/router'

import { getStorage } from "firebase/storage"
//import { getFirestore,collection } from "firebase/firestore"

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


function apptest2() {

    const [books, setBooks] = useState([])

    // Initialize Firebase app
initializeApp(firebaseConfig);

//init services
const db=getFirestore()

//collection ref
const colRef=collection(db,"mydata")

const q =query(colRef,where("age","==",39))
    
getDocs(q)
.then((snapshot)=>{
    //console.log(snapshot.docs)//このオブジェクトの中にある必要な部分を取り出す
    let books=[]
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(),id:doc.id})//doc.dataでデータ部分からタイトルなどの取り出し
    })
    console.log(books)
    setBooks(books)
})



    return (

        <div>    
    
            <div>
            {books[0] ? (
                books.map(book => (
                    <div key={book.id}>
                    <p>{book.name}</p>
                    <p>{book.mail}</p>
                    <p>{book.age}</p>
                    </div>
                ))
                ) : (
                <p>データがありません</p>
                )}
            </div>
    
        </div>
    

      );
}

export default apptest2