import React, {useState,useEffect} from 'react'
import firebaseApp from "../../components/firebase"
import firebase from "../../components/firebase2"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp } from "firebase/firestore"
import { title } from 'process';

import NoteCard from '../../components/Notecard';



//受け取るcontextの内容を編集
export const getStaticPaths = async () => {
  //const res = await fetch('https://jsonplaceholder.typicode.com/users');
  //const data = await res.json();

  let posts = []

    //const path="mydata/1"
    const colRef=await collection(firebaseApp, "mydata")

    // let allPosts =getDocs(colRef)

    // allPosts.map(doc => {
    //   posts.push({...doc.data(),id:doc.id})
    // })

    await getDocs(colRef)
            .then((snapshot)=>{
                //console.log(snapshop.docs)
                //let books=[]
                snapshot.docs.forEach(doc => {
                  //posts.push({...doc.data(),id:doc.userid})//...で新しいオブジェクトに入れている
                  //posts.push({id:doc.userid})
                  //posts.push(JSON.stringify({id:doc.data().userid}))
                  posts.push(JSON.stringify(doc.data().userid))
                  
                });
                
            }).then(()=>console.log(posts))

            //const entries =getDocs(colRef)
            // const paths =  posts.map(entry => ({
            //   params: {
            //     id: entry.data().userid.toString() 
            //   }
            // }));


    // for (const doc of allPosts) {
    //   console.log(doc.id, '=>', doc.data())
    //   console.log('the id is....')

    //   //let data = doc.data()

    //   posts.push({...doc.data(),id:doc.id})
    // }

    
  // map data to an array of path objects with params (id)
  const paths = posts.map(ninja => {
    return {
      //params: { id: ninja.toString() }
      params: { id:ninja.toString() }
      //params:  ninja.toString()
    }
  })
  // const paths = posts.map((ninja) => ({
  //   params: { id: ninja.toString()}
  // }))
  // const paths = posts.map((post) => ({
  //   return{
  //   params: {
  //     //id: post.id.toString()
  //     id: post.id.toString()
  //   }
  // }
  // }))
  console.log('paths')
  //console.log(paths)

  return {
    paths,
    fallback: false
  }
}

//contextは{  params: { id: '2' },などの内容で取得
export const getStaticProps = async (context) => {
  console.log(context)
  console.log('aa')
 
  //let posts = {}
  let posts = []
 
  //const id = context.params.id;
  const id = parseInt(context.params.id)
  
//  const id = context.params.id.toString();
//console.log(id)



  //const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  //const data = await res.json();

  //const data=[]

    const colRef= await collection(firebaseApp, "mydata")

    const q = await query(colRef,where("userid","==",id))
    //const q = await query(colRef,where("username","==","naki"))

    console.log('q')
    //console.log(q)
    
    await getDocs(q)
            .then((snapshot)=>{
              console.log('1')
              //console.log(snapshot)
              //console.log(snapshot.docs)
              

                snapshot.docs.forEach(doc => {
                  console.log('2')
                  const data = doc.data()
                  console.log('data.title')
                  //console.log(data)

                  //console.log(data.title)
                  // posts.title = data.title
                  // posts.details = data.details
                  // posts.userid = data.userid 
                  // posts.username = data.username
                  const pile={}
                  pile.title = data.title
                  pile.details = data.details
                  pile.userid = data.userid 
                  pile.username = data.username
                  pile.category = data.category

                  posts.push(pile)

                });
                
            })//.then(()=>console.log(posts))

    // const allPosts=getDocs(q)

    // console.log(q)
    // console.log(allPosts)


    // allPosts.forEach((doc) => {
    //   const data = doc.data()

    //   console.log(data.title)
    //   post.title = data.title
    //   post.details = data.details
    //   post.details = data.userid 
    //   post.details = data.username

    // })
    
  return {
    props: { ninja: posts }
  }
}



const Details = ({ ninja }) => {

  //const firestorage = getStorage(firebase);
  const firestorage = getStorage();

  const [image,setImage]=useState('')

  //console.log('ninja')
  //console.log({ninja})

  //const entry={ninja}

  
  //image表示
  const gsReference = ref(
      firestorage,
      //"gs://myapp-8e583.appspot.com/image.jpg"
      "gs://myapp-8e583.appspot.com/"+ninja[0].userid+"/image.jpg"
    )

  getDownloadURL(gsReference)
  .then(url => {
      setImage(url)
  })
  .catch(err => console.log(err))

  return (
    <div>
      { ninja.map((item,index) => {
                return (
                <div key={index}>
                    <p> { item.title }</p>
                    <p>{ item.details } </p>
                    <p> { item.userid }</p>
                    <p>{ item.username } </p>

                    <div  xs={12} md={6} lg={4} key={index}>
                    <NoteCard note={item}  />
                  </div>
                </div>
                
                
                );
            })}


      {/* <h1>{ ninja[0].title }</h1>
      <p>{ ninja[0].details }</p>
      <p>{ ninja[0].userid }</p>
      <p>{ ninja[0].username }</p> */}

  
      <img src={image} alt="" width="300" height="300"/>

    </div>

    
  );
}

export default Details;