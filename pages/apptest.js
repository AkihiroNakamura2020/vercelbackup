import React, {useState,useEffect} from 'react'
//import firebase from "../components/firebase"
import firebaseApp from "../components/firebase"

//import { ref } from "firebase/storage"
import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp } from "firebase/firestore"

import { useRouter } from 'next/router'


function apptest() {

    const [books, setBooks] = useState([])

    // 単一抜き出し
    useEffect(() => {

        //const firestore = getFirestore(firebaseApp)

        const getBook = async () => {
            //const path="mydata/1"
            const colRef=collection(firebaseApp, "mydata")

            const q =query(colRef,where("username","==","naki"),orderBy('title','desc'))

            getDocs(q)
            .then((snapshot)=>{
                //console.log(snapshop.docs)
                let books=[]
                snapshot.docs.forEach(doc => {
                    books.push({...doc.data(),id:doc.id})//...で新しいオブジェクトに入れている
                });
                console.log(books)
                setBooks(books)
            })
            
        }
        
        getBook()
        
      }, [])

      //再トライ単一抜き出し
      const docRef=doc(firebaseApp, "mydata",'abc')
      getDoc(docRef)
      .then((doc)=>{
          console.log(doc.data(),doc.id)
      })
    

    //全部抜き出し
    // useEffect(() => {

    //     const firestore = getFirestore(firebaseApp)
    
    //     const docRef = collection(firestore, "mydata")

    //     getDocs(docRef).then(res => {
    //         let results = []
        
    //         res.docs.forEach(doc => {
    //           results.push({ id: doc.id, ...doc.data() })
    //         })
    //         setBooks(results)
    //         console.log(books)
    //       })

    //   }, [])
    

    // const firestorage = getStorage(firebaseApp);

    // const [image,setImage]=useState('')
    // const router = useRouter()
    

    //console.log(image)
    
    //image表示
    // const gsReference = ref(
    //     firestorage,
    //     "gs://myapp-8e583.appspot.com/image.jpg"
    //   )

    // getDownloadURL(gsReference)
    // .then(url => {
    //     setImage(url)
    // })
    // .catch(err => console.log(err))

    const handleChange = e => {
        setImage(e.target.files[0])
        console.log(image)
        }

        
    const handleSubmit = e => {
        e.preventDefault()

        //console.log(image)

        
        try {
            const storage = getStorage();
            const path="test/"+image.name
            //const imageRef = ref(storage, image.name)//firestorage
            const imageRef = ref(storage, path)
          
            uploadBytes(imageRef, image).then(() => {
              console.log("Uploaded a file!")
              
            })

          } catch (err) {
            console.log(err)
          }
    }
    //console.log(books)

  return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange} />
            <button className="button">送信</button>
        </form>


        {/* <img src={image} alt="" /> */}
        <div>
        {books[0] ? (
            books.map(book => (
                <div key={book.id}>
                <p>{book.username}</p>
                <p>{book.title}</p>
                <p>{book.details}</p>
                <p>{book.Follower}</p>
                
                </div>
            ))
            ) : (
            <p>データがありません</p>
            )}
        </div>

    </div>



  );
}

export default apptest;