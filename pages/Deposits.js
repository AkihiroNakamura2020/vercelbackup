import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { parseISO, format } from 'date-fns'
import { useState,useEffect } from "react"

import { useRouter } from 'next/router'


export default function Deposits({depo}) {

    const [mydebank, setDebank] = useState();
    //setDebank(myvalue);
    //console.log('1');
    //console.log('depo'+depo)
    const digit = 2;
    //const router = useRouter()

    useEffect(() => {
      //console.log('depo'+depo)
      if(depo!=undefined||depo!=null){
        //console.log('depo'+depo)

        fetch(
            //'https://openapi.debank.com/v1/user/total_balance?id=0xa242fcb2acbb118ea1b6829efe8b7e2087b43986', {
              'https://openapi.debank.com/v1/user/total_balance?id='+depo, {
                headers: 
                {
                    'accept': 'application/json'
                }
            })
          .then(res => res.json())
          //.then(()=>console.log('depo'+depo))
          //.then(results=>console.log('value'+results.total_usd_value))
          .then(results =>  setDebank((results.total_usd_value).toFixed(digit)))
          //.then(results =>  setDebank((results.total_usd_value)))
        }
      }, [])


    const fns = require('date-fns')
    //console.log(fns.format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"))
    const today=fns.format(new Date(), "yyyy-MM-dd")

    async function handlePagechange(e) {
      e.preventDefault();

      console.log('handlePagechange');
  
      if(depo){
        document.location.href = 'https://debank.com/profile/'+depo
      }
    
    }

  return (
    <Paper　onClick={handlePagechange}>
      <h1>Recent Deposits</h1>
      <Typography component="p" variant="h4">
       $ {mydebank}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {today}
      </Typography>
    </Paper>
  );
}

//    export async function getStaticProps() {
//     //export async function getServerSideProps() {

//         console.log('2');
       
//         const res = await fetch('https://openapi.debank.com/v1/user/total_balance?id=0xa242fcb2acbb118ea1b6829efe8b7e2087b43986', {
//                 headers: {
//                     'accept': 'application/json'
//                 }
//             });
        
//             var results = await res.json();
//             const myvalue= results.total_usd_value

    
//             console.log('hi,there');
//             console.log(myvalue);
      
//         return {
//           props: {
//             myvalue,
//           },
//         }
//       }
    