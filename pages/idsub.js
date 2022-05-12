import React, {useState,useEffect} from 'react'
import firebaseApp from "../../components/firebase"
import firebase from "../../components/firebase2"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp } from "firebase/firestore"


export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map(ninja => {
    return {
      params: { id: ninja.id.toString() }
    }
  })

  console.log(paths)

  return {
    paths,
    fallback: false
  }
}

//contextは{  params: { id: '2' },などの内容で取得
export const getStaticProps = async (context) => {
  console.log(context)
 
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

  return {
    props: { ninja: data }
  }
}



const Details = ({ ninja }) => {

  const firestorage = getStorage(firebase);

  const [image,setImage]=useState('')
  

  console.log(image)
  
  //image表示
  const gsReference = ref(
      firestorage,
      "gs://myapp-8e583.appspot.com/image.jpg"
    )

  getDownloadURL(gsReference)
  .then(url => {
      setImage(url)
  })
  .catch(err => console.log(err))

  return (
    <div>
      <h1>{ ninja.title }</h1>
      <p>{ ninja.details }</p>
      <p>{ ninja.userid }</p>
      <p>{ ninja.username }</p>

  
      <img src={image} alt="" />

    </div>

    
  );
}

export default Details;