import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Create from './Create';
import { useState,useEffect } from 'react';

import {
  getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged
} from "firebase/auth"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import firebaseApp from "../components/firebase"
import firebase from "../components/firebase2"


import { Grid } from '@mui/material';

import { makeStyles } from "@mui/styles"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Medium from '../components/Medium';
import Debank from '../components/Debank';

import { TwitterTimelineEmbed,  TwitterTweetEmbed } from 'react-twitter-embed';


import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useRouter } from 'next/router'

import { TextField } from '@mui/material';
import { Button } from '@mui/material';

import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,addDoc,serverTimestamp,updateDoc,deleteDoc,deleteField, arrayUnion, arrayRemove} from "firebase/firestore"


import Link from 'next/link';

const useStyles=makeStyles({
// const useStyles=makeStyles((theme) => ({
  balancer:{
      display:'flex',
  },
  toolh:{
    height:50,
    flexGrow:1//可能な限りの幅を取る
  },
    cardh:{
        marginTop:20,
        marginBottom:20,
  },
  doright:{
    align:'right',
    marginBottom:-6,
},

imagemargin:{
  marginRight:10,
},

  

  // cardM:{
  //   "& > *": {
  //     margin: theme.spacing(10)
  //           }
  // },

},{ name: "MuiExample_Component" })//)


export default function Index() {
  

  const [notes,setNotes]=useState([])//([])
  const classes=useStyles()

  const firestorage = getStorage();
  const auth=getAuth()

  const [mymedium, setMedium] = useState();
  const [mydebank, setDebank] = useState();

  const [idlink, setID] = useState();
 
  const router = useRouter()

  const [umail,setUmail]=useState('')
const [upass,setUpass]=useState('')

const [flagset,setSetting]=useState(false)
const [flaglogin,setLogin]=useState(false)
const [flaglogout,setLogout]=useState('')
const [flagerror,setError]=useState(false)

const [Maxid,setMaxid]=useState('')

const aryMax = function (a, b) {return Math.max(a, b);}


useEffect(() => {
  let posts = []
  const colRef= collection(firebaseApp, "mydata")
  getDocs(colRef)
          .then((snapshot)=>{
              snapshot.docs.forEach(doc => {
                posts.push(JSON.stringify(doc.data().userid))
                
              });
              
          }).then(()=>{
            setMaxid(posts.reduce(aryMax))
          })
  
  console.log('Maxid')
  console.log(Maxid)
   
}
   , [Maxid])

//最大userid値の取得
// let posts = []
// const colRef= collection(firebaseApp, "mydata")
// getDocs(colRef)
//         .then((snapshot)=>{
//             snapshot.docs.forEach(doc => {
//               posts.push(JSON.stringify(doc.data().userid))
              
//             });
            
//         }).then(()=>{
//           setMaxid(posts.reduce(aryMax))
//         })

// console.log('Maxid')
// console.log(Maxid)


async function handleOnLINK (e){
  e.preventDefault();

    const colRef=  collection(firebaseApp, "mydata")
    const q =  query(colRef,where("username","==",idlink))
    var notexist=true
   
    console.log(idlink)
    
    var goid=''
    
    //authをもとにクリック主のデータベース情報の取得
     getDocs(q)
    .then((snapshot)=>{
      snapshot.docs.forEach(doc => {
        const data = doc.data()
       
          if(data.userid)
          {
            console.log(data.userid)
            notexist=false
            goid=data.userid
            
        }

      });
                
    }).then(()=>{
              if(notexist){
                setError(true)
              }else{
                router.push('/ID/'+ goid)
              }
            })
  }


async function handleOnAuth(e) {
  e.preventDefault();

  console.log('aiu')
  const email=umail
  const password=upass

  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    console.log('user created1:',cred.user)
    setUmail('')
    setUpass('')
    
  }).then(()=>{
    console.log('user created2')  
  })

  const docRef = await addDoc(colRef,{
    userid:Maxid+1,
    username:email,
    date:Date.now(),
    mail:email
  })

  console.log("Document written with ID: ", docRef.id);
  localStorage.setItem('authuserid',docRef.id)
  

}


async function handleOnAuthIn(e) {
  e.preventDefault();

  console.log('aiu')
  const email=umail
  const password=upass

  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    console.log('user loged in:',cred.user)
    localStorage.setItem('authhistory',email)
    setUmail('')
    setUpass('')
    
  }).then(()=>{
    console.log('localStorage.getItem(authhistory)')
    console.log(localStorage.getItem('authhistory'))
  
  })

}

async function handleOnAuthOut(e) {
  e.preventDefault();

  console.log('out')
  localStorage.setItem('authhistory','')
  localStorage.setItem('authuserid','')

  signOut(auth)
  .then(()=>{
    //console.log('signed out')
    console.log(localStorage.getItem('authhistory'))
    console.log(localStorage.getItem('authuserid'))
  })
}

  return (
     <Container >
      <Grid container spacing={3}>

      <Grid item xs={12} md={12} lg={12}>
      
      <Typography variant="h4" component="h1" style={{color: '#99ccff'}} gutterBottom>
          Welocome to ItsmE 
          <br />
          Recreate yourselves and Connect the world
          <br /> <br />
      </Typography>

      <Typography variant="h6" component="h10"  gutterBottom>
          Nowadays we can easily recreate ourselves and be active through our avatars as presented by NFT
          <br />
          In the world we can collaborate with anybody who wants.We hope the negative view goes away
          <br /> <br />
      </Typography>

         <Button variant="outlined" sx={{ fontSize: 25 }}　 className={classes.imagemargin} onClick={()=>setLogin(!flaglogin)}>Log in</Button> 
         <Button variant="outlined" sx={{ fontSize: 25 }}　 className={classes.imagemargin} onClick={()=>setSetting(!flagset)}>Sign up</Button>
         <Button variant="outlined" sx={{ fontSize: 25 }}　 className={classes.imagemargin} onClick={handleOnAuthOut}>Logout</Button>
      
      <br />

      {flagset && (
        <div>
      Setting for Auth
        <form noValidate autoComplete="off" onSubmit={handleOnAuth}>
              Mail
              <TextField 
              onChange={(e)=>setUmail(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
              Pass
              <TextField 
              onChange={(e)=>setUpass(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
               
               <Box textAlign="center">
                  <Button
                      type="submit"
                      varient="contained"
                      >
                      submit
                  </Button>
               </Box>
          </form>
          </div>
      )}

{flaglogin && (
        <div>
          Login
          <form noValidate autoComplete="off" onSubmit={handleOnAuthIn}>
              Mail
              <TextField 
              onChange={(e)=>setUmail(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
              Pass
              <TextField 
              onChange={(e)=>setUpass(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
               
               <Box textAlign="center">
                  <Button
                      type="submit"
                      varient="contained"
                      onClick={()=>console.log('aa')}
                      >
                      submit
                  </Button>
               </Box>

          </form>
          </div>
          )}

          <h2>Looking For Your Firends</h2>
          <form noValidate autoComplete="off" onSubmit={handleOnLINK}>
                <TextField 
                onChange={(e)=>setID(e.target.value)}
                
                variant="outlined"
                color="secondary"
                defaultValue="Friend's name"
                fullWidth
                required
                //error={titleError}
                />
                 
                 <Box textAlign="center">
                    <Button
                        type="submit"
                        varient="contained"
                        >
                        submit
                    </Button>
                 </Box>

            </form>
            {flagerror && (
              <div>
                <Typography variant="h4" component="h1" gutterBottom>
                error: we cannot find who you look for.Please check the name.
                </Typography> 
                </div>
          )}
      
      </Grid>

     
      
      </Grid>
      <div className={classes.toolh}></div>

      <Grid item xs={12} md={12} lg={12} className={classes.balancer}>

        
        
          <Grid item xs={6} md={6} lg={6} >
         
              <Typography variant="h4" component="h1" gutterBottom>
                
              </Typography> 

            
          
                 
          </Grid>

          {/* {notes.map(note => ( */}
          {/* <Grid item xs={12} md={12} lg={12} key={note.id}> */}
          <Grid item xs={6} md={6} lg={6} >
            
          
          </Grid>

      </Grid>        
     
    </Container>
  );
}
