import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { parseISO, format } from 'date-fns'
import { useState,useEffect } from "react"

import { Link as MuiLink } from '@material-ui/core'

import { Card, IconButton} from '@mui/material';
import { CardHeader,CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'
import { ConnectingAirportsOutlined } from '@mui/icons-material';

export default function Medium({medi}) {

    const [mymedium, setMedium] = useState();
    //const [data, setdata] = useState();
    let data = []
    var details

    console.log('123')
    console.log(medi)
    console.log(mymedium)
    //if(!mymedium===undefined&&!mymedium===null){
    if(mymedium){
        for(var i=0; i <= mymedium.items.length-1; i++){
            console.log(i)
            console.log(mymedium.items[i].title)
            data.push(mymedium.items[i])
        }
    }

    if(data[0]){

      details=data[0].content;

      let parser = new DOMParser();
      let doc = parser.parseFromString(details, 'text/html');
      var p_element = doc.querySelectorAll("p");
  
      var detailnew="";
  
      p_element.forEach(function(userItem) {
          if(userItem.textContent !=undefined){
             detailnew += userItem.textContent+'.'
          }
        });
  
        details=detailnew;
  
    }


    
    useEffect(() => {
      console.log('abc')
      console.log(medi)
      
      if(medi!=undefined||medi!=null){
        const feed_url = "https://medium.com/feed/@"+medi;
        console.log(feed_url)

        fetch(
              'https://api.rss2json.com/v1/api.json?rss_url='+feed_url, {
              //`https://api.rss2json.com/v1/api.json?rss_url=${feed_url}`, {
                headers: 
                {
                    'accept': 'application/json'
                }
            })
          .then(res => res.json())
          // .then(results =>  {
          //   if( !results.ok ) {
          //     console.log(results.status) 
          //     console.log(results.statusText)
          //   }
          //   if (results.ok) {
          //     setMedium(results)
          // }}
          //   )
           .then(results =>  console.log(results))
          //.then(results =>  setMedium(results))
          
        }
      }, [])



  return (
      <div>
          <h1>Medium</h1> 
          
           {data.map((item,index) => (
           
           <Card key={index}　elevation={3}>

           <CardHeader 
              title={item.title}
              subheader={item.author}
          />

          <CardContent>
            <Typography variant='h5'color='textSecondary'>
                {details}
            </Typography>

          <MuiLink href={item.link} target="_blank" variant="h6"　rel="noopener noreferrer">Go to My Medium</MuiLink>
          </CardContent>

          {/* <div>
          <MuiLink href={item.link} target="_blank" rel="noopener noreferrer">More</MuiLink>
          </div> */}

          {/* </Paper> */}
        　
          
          </Card>
      
      ))}

    </div>
  );
}
