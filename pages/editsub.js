import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Create from '../../Create';
import Layout from '../../../components/layout';
import { useState,useEffect } from 'react';


import NoteCard from '../../../components/Notecard';
import { Grid } from '@mui/material';

import { makeStyles } from "@mui/styles"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import Medium from '../../../components/Medium';
import Debank from '../../../components/Debank';

import { TwitterTimelineEmbed,  TwitterTweetEmbed } from 'react-twitter-embed';


import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useRouter } from 'next/router'
import Deposits from '../../Deposits';

import { TextField } from "@mui/material"
import { Button } from '@mui/material';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export async function getStaticPaths() {
    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } }
      ],
      fallback: true // false or 'blocking'
    };
  }

export const getStaticProps = async (context) => {
    console.log('context')
    console.log(context)

    const id = context.params.id;
    const res = await fetch('http://localhost:8000/notes'+id);
    const data = await res.json();
  
    return {
      props: { data,id }
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


},{ name: "MuiExample_Component" })//)


export default function edit({data,id}) {//{id}
  const [notes,setNotes]=useState([])//([])
  
  const classes=useStyles()

  const [mymedium, setMedium] = useState();
  const [mydebank, setDebank] = useState();

  const [mcard, setMcard] = useState();
  const [uname,setUname]=useState('')

  const [tid,setTid]=useState('')
  const [mytwt, setMytwt] = useState();

  //const [title,setTitle]=useState('')
  //const [details,setDetails]=useState('')
  const [category, setCategory] = useState('Medium')

  const router = useRouter()
  //const { id } = router.query

//   useEffect(() => {
//     // fetch('http://localhost:8000/notes'+id)
//     //   .then(res => res.json())
//     //   .then(data => setNotes(data))
//     setNotes(data)
//   }, [])

//   if(notes != data){
//     setNotes(data)
//     //console.log("done")
//     //console.log(notes.address)
//   }


  //medium

  async function handleOnMediumSubmit(e) {
    e.preventDefault();

    const endpoint = "https://api.rss2json.com/v1/api.json";
    const feed_url = "https://medium.com/feed/@Nakithemagic";
    
     // rss feed を取得
    var res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`);
    // text を json 化
    var results = await res.json();

    console.log(results.items);
    
    setMedium(results.items);
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

    console.log(results.items);
    
    var title=results.items[0].title;//mcard.title
    var details=results.items[0].content;

    //console.log(results.items[0].title);
    console.log(results.items[0].content);

    let parser = new DOMParser();
    let doc = parser.parseFromString(details, 'text/html');
    var p_element = doc.querySelectorAll("p");

    var detailnew="";

    p_element.forEach(function(userItem) {
        if(userItem.textContent !=undefined){
           detailnew += userItem.textContent+'.'
        }
      });

      console.log(detailnew);
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
    var result = endpoint.split( '/');
    var rnum=result.length;
    console.log(rnum);

    var fresult = result[rnum-1];

    console.log(fresult);
    var final=fresult.split('?');

    console.log(final[0]);

    setMytwt(final[0])

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


  const handleClick = (e) => {
    e.preventDefault()
    
    router.push('/')
  }

  const handleClickcreate = (e) => {
    e.preventDefault()
    
    router.push('/Create')
  }

  const handleDelete=async(id)=>{
    //   データベース側の削除
    await fetch('http://localhost:8000/notes/'+id,{
        method:'DELETE'
    })

    // stateで保存しているデータの編集
    //ここでクリックしたid以外のものを取得
    const newNotes=notes.filter(note => note.id != id )

    setNotes(newNotes)
  }
  
  return (
     <Container >
      <Grid container spacing={3}>

      <Grid item xs={12} md={12} lg={12}>

      <div>
          <Typography variant="h5" >
          Address: {data[0].address}
          </Typography>
          <Typography variant="h6" >
          Following:{data[0].conection.Following}  Follower:{data[0].conection.Follower}  gifted:{data[0].conection.gifted}
          </Typography>
          <MailIcon /><InboxIcon />
          
        </div>
      
      <Typography variant="h4" component="h1" gutterBottom>
          Edit.js example
         
          {/* &emsp; */}
          <AddCircleOutlineOutlinedIcon 
          className={classes.doright} 
          sx={{ fontSize: 35 }}　
          onClick={handleClick}
          />
          
         
      </Typography>
      
      </Grid>
      

        {data.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            {/* <NoteCard note={note} handleDelete={handleDelete} /> */}
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
       

      </Grid>

      <Deposits />

       {/* note追記ページへ */}
       <Box textAlign="center">
            <div>
                <br/>
                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={handleClickcreate}
                />
           </div>
        </Box>

      <div className={classes.toolh}></div>

      <Grid item xs={12} md={12} lg={12} className={classes.balancer}>
        
          <Grid item xs={6} md={6} lg={6} >
         
              <Typography variant="h4" component="h1" gutterBottom>
              Edit.js example
              </Typography> 

              <TwitterTweetEmbed
                      // tweetId={item.id_str}
                      tweetId={'1501574706423808004'}
              />

          <form onSubmit={handleOnMediumSubmit}>
               

              <Medium mymedium={mymedium}/>
                
          </form>

          <form onSubmit={handleOnMediumCard}>
             <h2>Medium Card</h2>
             <button>Medium Card</button>
                   
          </form>

          <form onSubmit={handleOnDebankSubmit}>
            <Debank mydebank={mydebank} />
           
            
          </form>

          Medium Card
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

            </form>

        　Tweet Card
          <form noValidate autoComplete="off" onSubmit={handleOnTweetCard}>
                <TextField 
                onChange={(e)=>setTid(e.target.value)}
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

            </form>
            
            {mytwt && (
                <div>
                     <TwitterTweetEmbed
                      // tweetId={item.id_str}
                      tweetId={mytwt}
              />
                </div>
            )}
 
                 
          </Grid>

         
          <Grid item xs={6} md={6} lg={6} >
            
        
          {data.map(note => (
              <div key={note.id} className={classes.cardh}>
              <NoteCard note={note} handleDelete={handleDelete} />
              </div>
            
          ))}

          <Box textAlign="center">
            <div>
                <br/>
                <AddCircleOutlineOutlinedIcon 
                // className={classes.docenter} 
                sx={{ fontSize: 35 }}　
                onClick={handleClickcreate}
                />
           </div>
        </Box>

          </Grid>

      </Grid>        
     
    </Container>
  );
}
