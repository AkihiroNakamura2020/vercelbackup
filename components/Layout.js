import React from "react";

import { Button, Container, Typography } from "@mui/material"
import HailIcon from '@mui/icons-material/Hail'
import { makeStyles } from "@mui/styles"

import { TextField } from "@mui/material"
import { useState } from "react"

import { Drawer } from "@mui/material"

import { AppBar } from "@mui/material"
import { Toolbar } from "@mui/material"

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';

import List from '@mui/material/List';

import MyImage from '../components/image'
import Editdrawer from "./Editdrawer";

import { Avatar } from "@mui/material";
import { useEffect } from 'react';


import firebaseApp from "./firebase"
import firebase from "./firebase2"

import {
  getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged,addDoc
} from "firebase/auth"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";
import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp } from "firebase/firestore"


const drawerWidth=240

const useStyles=makeStyles({
    field:{
        marginTop:20,
        marginBottom:20,
        display:'block',
    },
    page: {
        // background: '#f9f9f9',
        width: '100%',
      },
    drawer:{
        width:drawerWidth
    },
    drawerPaper:{
        width:drawerWidth
    },
    root:{
        display:'flex'
    },
    appbar:{
        width:`calc(100% - ${drawerWidth}px)`
    },
    toolbar:{
        height:100,
        flexGrow:1//可能な限りの幅を取る
    },
    date:{
        flexGrow:1//可能な限りの幅を取る
    },
    contents:{
        //width:`calc(100% - ${drawerWidth}px)`,
        textAlign: 'right',
        align: 'right',
        position: 'relative',
        
    },
    avatar:{
      marginLeft:20,
  }

},{ name: "MuiExample_Component" })



export default function Layout({children}){
    //console.log("layout");

    const classes=useStyles()
    const [title,setTitle]=useState('')
    const [details,setDetails]=useState('')
    const [titleError,setTitleError]=useState(false)
    const [detailsError,setDetailsError]=useState(false)
    
    const [Capitalname,setCapital]=useState('Mario')


    const [myarray,setArray]=useState(['Inbox', 'Starred', 'Send email', 'Drafts'])

    const firestorage = getStorage();
    const auth=getAuth()

    const [authhistory, setauthHistory] = useState();
    const [authname, setauthname] = useState();

    const [image,setImage]=useState('')
    

//  useEffect(() => {
//     setauthHistory(localStorage.getItem('authhistory'))
//     if (authhistory) {
//       //console.log('authhistory')
//       //console.log(authhistory)

//       //if(authhistory!=ninja[0].mail){router.push('/ID/'+ninja[0].userid)}
//       const colRef= collection(firebaseApp, "mydata")
//       const q =  query(colRef,where("mail","==",authhistory))

//        getDocs(q)
//     .then((snapshot)=>{

//                 snapshot.docs.forEach(doc => {
//                   const data = doc.data()
//                   console.log(doc.id)

//                   if(data.mail)
//                   {
//                     setauthname(data.userid)
//                   }
//                 });
                
//             }).then(()=>{
//               console.log('authname'+authname)
//             })

//     }

//   }, [authhistory])

//   console.log('authname1')
//   console.log(authname)

  // //image表示
  // if(authname!=undefined){

  // const gsReference = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/"+authname+"/image.jpg"
  // )

  //   getDownloadURL(gsReference)
  //   .then(url => {
  //       setImage(url)
  //   })
  //   .catch(err => console.log(err))

  // }

    return(
        <div className={classes.root}>
      {/* app bar */}
      <AppBar
            className={classes.appbar}
            >
                <Toolbar>
                    <Typography variant="h6"　className={classes.date}>
                    Amazing days with ItsmE 
                    </Typography>

                    {/* <Typography>
                        Mario
                    </Typography>

                    <Avatar src="/image.jpg" className={classes.avatar} />
                    <Avatar className={classes.avatar}>{Capitalname[0].toUpperCase()}</Avatar>
                    <Avatar className={classes.avatar}>{image}</Avatar> */}
                </Toolbar>

            </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" >
          ItsmE logo
          </Typography>
        </div>

        <MyImage fname="image.jpg" size="250" />

        <Editdrawer />
        
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>

        {/* <div>
          <Typography variant="h5" >
          Address: 0xa242fcb2acbb118ea1b6829efe8b7e2087b00000
          </Typography>
          <Typography variant="h6" >
          Following:200  Follower:200  gifted:2000
          </Typography>
          <MailIcon /><InboxIcon />
          
        </div> */}

        { children }
      </div>
    </div>
    )
}
