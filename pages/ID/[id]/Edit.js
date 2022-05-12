import * as React from 'react';
import  { useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Create from '../../Create';
import Layout from '../../../components/layout';
import { useState,useEffect } from 'react';



import NoteCard from '../../../components/Notecard';
import { Grid } from '@mui/material';
import { Card } from '@mui/material';

import { makeStyles } from "@mui/styles"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

//import Medium from '../../../components/Medium';
import Medium from '../../Medium';

import Debank from '../../../components/Debank';

import { TwitterTimelineEmbed,  TwitterTweetEmbed } from 'react-twitter-embed';


import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useRouter } from 'next/router'
import Deposits from '../../Deposits';

import { TextField } from "@mui/material"
import { Button } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import firebaseApp from "../../../components/firebase"
import firebase from "../../../components/firebase2"
import { getStorage, ref,getDownloadURL,uploadBytes } from "firebase/storage";
import { doc, getFirestore } from "firebase/firestore"
import { collection, getDocs,getDoc, query, where,onSnapshot,orderBy,serverTimestamp,updateDoc,addDoc,deleteDoc,deleteField, arrayUnion, arrayRemove} from "firebase/firestore"
import {getAuth} from "firebase/auth"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
import { ConnectingAirportsOutlined, Title } from '@mui/icons-material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { CardContent } from '@mui/material';
import { route } from 'next/dist/server/router';

//受け取るcontextの内容を編集
export const getStaticPaths = async () => {

  let posts = []

    const colRef=await collection(firebaseApp, "mydata")


    await getDocs(colRef)
            .then((snapshot)=>{
                snapshot.docs.forEach(doc => {
                  posts.push(JSON.stringify(doc.data().userid))
                  
                });
                
            })//.then(()=>console.log(posts))

    
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
 
  let posts = []
 
  const id = parseInt(context.params.id)  

    const colRef= await collection(firebaseApp, "mydata")

    const q = await query(colRef,where("userid","==",id))
    
    await getDocs(q)
    .then((snapshot)=>{
    //await onSnapshot(q,(snapshot)=>{

                snapshot.docs.forEach(doc => {
                  const data = doc.data()
                  //console.log('data.title')
                  //console.log('doc.id',doc.id)
   
                  const pile={}
                  //条件式 ? trueの処理 : falseの処理
                  pile.title = data.title?data.title:null
                  pile.details = data.details?data.details:null
                  pile.userid = data.userid 
                  pile.username = data.username
                  pile.category = data.category?data.category:null
                  pile.tweetId = data.tweetId ?data.tweetId:null
                  pile.youtubeId = data.youtubeId ?data.youtubeId:null
                  pile.debankid = data.debankid ?data.debankid:null
                  pile.mediumid = data.mediumid ?data.mediumid:null
                  pile.address = data.address ?data.address:null
                  pile.id = data.id ?data.id:null
                  pile.docid = doc.id ?doc.id:null
                  pile.mail = data.mail ?data.mail:null
                  pile.cardorder = data.cardorder ?data.cardorder:null
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
            //console.log(posts)
    
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
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
},
imagemargin:{
  marginRight:10,
}, 
cardmargin:{
  'margin-left': '0%',
    width: "100%",
}


},{ name: "MuiExample_Component" })//)


export default function Edit({ ninja }) {//{id}

  //console.log('abc')
  //if(!ninja[0]) return null

  const router = useRouter()
  const firestorage = getStorage();
  const auth=getAuth()

  

  const popup = useRef(null)
  //const closeTooltip = () => useref.current.close();

  //console.log('auth.mail')
  //console.log(auth.currentUser)

  const [authhistory, setauthHistory] = useState();
  //setauthHistory(localStorage.getItem('authhistory'))

  useEffect(() => {
    console.log('aaa')
    console.log(localStorage.getItem('authhistory'))
    setauthHistory(localStorage.getItem('authhistory'))

    if (localStorage.getItem('authhistory')) {
      console.log('authhistory')

      if(localStorage.getItem('authhistory')!=ninja[0].mail){router.push('/ID/'+ninja[0].userid)}
    }else{router.push('/')}

  }, [])
  
  //const authhistory=localStorage.getItem(authhistory);
  

  // if(ninja[0].mail!=){

  // }

  const [image,setImage]=useState('')

  const colRef=collection(firebaseApp,'mydata')

  const [noimage,setnoImage]=useState(false)

//   if(!noimage){
//   //image表示
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

  //sns icon　追加

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

  const handleClickNFTImage = (e) => {
    if(nftlinkget){
      document.location.href = nftlinkget
      console.log('nftlinkget');
      console.log(nftlinkget);
    }
  }

  const handleClickImagetw = (e) => {
    if(twitterlink){
      document.location.href = twitterlink
      console.log('twitterlink');
      console.log(twitterlink);
    }
  }

  const handleClickImageds = (e) => {
    if(discordlink){
      document.location.href = discordlink
    }
  }

  const handleClickImageyt = (e) => {
    if(youtubelink){
      document.location.href = youtubelink
    }
  }

  const handleClickImagetl = (e) => {
    if(telelink){
      document.location.href = telelink
    }
  }

  const handleClickImagewts = (e) => {
    if(whatslink){
      document.location.href = whatslink
    }
  }


  const [notes,setNotes]=useState([])//([])  
  const classes=useStyles()

  const [mymedium, setMedium] = useState();
  const [mydebank, setDebank] = useState();

  const [mcard, setMcard] = useState();
  const [uname,setUname]=useState('')

  const [tid,setTid]=useState('')
  const [mytwt, setMytwt] = useState();

  const [category, setCategory] = useState('Medium')

  const [youid,setYid]=useState('')
  const [myyoutube, setMyyoutube] = useState();

  const [ycomment,setYcomment]=useState('')
  
  
  const [depo, setDepo] = useState();
  const [medi, setMedi] = useState();

  const [title,setTitle]=useState('')
  const [details,setDetails]=useState('')
  const [subcategory,setScategory]=useState('')
  const [openflag,setFlag]=useState(false)
  const [openflagd,setFlagd]=useState(false)
  const [openflagm,setFlagm]=useState(false)
  const [openflagy,setFlagy]=useState(false)

  const [addressflag,setAddress]=useState(false)
  const [newaddress,setNewaddress]=useState(false)

  const [closeflag,setClose]=useState(false)

  const [closeflagM,setCloseM]=useState(false)

  const [open, setOpen] = useState(false);
  const [openflagt,setFlagt]=useState(false)
  const [openeditflag,seteditFlag]=useState(false)

  const [flagdocid,setFD]=useState('')

  const [address,setaddress]=useState('')

  const [followers,setfollowers]=useState('')
  const [following,setfollowing]=useState('')

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

  const [storagelink, setstoragelink] = useState('')
  const [storagelinkdocid, setstoragelinkdocid] = useState('')

  console.log('000'+medi)


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
      console.log('0000'+medi)
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



  //medium

  async function handleOnMediumSubmit(e) {
    e.preventDefault();

    const endpoint = "https://api.rss2json.com/v1/api.json";
    const feed_url = "https://medium.com/feed/@Nakithemagic";
    
     // rss feed を取得
    var res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`);
    // text を json 化
    var results = await res.json();

    //console.log(results.items);
    
    //setMedium(results.items);
  }

  async function handleOnMediumCard(e) {
    e.preventDefault();

    const endpoint = "https://api.rss2json.com/v1/api.json";
    //const feed_url = "https://medium.com/feed/@Nakithemagic";
    const feed_url = "https://medium.com/feed/@"+uname;
    console.log(feed_url);
    
     // rss feed を取得
    var res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`);
    // text を json 化
    var results = await res.json();

    //console.log(results.items);
    
    var title=results.items[0].title;//mcard.title
    var details=results.items[0].content;

    //console.log(results.items[0].title);
    //console.log(results.items[0].content);

    let parser = new DOMParser();
    let doc = parser.parseFromString(details, 'text/html');
    var p_element = doc.querySelectorAll("p");

    var detailnew="";

    p_element.forEach(function(userItem) {
        if(userItem.textContent !=undefined){
           detailnew += userItem.textContent+'.'
        }
      });

      //console.log(detailnew);
      details=detailnew;

    //console.log(p_element.textContent);

    if(title&&details){
        fetch('http://localhost:8000/notes', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ title, details, category })
          }).then(() => router.reload())//router.push("/edit")
        
    }


  }



  async function handleOnTweetCard(e) {
    e.preventDefault();

    const endpoint = tid;

    //const feed_url = "https://medium.com/feed/@"+uname;

    // 区切り文字を「正規表現」で指定
    var result = endpoint.split('/');
    var rnum=result.length;
    console.log(rnum);

    var fresult = result[rnum-1];

    console.log(fresult);
    var final=fresult.split('?');

    console.log(final[0]);

    setMytwt(final[0])

    //ここまではtweeturlからのid抽出
    //ここからはfirestorageへの登録

    addDoc(colRef,{
            
      userid:ninja[0].userid,
      username:ninja[0].username,
      date:Date.now(),
      mail:ninja[0].mail,
      tweetId:final[0]
    })

    router.reload()

  }

  async function handleOnYoutubeCard(e) {
    e.preventDefault();
    console.log('handleOnYoutubeCard');

    const endpoint = youid;

    // 区切り文字を「正規表現」で指定
    var result = endpoint.split( '/');
    var rnum=result.length;
    console.log(rnum);

    //最後尾の塊を取得
    var fresult = result[rnum-1];

    console.log(fresult);
    var final=fresult.split('?');

    console.log('final[0]');
    console.log(final[0]);

    setMyyoutube(final[0])

    //ここまではtweeturlからのid抽出
    //ここからはfirestorageへの登録

    addDoc(colRef,{
            
      userid:ninja[0].userid,
      username:ninja[0].username,
      date:Date.now(),
      mail:ninja[0].mail,
      youtubeId:final[0],
      ycomment:ycomment
    })

    router.reload()

  }

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


  // const handleClick = (e) => {
  //   e.preventDefault()
    
  //   router.push('/')
  // }

  const handleClickcreate = (e) => {
    e.preventDefault()
    
    router.push('/Create')
  }

  const handleDelete=async(id)=>{
    //NoteCardの方でdoc.id取得ずみでその内容をidに格納ずみ

    //e.preventDefault()

    //console.log('Delete')
    //console.log(id)

    const docRef=doc(firebaseApp,"mydata",id.toString())
    //const docRef=doc(firebaseApp,"mydata",id)

    //console.log(docRef)

    deleteDoc(docRef).then(()=>{router.reload()})

  //   await updateDoc(docRef, {
  //     title: deleteField()
  // });
  
  

    // stateで保存しているデータの編集
    //ここでクリックしたid以外のものを取得
    // const newNotes=notes.filter(note => note.id != id )

    // setNotes(newNotes)
  }

  // const handleOrderchangeright=async(id)=>{
  //   //ninjaそのものがuserid制限がかかったもの
  //   //該当cardorderの取得したものがid,id+1
  //   const docRef = doc(firebaseApp,'mydata',id.toString());
  //   const docSnap = await getDoc(docRef);

  //   //console.log(docSnap.data());
  //   //console.log(docSnap.data().cardorder);

  //   const cordbase=docSnap.data().cardorder+1
  //   //console.log(cordbase);

  //   var target2=null

  //   //clickされた次のcordnumberのdocidの取得
  //   ninja.forEach(Item => {
  //     if(Item.cardorder ===cordbase){
  //       target2=Item.docid
  //       //console.log(target2);
  //     }
    
  //   });
  // }

  const handleflagchange=async(id)=>{

      seteditFlag(!openeditflag)

      ninja.forEach(Item => {
        if(Item.docid ===id){
          setTitle(Item.title)
          setDetails(Item.details)
          setCategory(Item.category)
          setFD(Item.docid.toString())
        }
      }
      );
      console.log('flagdocid')
      console.log(flagdocid)

  
  }

  async function handleOnNFTLink(e) {
    e.preventDefault();

    console.log('nftlinkget')
    console.log(nftlinkget)

    if(nftlinkget===null||nftlinkget==""){
      addDoc(colRef,{
     
        userid:ninja[0].userid,
        username:ninja[0].username,
        date:Date.now(),
        nftlink:nftlink
  
      }).then(()=>{
        setnftLink('')
      }).then(()=>{router.reload()})
  
    }else{

      const updateRef = doc(firebaseApp,'mydata',nftdocidget);
      console.log(nftdocidget+'nftdocidget')

      updateDoc(updateRef, {
        nftlink: nftlink
      }).then(()=>{
        setnftLink('')
      })
      .then(()=>{router.reload()})

    }
    
  }

  async function handleOnNFTCustomLink1(e) {
    e.preventDefault();

    console.log('custom1get')
    console.log(custom1get)

    console.log('hash1get')
    console.log(hash1get)

    if(custom1get==''&&hash1get==''){
      console.log('addDoc')

      addDoc(colRef,{
     
        userid:ninja[0].userid,
        username:ninja[0].username,
        date:Date.now(),
        mail:ninja[0].mail,
        customlink1:customlink1,
        customhash1:customhash1
  
      }).then(()=>{
        setcustomLink1('')
        setcustomhash1('')
      }).then(()=>{router.reload()})
  
    }else{
      console.log('updat')

      const updateRef = doc(firebaseApp,'mydata',customdocid1);
      console.log(customdocid1+'customdocid1')

      updateDoc(updateRef, {
        customlink1:customlink1,
        customhash1:customhash1
      }).then(()=>{
        setcustomLink1('')
        setcustomhash1('')
      })
      .then(()=>{router.reload()})

    }
    
  }

  async function handleOnNFTCustomLink2(e) {
    e.preventDefault();

    console.log('custom2get')
    console.log(custom2get)

    console.log('hash2get')
    console.log(hash2get)

    if(custom2get==''&&hash2get==''){
      addDoc(colRef,{
     
        userid:ninja[0].userid,
        username:ninja[0].username,
        mail:ninja[0].mail,
        date:Date.now(),
        customlink2:customlink2,
        customhash2:customhash2
  
      }).then(()=>{
        setcustomLink2('')
        setcustomhash2('')
      }).then(()=>{router.reload()})
  
    }else{

      const updateRef = doc(firebaseApp,'mydata',customdocid2);
      console.log(customdocid2+'customdocid2')

      updateDoc(updateRef, {
        customlink2:customlink2,
        customhash2:customhash2
      }).then(()=>{
        setcustomLink2('')
        setcustomhash2('')
      })
      .then(()=>{router.reload()})

    }
    
  }



  async function handleOnAddcontents(e) {
    e.preventDefault();
  
    console.log('add contents')
  
    addDoc(colRef,{
      title:title,
      details:details,
      category:subcategory,
      userid:ninja[0].userid,
      username:ninja[0].username,
      date:Date.now(),
      mail:ninja[0].mail

    }).then(()=>{
      setTitle('')
      setDetails('')
      setScategory('')
    }).then(()=>{router.reload()})
  
  }

  async function handleOnEditcontents(e) {
    e.preventDefault();
  
    console.log('Edit contents')
    console.log(flagdocid)

    const updateRef = doc(firebaseApp,'mydata',flagdocid);

      updateDoc(updateRef, {
      title:title,
      details:details,
      category:category,
      date:Date.now(),
      })
  
    // addDoc(colRef,{
    //   title:title,
    //   details:details,
    //   category:subcategory,
    //   userid:ninja[0].userid,
    //   username:ninja[0].username,
    //   date:Date.now(),
    //   mail:ninja[0].mail

    // })
    .then(()=>{
      setTitle('')
      setDetails('')
      setCategory('')
    }).then(()=>{router.reload()})
  
  }

  async function handleOnDebank(e) {
    e.preventDefault();
  
    console.log('handleOnDebank')

   var currentdid=null;
   var currentdocid=null;

    ninja.forEach((element) =>
     {
       if(element.debankid!=null){
          currentdid=element.debankid
          currentdocid=element.docid
       }
      })
      
          if(currentdid===null){
            console.log('aaa')


            addDoc(colRef,{
            
            userid:ninja[0].userid,
            username:ninja[0].username,
            date:Date.now(),
            mail:ninja[0].mail,
            debankid:mydebank
          })
          }else{
            console.log('bbb')
            console.log(currentdid)
              
            const updateRef = doc(firebaseApp,'mydata',currentdocid);
            console.log('currentdocid')
            console.log(currentdocid)

              updateDoc(updateRef, {
                debankid: mydebank
              });
            

          }
          router.reload()
          
      }

  async function handleOnNewaddress(e) {
    e.preventDefault();
  
    console.log('handleOnNewaddress')

    var currentad=null;
    var currentaddocid=null;

    ninja.forEach((element) =>
      {
        if(element.address!=null){
          currentad=element.address
          currentaddocid=element.docid
        }
      })
      
          if(currentad===null){

            addDoc(colRef,{
            
            userid:ninja[0].userid,
            username:ninja[0].username,
            date:Date.now(),
            mail:ninja[0].mail,
            address:newaddress
          })
          }else{
              
            const updateRef = doc(firebaseApp,'mydata',currentaddocid);

              updateDoc(updateRef, {
                address: newaddress
              });
            

          }
          router.reload()
          
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
    
    
  
  async function handleOnMedium(e) {
    e.preventDefault();
  
    console.log('handleOnMedium')

    var currentmid=null;
    var currentmdocid=null;

    ninja.forEach((element) =>
      {
        if(element.mediumid!=null){
          currentmid=element.mediumid
          currentmdocid=element.docid
        }
      })
      
          if(currentmid===null){
            console.log('aaa')


            addDoc(colRef,{
            
            userid:ninja[0].userid,
            username:ninja[0].username,
            date:Date.now(),
            mail:ninja[0].mail,
            mediumid:mymedium
          })
          }else{
            console.log('bbb')
              
            const updateRef = doc(firebaseApp,'mydata',currentmdocid);
            console.log('currentdocid')

              updateDoc(updateRef, {
                mediumid: mymedium
              });
            

          }
          router.reload()
          
      }
      
      //).then(()=>{router.reload()}
      
  
    // addDoc(colRef,{
    //   title:title,
    //   details:details,
    //   category:subcategory,
    //   userid:ninja[0].userid,
    //   username:ninja[0].username,
    //   date:Date.now(),
    //   mail:ninja[0].mail

    // }).then(()=>{
    //   setTitle('')
    //   setDetails('')
    //   setScategory('')
    // }).then(()=>{router.reload()})


  if(depo&&closeflag==false){setClose(true)}

  //if(medi&&closeflag==false){setClose(true)}

  async function handleOnDebankdelete(e) {
    e.preventDefault();
  
    console.log('Debankdelete')

   var currentdid=null;
   var currentdocid=null;

   ninja.forEach((element) =>
     {
       if(element.debankid!=null){
          currentdid=element.debankid
          currentdocid=element.docid
       }
      })


    if(currentdid===null){
      console.log('aaa')
      
    }else{
      console.log('bbb')
      console.log(currentdid)

      const docRefd=doc(firebaseApp,"mydata",currentdocid)
      updateDoc(docRefd,{
        debankid: deleteField()
      }).then(()=>{router.reload()})
          
      }
    }

    async function handleOnMediumdelete(e) {
      e.preventDefault();
    
      console.log('Mediumdelete')
  
     var currentmid=null;
     var currentdocmid=null;
  
     ninja.forEach((element) =>
       {
         if(element.mediumid!=null){
            currentmid=element.mediumid
            currentdocmid=element.docid
         }
        })
  
  
      if(currentmid===null){
        console.log('aaa')
        
      }else{
        console.log('bbb')
        console.log(currentmid)
  
        const docRefd=doc(firebaseApp,"mydata",currentdocmid)
        updateDoc(docRefd,{
          mediumid: deleteField()
        }).then(()=>{router.reload()})
            
        }
      }

    const handleDeleteTweet=async(id)=>{

      console.log(id)
   
      const docRef=doc(firebaseApp,"mydata",id.toString())
     
      deleteDoc(docRef).then(()=>{router.reload()})
  
    }
    const handleDeleteYoutube=async(id)=>{

      console.log(id)
   
      const docRef=doc(firebaseApp,"mydata",id.toString())
     
      deleteDoc(docRef).then(()=>{router.reload()})
  
    }


    let ninjav = ninja.sort(function(a, b) {
      return (a.cardorder < b.cardorder) ? -1 : 1;  //オブジェクトの昇順ソート
      //return (a.cardorder > b.cardorder) ? -1 : 1;  //オブジェクトの降順ソート
    });
    //console.log(ninjav);


    async function handleOnArraytest(e) {
    
      console.log('handleOnArraytest')

      if(followers){
        followers.forEach(Item=> console.log(Item))
      }
    }

    async function handleOnArrayfollow(e) {
    
      console.log(authhistory)
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
        
    }

    //nft画像選択
    const handlenftChange = e => {
      setnftImage(e.target.files[0])
    }

    const handlenftSubmit = e => {
      e.preventDefault()
    
      console.log(nftimage.name)

      try {
        const imageRef = ref(firestorage, ninja[0].userid+'/'+'image.jpg')
        console.log(imageRef)

        uploadBytes(imageRef, nftimage).then(() => {
          console.log("Uploaded a file!")
          //router.reload()
        }).then(() => {
          console.log("Get storageurl!")
          getDownloadURL(imageRef)
          .then(url => {
              //setImage(url)
              //データベースにstoragelinkがあるか確認
              if(storagelink===null||storagelink==''){
                console.log('aaa')
  
                addDoc(colRef,{
                
                userid:ninja[0].userid,
                username:ninja[0].username,
                date:Date.now(),
                mail:ninja[0].mail,
                storagelink:url
              })
              }else{
                console.log('bbb')
                  
                const updateRef = doc(firebaseApp,'mydata',storagelinkdocid);
                console.log('currentdocid')
    
                  updateDoc(updateRef, {
                    storagelink: url
                  });
                  
              }
              router.reload()
              
          })
        })

      } catch (err) {
        console.log(err)
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
     
      <br />
        Set My Avatar
        <form onSubmit={handlenftSubmit}>
          <input type="file" 　onChange={handlenftChange} />
          <button className="button">Send</button>
        </form>
        <br />
        Set Avatar clickable Link
        <form noValidate autoComplete="off" onSubmit={handleOnNFTLink}>
              
              <TextField 
              onChange={(e)=>setnftLink(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue='NFT Link ex.Oncyber'
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

          <br />
        Set Custom Link 1
        <form noValidate autoComplete="off" onSubmit={handleOnNFTCustomLink1}>
        <Typography variant="h5" color="primary" onClick={()=>{document.location.href = custom1get}}>#{hash1get}</Typography>
              <TextField 
              onChange={(e)=>setcustomhash1(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue='Custom Hash'
              fullWidth
              required
              />

              <TextField 
              onChange={(e)=>setcustomLink1(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue='Custom Link'
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

          <br />
        Set Custom Link 2
        <form noValidate autoComplete="off" onSubmit={handleOnNFTCustomLink2}>
        <Typography variant="h5" color="primary" onClick={()=>{document.location.href = custom2get}}>#{hash2get}</Typography>
              <TextField 
              onChange={(e)=>setcustomhash2(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue='Custom Hash'
              fullWidth
              required
              />

              <TextField 
              onChange={(e)=>setcustomLink2(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue='Custom Link'
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

      </Grid>

      <Grid item xs={12} md={8} lg={9}>
       <div>
        <Typography variant="h5" >
        {/* Address: {data[0].address} */}
        Address: {address}<EditOutlinedIcon onClick={()=>{setAddress(!addressflag)}}/>
        </Typography>

        {addressflag && (
             <div>
           address 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnNewaddress}>
              
              <TextField 
              onChange={(e)=>setNewaddress(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={address}
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
          

      
       <br />
       
        <Typography variant="h5" >
        {/* Following:{data[0].conection.Following}  Follower:{data[0].conection.Follower}  gifted:{data[0].conection.gifted} */}
        Name:{ninja[0].username}
        <br />
        <span onClick={handleOnArraytest}>followers:{followers?followers.length:"0"}</span> 
        &nbsp;
        <span>following:{following?following.length:"0"}</span>
        &nbsp;
        <Button variant="outlined" onClick={handleOnArrayfollow}>+ FOLLOW</Button>

        </Typography>
    


        {/* <MailIcon className={classes.imagemargin} /> */}
        <img src="/2021 Twitter logo - blue.png" alt="" width="30" height="27"className={classes.imagemargin} onClick={handleClickImagetw}/>
        <img src="/Discord-Logo-Color.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImageds}/>
        <img src="/youtube_social_square_white.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImageyt}/>
        <img src="/WhatsApp_Logo_2.png"  alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImagetl}/>
        <img src="/Logo.png" alt="" width="30" height="30" className={classes.imagemargin} onClick={handleClickImagewts}/>

        <br />

        <div>
           SNS link 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnSNSlinks}>
           twitter 登録・更新
              <TextField 
              onChange={(e)=>setLinktw(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={twitterlink}
              fullWidth
              required
              />
            discord 登録・更新
            <TextField 
              onChange={(e)=>setLinkds(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={discordlink}
              fullWidth
              required
              />
            youtube 登録・更新
            <TextField 
              onChange={(e)=>setLinkyt(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={youtubelink}
              fullWidth
              required
              />
            teleglam 登録・更新
            <TextField 
              onChange={(e)=>setLinktl(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={telelink}
              fullWidth
              required
              />

            whatsapp 登録・更新
            <TextField 
              onChange={(e)=>setLinkwts(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={whatslink}
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
        
      </div>
      </Grid>

      <Grid item xs={12} md={12} lg={12}> 
      
      <Typography variant="h4" component="h1" gutterBottom>
          Main contents
         
          {/* &emsp; */}
          {/* <AddCircleOutlineOutlinedIcon 
          className={classes.doright} 
          sx={{ fontSize: 35 }}　
          onClick={handleClick}
          /> */}
          
         
      </Typography>
      
      </Grid>
        
         {ninja.map((item,index) => (
           <>
          {item.title &&
          <Grid item xs={12} md={6} lg={4} key={index}>
            <NoteCard note={item} handleDelete={handleDelete} 
              handleflagchange={handleflagchange}
            />
          </Grid>
          }
          </>
      
      ))}

     
      </Grid>

       {/* note追記ページへ */}
       <Box >
            <div>
            <br />
              Click the button to Add notes
              <br/>
                <br/>
                <Box textAlign="center">
                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={()=>{setFlag(!openflag)}}
                />
                </Box>
           </div>

           {openflag && (
             <div>
           Add contents
          <form noValidate autoComplete="off" onSubmit={handleOnAddcontents}>
              Title
              <TextField 
              onChange={(e)=>setTitle(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
              Details
              <TextField 
              onChange={(e)=>setDetails(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />

              category
              <TextField 
              onChange={(e)=>setScategory(e.target.value)}
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
 
        </Box>

         {/* noteeditページへ */}
       <Box >


           {openeditflag && (
             <div>
           Edit contents
          <form noValidate autoComplete="off" onSubmit={handleOnEditcontents}>
              Title
              <TextField 
              onChange={(e)=>setTitle(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={title}
              fullWidth
              required
              />
              details
              <TextField 
              onChange={(e)=>setDetails(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={details}
              fullWidth
              required
              />

              category
              <TextField 
              onChange={(e)=>setCategory(e.target.value)}
              variant="outlined"
              color="secondary"
              defaultValue={category}
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
 
        </Box>

        
        {closeflag && (
             <div>
               <Deposits depo={depo}/>
              </div>)
               }

        {/* <Deposits depo={depo}/> */}
     
        {/* debankid登録ページへ */}
        <Box >
            <div>
            <br />
            Click the button to Add or remove bankid
                <br/><br/>
                <Box textAlign="center">
                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={()=>{setFlagd(!openflagd)}}
                />
                </Box>
           </div>

           {openflagd && (
             <div>
           Debank id 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnDebank}>
              
              <TextField 
              onChange={(e)=>setDebank(e.target.value)}
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

          {/* DebankID削除
          <Box textAlign="center">
                  <Button
                      type="submit"
                      varient="contained"
                      onClick={handleOnDebankdelete}
                      >
                      Delete
                  </Button>
          </Box> */}

          <br/>
          <Box textAlign="center">
            DebankID削除
            <Popup ref={popup}　trigger={
            // <button> Click to open popup </button>
            <Button
                      type="submit"
                      varient="contained"
                      >
                      Delete
                  </Button>
          } 
            position="right center">
              <div>本当にDebankIDを削除しても問題ないですか?</div>
             
              <Button
                      type="submit"
                      varient="contained"
                      onClick={handleOnDebankdelete}
                      >
                      YES
                  </Button>
                  <Button
                      type="submit"
                      varient="contained"
                      //onClick={() => console.log(popup.current)}
                      onClick={() => popup.current.close()}
                      >
                      NO
                  </Button>
            </Popup>
          </Box>


          </div>
          )}
 
        </Box>

        {medi!=undefined && (
           <div>
             <Grid item xs={12} md={6} lg={4} >
               <Medium medi={medi} />
             </Grid>
            </div>
        )}
              

         {/* mediumid登録ページへ */}
         <Box >
            <div>
            <br />
            Click the button to Add or remove mediumid
                <br/><br/>
                <Box textAlign="center">
                <AddCircleOutlineOutlinedIcon 
                //className={classes.docenter}
                 
                sx={{ fontSize: 35 }}　
                onClick={()=>{setFlagm(!openflagm)}}
                />
                </Box>
           </div>

           {openflagm && (
             <div>
           Medium id 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnMedium}>
              
              <TextField 
              onChange={(e)=>setMedium(e.target.value)}
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
          
          <div>
            <h4>MediumID削除</h4>
            <Popup ref={popup}　trigger={
            <Button
                      type="submit"
                      varient="contained"
                      >
                      Delete
                  </Button>
          } 
            position="right center">
              <div>本当にMediumIDを削除しても問題ないですか?</div>
             
              <Button
                      type="submit"
                      varient="contained"
                      onClick={handleOnMediumdelete}
                      >
                      YES
                  </Button>
                  <Button
                      type="submit"
                      varient="contained"
                      //onClick={() => console.log(popup.current)}
                      onClick={() => popup.current.close()}
                      >
                      NO
                  </Button>
            </Popup>
          </div>

          </div>
          )}
 
        </Box>

      <div className={classes.toolh}></div>

      <Grid item xs={12} md={12} lg={12} className={classes.balancer}>
        
          <Grid item xs={6} md={6} lg={6} >
         
              <Typography variant="h4" component="h1" gutterBottom>
              Sub contents1
              </Typography> 

              {ninja.map((item,index) => (
            <div key={index} >
              {item.tweetId&&(
                <div>

               <TwitterTweetEmbed
               tweetId={item.tweetId}
               />

               {/* 削除ボタンの同時生成 */}
               
            <Popup ref={popup}　trigger={
                   <Button
                      type="submit"
                      varient="contained"
                      >
                      Delete
                  </Button>
          } 
            position="right center">
              <div>本当にこのtweetを削除しても問題ないですか?</div>
             
              <Button
                      type="submit"
                      varient="contained"
                      onClick={()=>handleDeleteTweet(item.docid)}
                      >
                      YES
                  </Button>
                  <Button
                      type="submit"
                      varient="contained"
                      //onClick={() => console.log(popup.current)}
                      onClick={() => popup.current.close()}
                      >
                      NO
                  </Button>
            </Popup>
          </div>


              )}
            </div>
          
        ))}

                {/* twitterid登録 */}
                <Box>
            <div>
            <br />
            Click the button to Add tweet
            <br/><br/>

                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={()=>{setFlagt(!openflagt)}}
                />
           </div>

           {openflagt && (
             <div>
           Twitter id 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnTweetCard}>
              
              <TextField 
              onChange={(e)=>setTid(e.target.value)}
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

          
          {/* <div>
            <h4>twitterID削除</h4>
            <Popup ref={popup}　trigger={
            // <button> Click to open popup </button>
            <Button
                      type="submit"
                      varient="contained"
                      >
                      Delete
                  </Button>
          } 
            position="right center">
              <div>本当にこのtweetを削除しても問題ないですか?</div>
             
              <Button
                      type="submit"
                      varient="contained"
                      onClick={(handleOnDebankdelete)}
                      >
                      YES
                  </Button>
                  <Button
                      type="submit"
                      varient="contained"
                      //onClick={() => console.log(popup.current)}
                      onClick={() => popup.current.close()}
                      >
                      NO
                  </Button>
            </Popup>
          </div> */}

          </div>
          )}
 
        </Box>


          {/* <form onSubmit={handleOnMediumSubmit}>
               

              <Medium mymedium={mymedium}/>
                
          </form> */}

          {/* <form onSubmit={handleOnMediumCard}>
             <h2>Medium Card</h2>
             <button>Medium Card</button>
                   
          </form> */}

          {/* <form onSubmit={handleOnDebankSubmit}>
            <Debank mydebank={mydebank} />
           
            
          </form> */}

          {/* Medium Card
          <form noValidate autoComplete="off" onSubmit={handleOnMediumCard}>
                <TextField 
                onChange={(e)=>setUname(e.target.value)}
                //className={classes.field}
                //label="Note Title"
                variant="outlined"
                color="secondary"
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

            </form> */}
            
                 
          </Grid>

         
          <Grid item xs={6} md={6} lg={6} >
          <Typography variant="h4" component="h1" gutterBottom>
          Sub contents2
              </Typography> 
{/*           
              <Box >
                <div>
                <br />
                Click the button to Add youtube
                <br/><br/>
                
                    <AddCircleOutlineOutlinedIcon 
                     
                    sx={{ fontSize: 35 }}　
                    onClick={()=>{setFlagy(!openflagy)}}
                    />
                    
              </div>

           {openflagy && (
             <div>
           youtube 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnYoutubeCard}>
              
              <TextField 
              onChange={(e)=>setYid(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
            動画説明欄
            <TextField 
              onChange={(e)=>setYcomment(e.target.value)}
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
          </Box> */}

          {/* youtube表示箇所 */}

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

            {item.ycomment && (
            <Card variant="outlined"  sx={{height: 70}}  className={classes.cardmargin} gutterBottom>
              <CardContent>
                    <Typography variant='body2'color='textSecondary'>
                        
                    {item.ycomment}
                    </Typography>

                </CardContent>

              </Card>
            )} 

               {/* 削除ボタンの同時生成 */}
               
            <Popup ref={popup}　trigger={
                   <Button
                      type="submit"
                      varient="contained"
                      >
                      Delete
                  </Button>
          } 
            position="right center">
              <div>本当にこのyoutubeを削除しても問題ないですか?</div>
             
              <Button
                      type="submit"
                      varient="contained"
                      onClick={()=>handleDeleteYoutube(item.docid)}
                      >
                      YES
                  </Button>
                  <Button
                      type="submit"
                      varient="contained"
                      //onClick={() => console.log(popup.current)}
                      onClick={() => popup.current.close()}
                      >
                      NO
                  </Button>
            </Popup>
          </div>
              )}

            </div>
        ))
        }
           <Box >
                <div>
                <br />
                Click the button to Add youtube
                <br/><br/>
                
                    <AddCircleOutlineOutlinedIcon 
                     
                    sx={{ fontSize: 35 }}　
                    onClick={()=>{setFlagy(!openflagy)}}
                    />
                    
              </div>

           {openflagy && (
             <div>
           youtube 登録・更新
          <form noValidate autoComplete="off" onSubmit={handleOnYoutubeCard}>
              
              <TextField 
              onChange={(e)=>setYid(e.target.value)}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              />
            動画説明欄
            <TextField 
              onChange={(e)=>setYcomment(e.target.value)}
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
          </Box>

{/*         
          {ninja.map((item,index) => (
            <div key={index} className={classes.cardh}>
            <NoteCard note={item}  />
            </div>
          
        ))} */}

          {/* <Box textAlign="center">
            <div>
                <br/>
                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={handleClickcreate}
                />
           </div>
        </Box> */}
       

          </Grid>

      </Grid>        
     
    </Container>
  );
}
