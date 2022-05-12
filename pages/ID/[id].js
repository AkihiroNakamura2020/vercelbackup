import React, {useState,useEffect} from 'react'
import firebaseApp from "../../components/firebase"
import firebase from "../../components/firebase2"


import {
  getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged,addDoc
} from "firebase/auth"

import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";

import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp,updateDoc,arrayUnion, arrayRemove } from "firebase/firestore"
import { title } from 'process';

import NoteCard from '../../components/NoteCard';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';
import { makeStyles } from "@mui/styles"
//import Medium from '../../components/Medium';
import Medium from '../Medium';

import Debank from '../../components/Debank';
import { TwitterTimelineEmbed,  TwitterTweetEmbed } from 'react-twitter-embed';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useRouter } from 'next/router'
import Deposits from '../Deposits';
import { TextField } from "@mui/material"
import { Button } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { convertCompilerOptionsFromJson } from 'typescript';
import { CardContent } from '@mui/material';


//受け取るcontextの内容を編集
export const getStaticPaths = async () => {

  let posts = []

    const colRef=await collection(firebaseApp, "mydata")


    await getDocs(colRef)
            .then((snapshot)=>{
                snapshot.docs.forEach(doc => {
                  posts.push(JSON.stringify(doc.data().userid))
                  
                });
                
            }).then(()=>console.log(posts))

    
  const paths = posts.map(ninja => {
    return {
      params: { id:ninja.toString() }
    }
  })
  console.log('paths')

  return {
    paths,
    fallback: false
  }
}

//contextは{  params: { id: '2' },などの内容で取得
export const getStaticProps = async (context) => {
  //console.log(context)
  //console.log('aa')
 
  let posts = []
 
  const id = parseInt(context.params.id)  

    const colRef= await collection(firebaseApp, "mydata")

    const q = await query(colRef,where("userid","==",id))
    
    await getDocs(q)
            .then((snapshot)=>{
   
                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  console.log('data.title')
   
                  const pile={}
                  //条件式 ? trueの処理 : falseの処理
                  pile.title = data.title?data.title:null
                  pile.details = data.details?data.details:null
                  pile.userid = data.userid 
                  pile.username = data.username
                  pile.category = data.category?data.category:null
                  pile.tweetId = data.tweetId ?data.tweetId:null
                  pile.debankid = data.debankid ?data.debankid:null
                  pile.address = data.address ?data.address:null
                  pile.mail = data.mail ?data.mail:null
                  pile.youtubeId = data.youtubeId ?data.youtubeId:null
                  pile.mediumid = data.mediumid ?data.mediumid:null
                  pile.docid = doc.id ?doc.id:null

                  pile.tweetlink = data.tweetlink ?data.tweetlink:null
                  pile.discordlink = data.discordlink ?data.discordlink:null
                  pile.youtubelink = data.youtubelink ?data.youtubelink:null
                  pile.telelink = data.telelink ?data.telelink:null
                  pile.whatslink = data.whatslink ?data.whatslink:null
                  pile.followers = data.followers ?data.followers:null
                  pile.following = data.following ?data.following:null

                  pile.nftlink = data.nftlink ?data.nftlink:null
                  pile.customlink1 = data.customlink1 ?data.customlink1:null
                  pile.customhash1 = data.customhash1 ?data.customhash1:null
                  pile.customlink2 = data.customlink2 ?data.customlink2:null
                  pile.customhash2 = data.customhash2 ?data.customhash2:null

                  pile.ycomment = data.ycomment ?data.ycomment:null
                  pile.storagelink = data.storagelink?data.storagelink:null


                  posts.push(pile)

                });
                
            })//.then(()=>console.log(posts))
    
  return {
    props: { ninja: posts }
  }
}

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
      docenter:{
      align:'center',
      marginTop:20,
      marginBottom:20,
      flexGrow:1
  },
      imagemargin:{
        marginRight:10,
  },
      cardmargin:{
        'margin-left': '1%',
          width: "98%",
},
titleback:{
  // backgroundColor: "#fcba03"
}
  
  
  },{ name: "MuiExample_Component" })//)


const Details = ({ ninja }) => {

  const firestorage = getStorage();
  const auth=getAuth()

  const [image,setImage]=useState('')
  const [noimage,setnoImage]=useState(false)
  
  //image表示

//   if(!noimage){
//   const gsReference = ref(
//       firestorage,
//       "gs://myapp-8e583.appspot.com/"+ninja[0].userid+"/image.jpg"
//     )

//   getDownloadURL(gsReference)
//   .then(url => {
//       setImage(url)
//   })
//   .catch(() => {
//     setnoImage(true)
//   })
//   //.catch(err => console.log(err))

// }
  
//追加事項
const classes=useStyles()

// const [mymedium, setMedium] = useState();
// const [mydebank, setDebank] = useState();
// const [mcard, setMcard] = useState();
// const [uname,setUname]=useState('')
// const [tid,setTid]=useState('')
// const [mytwt, setMytwt] = useState();
// const [category, setCategory] = useState('Medium')

const [depo, setDepo] = useState();
const router = useRouter()

const [umail,setUmail]=useState('')
const [upass,setUpass]=useState('')

const [closeflag,setClose]=useState(false)

const [addressflag,setAddress]=useState(false)
const [address,setaddress]=useState('')

// const [title,setTitle]=useState('')
//   const [details,setDetails]=useState('')
//   const [subcategory,setScategory]=useState('')
//   const [openflag,setFlag]=useState(false)
//   const [openflagd,setFlagd]=useState(false)
//   const [openflagm,setFlagm]=useState(false)
//   const [openflagy,setFlagy]=useState(false)

//   const [newaddress,setNewaddress]=useState(false)


//   const [closeflagM,setCloseM]=useState(false)

//   const [open, setOpen] = useState(false);
//   const [openflagt,setFlagt]=useState(false)
//   const [openeditflag,seteditFlag]=useState(false)

//   const [flagdocid,setFD]=useState('')


  const [followers,setfollowers]=useState('')
  const [following,setfollowing]=useState('')

  const [notes,setNotes]=useState([])//([])  

  const [youid,setYid]=useState('')
  const [myyoutube, setMyyoutube] = useState();

  
  const [medi, setMedi] = useState();

  const [twitterimage,setImagetw]=useState('')
  const [discordimage,setImageds]=useState('')
  const [youtubeimage,setImageyt]=useState('')
  const [teleimage,setImagetl]=useState('')
  const [whatsimage,setImagewts]=useState('')

  const [twitterlink,setLinktw]=useState('')
  const [discordlink,setLinkds]=useState('')
  const [youtubelink,setLinkyt]=useState('')
  const [telelink,setLinktl]=useState('')
  const [whatslink,setLinkwts]=useState('')

  const [nftimage, setnftImage] = useState('')

  const [nftlink, setnftLink] = useState('')
  const [nftlinkget, setnftLinkget] = useState('')
  const [nftdocidget, setnftdocidget] = useState('')

  const [customlink1, setcustomLink1] = useState('')
  const [custom1get, setcustom1get] = useState('')
  const [customdocid1, setcustomdocid1] = useState('')

  const [customhash1, setcustomhash1] = useState('')
  const [hash1get, sethash1get] = useState('')
  const [hash1docid, sethash1docid] = useState('')

  const [customlink2, setcustomLink2] = useState('')
  const [custom2get, setcustom2get] = useState('')
  const [customdocid2, setcustomdocid2] = useState('')

  const [customhash2, setcustomhash2] = useState('')
  const [hash2get, sethash2get] = useState('')
  const [hash2docid, sethash2docid] = useState('')

  const [idmailcheck, setidmailcheck] = useState(false)
  const [windowcheck, setwindowcheck] = useState(false)

  const [storagelink, setstoragelink] = useState('')
  const [storagelinkdocid, setstoragelinkdocid] = useState('')

ninja.forEach(Item => {

  if(Item.debankid !=null||Item.debankid !=undefined){
    if(depo==undefined||depo==null){
    //  depo = Item.debankid
     setDepo(Item.debankid)
      console.log('aiu')
     console.log('depo'+depo)
  }
}
  if(Item.mediumid !=null||Item.mediumid !=undefined){
    if(medi==undefined||medi==null){  
    setMedi(Item.mediumid)
    console.log(Item.mediumid)
    console.log('medi'+medi)
  }

}

if(Item.address !=null||Item.address !=undefined){
    if(address==undefined||address==null||address==''){ 
      setaddress(Item.address)
    }
}

if(Item.tweetlink !=null||Item.tweetlink !=undefined){
  if(twitterlink==undefined||twitterlink==null||twitterlink==''){ 
    setLinktw(Item.tweetlink)
  }
}

if(Item.discordlink !=null||Item.discordlink !=undefined){
if(discordlink==undefined||discordlink==null||discordlink==''){ 
  setLinkds(Item.discordlink)
}
}
if(Item.youtubelink !=null||Item.youtubelink !=undefined){
if(youtubelink==undefined||youtubelink==null||youtubelink==''){ 
  setLinkyt(Item.youtubelink)
}
}

if(Item.telelink !=null||Item.telelink !=undefined){
if(telelink==undefined||telelink==null||telelink==''){ 
  setLinktl(Item.telelink)
}
}
if(Item.whatslink !=null||Item.whatslink !=undefined){
if(whatslink==undefined||whatslink==null||whatslink==''){ 
  setLinkwts(Item.whatslink)
}
}

if(Item.followers !=null||Item.followers !=undefined){

if(followers==undefined||followers==null||followers==''){ 
  setfollowers(Item.followers)
}

}

if(Item.following !=null||Item.following !=undefined){

if(following==undefined||following==null||following==''){ 
  setfollowing(Item.following)
}
}

if(Item.nftlink !=null||Item.nftlink !=undefined){

  if(nftlinkget==undefined||nftlinkget==null||nftlinkget==''){ 
    setnftLinkget(Item.nftlink)
    setnftdocidget(Item.docid)
  }
}

if(Item.customlink1 !=null||Item.customlink1 !=undefined){

  if(custom1get==undefined||custom1get==null||custom1get==''){ 
    setcustom1get(Item.customlink1)
    setcustomdocid1(Item.docid)
  }
}

if(Item.customhash1 !=null||Item.customhash1 !=undefined){

  if(hash1get==undefined||hash1get==null||hash1get==''){ 
    sethash1get(Item.customhash1)
    sethash1docid(Item.docid)
  }
}

if(Item.customlink2 !=null||Item.customlink2 !=undefined){

  if(custom2get==undefined||custom2get==null||custom2get==''){ 
    setcustom2get(Item.customlink2)
    setcustomdocid2(Item.docid)
  }
}

if(Item.customhash2 !=null||Item.customhash2 !=undefined){

  if(hash2get==undefined||hash2get==null||hash2get==''){ 
    sethash2get(Item.customhash2)
    sethash2docid(Item.docid)
  }
}


if(Item.storagelink !=null||Item.storagelink !=undefined){

  if(storagelink==undefined||storagelink==null||storagelink==''){ 
    setstoragelink(Item.storagelink)
    setstoragelinkdocid(Item.docid)
  }
}

});

if(!windowcheck){
  if (typeof window !== 'undefined') {

    console.log(localStorage.getItem('authhistory'))
    console.log(ninja[0].mail)

    if(localStorage.getItem('authhistory')==ninja[0].mail){
      setidmailcheck(true)
      localStorage.setItem('authuserid',ninja[0].userid)

    }else{
      setidmailcheck(false)
    }
    setwindowcheck(true)
  
  } else {
    console.log('we are running on the server');
  }
}

useEffect(() => {
  if(localStorage.getItem('authhistory')==ninja[0].mail){ localStorage.setItem('authuserid',ninja[0].userid)}

     }
   , [])
 
  

  // //twitter icon
  // const gsReferencet = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/admin/2021 Twitter logo - blue.png"
  // )

  // getDownloadURL(gsReferencet)
  // .then(url => {
  //   setImagetw(url)
  // })

  // //discord icon
  // const gsReferenceds = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/admin/Discord-Logo-Color.png"
  // )

  // getDownloadURL(gsReferenceds)
  // .then(url => {
  //   setImageds(url)
  // })

  // //youtube icon
  // const gsReferenceyt = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/admin/youtube_social_square_white.png"
  // )

  // getDownloadURL(gsReferenceyt)
  // .then(url => {
  //   setImageyt(url)
  // })

  // //teleglam icon
  // const gsReferencetl = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/admin/Logo.png"
  // )

  // getDownloadURL(gsReferencetl)
  // .then(url => {
  //   setImagetl(url)
  // })

  // //whatsup icon
  // const gsReferencewts = ref(
  //   firestorage,
  //   "gs://myapp-8e583.appspot.com/admin/WhatsApp_Logo_2.png"
  // )

  // getDownloadURL(gsReferencewts)
  // .then(url => {
  //   setImagewts(url)
  // })



const handleClickImagetw = (e) => {
  //document.addEventListener('touchstart', handler, {passive: true});
  e.preventDefault();

  if(twitterlink){
    document.location.href = twitterlink
    console.log('twitterlink');
    console.log(twitterlink);
  }
}

const handleClickImageds = (e) => {
  //document.addEventListener('touchstart', handler, {passive: true});
  e.preventDefault();

  if(discordlink){
    document.location.href = discordlink
  }
}

const handleClickImageyt = (e) => {
  //document.addEventListener('touchstart', handler, {passive: true});
  e.preventDefault();

  if(youtubelink){
    document.location.href = youtubelink
  }
}

const handleClickImagetl = (e) => {
  //document.addEventListener('touchstart', handler, {passive: true});
  e.preventDefault();

  if(telelink){
    document.location.href = telelink
  }
}

const handleClickImagewts = (e) => {
  //document.addEventListener('touchstart', handler, {passive: true});
  e.preventDefault();

  if(whatslink){
    document.location.href = whatslink
  }
}

async function handleOnSNSlinks(e) {
  e.preventDefault();

  console.log('handleOnSNSlinks')

  var currentad=null
  var currentaddocid=null

  ninja.forEach((element) =>
    {
      console.log('element.tweetlink')
      console.log(element.tweetlink)
      console.log(element.docid)

      if(element.tweetlink!=null||element.tweetlink!=undefined){
        console.log('handleOnSNSlinks11')
        currentad=element.tweetlink
        currentaddocid=element.docid
      }
    })
    console.log('handleOnSNSlinks2')
    console.log(currentad)
    console.log('handleOnSNSlinks3')
    console.log(currentaddocid)

    
        //if(currentad===null){
      if(currentaddocid===undefined||currentaddocid===null){
        console.log('handleOnSNSlinks4')

          addDoc(colRef,{
          
          userid:ninja[0].userid,
          username:ninja[0].username,
          date:Date.now(),
          mail:ninja[0].mail,
          tweetlink:twitterlink,
          discordlink:discordlink,
          youtubelink:youtubelink,
          telelink:telelink,
          whatslink:whatslink,
          
        })
        }else{
          console.log('handleOnSNSlinks5')
            
          const updateRef = doc(firebaseApp,'mydata',currentaddocid);

            updateDoc(updateRef, {
              tweetlink:twitterlink,
              discordlink:discordlink,
              youtubelink:youtubelink,
              telelink:telelink,
              whatslink:whatslink,
            });
          

        }
        //router.reload()
        
    }



//const [authhistory, setauthHistory] = useState();

// async function handleOnMediumSubmit(e) {
//   e.preventDefault();

//   const endpoint = "https://api.rss2json.com/v1/api.json";
//   const feed_url = "https://medium.com/feed/@Nakithemagic";
  
//    // rss feed を取得
//   var res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`);
//   // text を json 化
//   var results = await res.json();

//   console.log(results.items);
  
//   setMedium(results.items);
// }

// async function handleOnMediumCard(e) {
//   e.preventDefault();

//   const endpoint = "https://api.rss2json.com/v1/api.json";
//   //const feed_url = "https://medium.com/feed/@Nakithemagic";
//   const feed_url = "https://medium.com/feed/@"+uname;
//   console.log(feed_url);
  
//    // rss feed を取得
//   var res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`);
//   // text を json 化
//   var results = await res.json();

//   console.log(results.items);
  
//   var title=results.items[0].title;//mcard.title
//   var details=results.items[0].content;

//   //console.log(results.items[0].title);
//   console.log(results.items[0].content);

//   let parser = new DOMParser();
//   let doc = parser.parseFromString(details, 'text/html');
//   var p_element = doc.querySelectorAll("p");

//   var detailnew="";

//   p_element.forEach(function(userItem) {
//       if(userItem.textContent !=undefined){
//          detailnew += userItem.textContent+'.'
//       }
//     });

//     console.log(detailnew);
//     details=detailnew;

//   //console.log(p_element.textContent);

//   if(title&&details){
//       fetch('http://localhost:8000/notes', {
//           method: 'POST',
//           headers: {"Content-type": "application/json"},
//           body: JSON.stringify({ title, details, category })
//         }).then(() => router.reload())//router.push("/edit")
      
//   }


// }

// async function handleOnTweetCard(e) {
//   e.preventDefault();

//   const endpoint = tid;

//   //const feed_url = "https://medium.com/feed/@"+uname;

//   // 区切り文字を「正規表現」で指定
//   var result = endpoint.split( '/');
//   var rnum=result.length;
//   console.log(rnum);

//   var fresult = result[rnum-1];

//   console.log(fresult);
//   var final=fresult.split('?');

//   console.log(final[0]);

//   setMytwt(final[0])

// }

//debank

async function handleOnDebankSubmit(e) {
  e.preventDefault();
  
  const res = await fetch('https://openapi.debank.com/v1/user/total_balance?id=0xa242fcb2acbb118ea1b6829efe8b7e2087b43986', {
      headers: {
          'accept': 'application/json'
      }
  });

  var results = await res.json();
  console.log(results.total_usd_value);
  
  setDebank(results.total_usd_value);
}

const handleClick = (e) => {
  e.preventDefault()
  
  console.log(auth.currentUser.email)
  console.log(ninja[0].mail)

  if(auth.currentUser.email==ninja[0].mail){
    console.log('Success!')
    router.push('/ID/'+ninja[0].userid+'/Edit')
  }

  //router.push('/ID/'+ninja[0].userid+'/edit')
}

// const handleClickcreate = (e) => {
//   e.preventDefault()
  
//   router.push('/Create')
// }

// const handleDelete=async(id)=>{
//   //   データベース側の削除
//   await fetch('http://localhost:8000/notes/'+id,{
//       method:'DELETE'
//   })

//   // stateで保存しているデータの編集
//   //ここでクリックしたid以外のものを取得
//   const newNotes=notes.filter(note => note.id != id )

//   setNotes(newNotes)
// }

  //ninja.forEach(function(userItem) {

async function handleOnAuth(e) {
  e.preventDefault();

  console.log('aiu')
  const email=umail
  const password=upass

  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    console.log('user created:',cred.user)
    setUmail('')
    setUpass('')
    
  })

}

async function handleOnAuthIn(e) {
  e.preventDefault();

  console.log('aiu')
  const email=umail
  const password=upass

  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    //console.log('user loged in:',cred.user)
    localStorage.setItem('authhistory',email)
    localStorage.setItem('authuserid',ninja[0].userid)

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
  signOut(auth)
  .then(()=>{
    //console.log('signed out')
  })


}

// onAuthStateChanged(auth,(user)=>{
//   console.log('user status changed:',user)
// })


  if(depo&&closeflag==false){setClose(true)}


  async function handleOnArraytest(e) {
    //document.addEventListener('touchstart', handler, {passive: true});
    e.preventDefault();
    
    console.log('handleOnArraytest')

    if(followers){
      followers.forEach(Item=> console.log(Item))
    }
  }

  async function handleOnArrayfollow(e) {
    //document.addEventListener('touchstart', handler, {passive: true});
    e.preventDefault();
    const authhistory= localStorage.getItem('authhistory')

    console.log('console.log(authhistory)')
    console.log(authhistory)

    if(localStorage.getItem('authhistory')){
  
    console.log(ninja[0].userid)

    const colRef= await collection(firebaseApp, "mydata")

    const q = await query(colRef,where("mail","==",authhistory))
    
    var getmyuserid=""
    var getmyusername=""
    var getdocid=""
    var getfollowing=""

    var getfollowersname=""
    var getfollowersdocid=""

    //authをもとにクリック主のデータベース情報の取得
    await getDocs(q)
    .then((snapshot)=>{

                snapshot.docs.forEach(doc => {
                  const data = doc.data()

                  if(data.userid&&data.mail&&data.following)
                  {
                    getmyuserid=data.userid
                    getmyusername=data.mail
                    getdocid = doc.id
                    getfollowing = data.following
                    console.log(getmyuserid)
                    console.log(getmyusername)
                    console.log(getdocid)
                    console.log(getfollowing)
                  }


                });
                
            }).then(()=>{
              console.log('get2')

          //自身のデータベースのfollowingにクリック先の[id]情報を登録
          const profileRef=doc(firebaseApp,'mydata',getdocid)
              updateDoc(profileRef, {
                following: arrayUnion(ninja[0].username)
              })
            }).then(()=>{
          //クリック主の情報をクリックされた側のデータベースのfollowersを含むドキュメントを取得
          //ページ表示者の情報はninjaにベースの情報が入っている
          console.log('get3')


          ninja.forEach(Item => {
            if(Item.followers){
              getfollowersdocid=Item.docid
              getfollowersname=Item.username
            }

          })

            }).then(()=>{
              console.log('get4')

              //相手のデータベースのfollowerにクリック主の[id]情報を登録
              const profileRef=doc(firebaseApp,'mydata',getfollowersdocid)
                  updateDoc(profileRef, {
                    followers: arrayUnion(getfollowersname)
                  })
                })
    }else{
      router.push("/login")
    }
      
  }

  const handleClickNFTImage = (e) => {
    if(nftlinkget){
      document.location.href = nftlinkget
      console.log('nftlinkget');
      console.log(nftlinkget);
    }
  }


  return (
    <Container >
      
    <Grid container spacing={3}>

      <Grid item xs={12} md={4} lg={3}>
      {storagelink ?
      <div>
      <img src={storagelink} alt="" width="250" height="250" onClick={handleClickNFTImage}/>
      </div>
      :
      <div>
      <img src="/noimage.jpg" alt="" width="200" height="250" onClick={handleClickNFTImage}/>
      </div>
      }

      {hash1get &&
      <div>
      <br />
      <Typography variant="h5" color="primary" onClick={()=>{document.location.href = custom1get}}>#{hash1get}</Typography>
      </div>
      }

      {hash2get &&
      <div>
      
      <Typography variant="h5" color="primary" onClick={()=>{document.location.href = custom2get}}>#{hash2get}</Typography>
      
      </div>}

      </Grid>

      <Grid item xs={12} md={8} lg={9}>
       <div>
        <Typography variant="h5" >
        Address: {address}
        </Typography>
      
       <br />
       
        <Typography variant="h5" >
        Name:{ninja[0].username}
        <br />
        <span onClick={handleOnArraytest}>followers:{followers?followers.length:"0"}</span> 
        &nbsp;
        <span>following:{following?following.length:"0"}</span>
        &nbsp;
        
        <Button variant="outlined" onClick={handleOnArrayfollow}>+ FOLLOW</Button>
        

        </Typography>
        
        <img src="/2021 Twitter logo - blue.png" alt="" width="30" height="27"className={classes.imagemargin} onClick={handleClickImagetw}/>
        <img src="/Discord-Logo-Color.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImageds}/>
        <img src="/youtube_social_square_white.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImageyt}/>
        <img src="/WhatsApp_Logo_2.png"  alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImagetl}/>
        <img src="/Logo.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImagewts}/>


        <br />

      </div>

     

      {idmailcheck&&
       <div>
      <Button variant="outlined" onClick={handleClick}>EDIT</Button>
      </div>
      }
      
      
      </Grid>

    <Grid item xs={12} md={12} lg={12}>
   
    
    <Typography variant="h4" component="h1" color='textSecondary' className={classes.titleback} gutterBottom>
         Notes
       
        {/* <AddCircleOutlineOutlinedIcon 
        className={classes.doright} 
        sx={{ fontSize: 35 }}　
        onClick={handleClick}
        />
         */}
       
    </Typography>
    
    </Grid>

    {ninja.map((item,index) => (
           <>
          {item.title &&
          <Grid item xs={12} md={6} lg={4} key={index}>
            <NoteCard note={item} 
            />
          </Grid>
          }
          </>
      
      ))}
     

    </Grid>
    <br /><br />

    <Typography variant="h4" component="h1" color='textSecondary'　gutterBottom>
              Debank
              </Typography> 

    {closeflag && (
             <div>
               <Deposits depo={depo}/>
              </div>)
               }


    <div className={classes.toolh}></div>

    <Grid item xs={12} md={12} lg={12} className={classes.balancer}>
      
        <Grid item xs={6} md={6} lg={6} >
       
            <Typography variant="h4" component="h1" color='textSecondary'　gutterBottom>
             Tweets
            </Typography> 


        {ninja.map((item,index) => (
            <div key={index} >
              {item.tweetId&&(
               <TwitterTweetEmbed
               tweetId={item.tweetId}
               />
              )}
            </div>
          
        ))}
           

        {/* Setting for Auth
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

          Logout
          <Box textAlign="center">
                  <Button
                      type="submit"
                      varient="contained"
                      onClick={handleOnAuthOut}
                      >
                      submit
                  </Button>
               </Box>
                */}
        </Grid>

       
        <Grid item xs={6} md={6} lg={6} >
        <Typography variant="h4" component="h1" color='textSecondary'　gutterBottom>
              Youtube
              </Typography> 
          
      
        {ninja.map((item,index) => (
            <div key={index} >
              {item.youtubeId&&(
                <div>

            {/* <iframe width="560" height="315"
             src={`https://www.youtube.com/embed/${item.youtubeId}`}
             title="YouTube video player" 
             frameBorder="0" 
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
             allowFullScreen>
            </iframe> */}

          <img src={`http://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`} alt="" width='100%' onClick={()=>{document.location.href = "https://www.youtube.com/watch?v="+item.youtubeId}}/>

          
              
              <Card variant="outlined"  sx={{height: 70}}  className={classes.cardmargin} >
              <CardContent>
                    <Typography variant='body2'color='textSecondary'>
                        
                    {item.ycomment}
                    </Typography>

                </CardContent>

              </Card> 
            

          </div>
              )}
            </div>
        ))}




        </Grid>

    </Grid>        
   
  </Container>
    
  );
}

export default Details;