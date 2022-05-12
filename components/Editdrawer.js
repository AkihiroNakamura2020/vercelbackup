import React from "react";

import { Button, Container, Typography } from "@mui/material"
import HailIcon from '@mui/icons-material/Hail'
import { makeStyles } from "@mui/styles"

import { useState,useEffect } from "react"

import { Drawer } from "@mui/material"

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import { useRouter } from 'next/router'


import List from '@mui/material/List';
import { typography } from "@mui/system";

const Editdrawer = () => {
    //const [myarray,setArray]=useState(['Inbox', 'Starred', 'Send email', 'Drafts'])
    const [myarray,setArray]=useState(['Home', 'MyPage'])
    //const [mydebank, setDebank] = useState();
    const router = useRouter()


const handlePagechange =(text)=> {
    console.log(text);

    if(text==='Home'){
        router.push("/")
    }

    if(text==='MyPage'){
        const myid=localStorage.getItem('authuserid')
        console.log(myid)
        if(myid){
            router.push("/ID/"+myid)
        }else{
            router.push("/login")
        }

    }
  
  }

    return ( 
        <div>
            <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
                {myarray.map((text, index) => (
                <ListItem button key={text} onClick={()=>handlePagechange(text)}>
                <ListItemIcon>
                    {index % 2 === 0 ? 
                    <HomeOutlinedIcon /> :
                     <MyLocationOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>

        {/* <form onSubmit={handleOnDebankSubmit}>
            <h2>Debank</h2>
            <button>Debank get</button>
            <h6>{mydebank}</h6>
        </form> */}

        </div>

     );
}
 

//    //export async function getStaticProps() {
//    export async function getServerSideProps() {

//     console.log('hi');
   
//     const res = await fetch('https://openapi.debank.com/v1/user/total_balance?id=0xa242fcb2acbb118ea1b6829efe8b7e2087b43986', {
//             headers: {
//                 'accept': 'application/json'
//             }
//         });
    
//         var results = await res.json();
//         const myvalue= results.total_usd_value

//         setDebank(myvalue);
//         myarray.push(myvalue);

//         console.log('hi,there');
  
//     return {
//       props: {
//         myvalue,
//       },
//     }
//   }
  
  export default Editdrawer;
