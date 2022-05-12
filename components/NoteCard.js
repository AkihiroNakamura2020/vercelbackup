import * as React from 'react';

import { Card, IconButton, Typography } from '@mui/material';
import { CardHeader,CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import { Button } from '@mui/material';

import { makeStyles } from "@mui/styles"

const useStyles=makeStyles({
   
    rightarrow:{
        
        float: 'right'
    },
    leftarrow:{
        //float: 'right'
        //flexGrow:1//可能な限りの幅を取る
    },
    // contents:{
    //     //width:`calc(100% - ${drawerWidth}px)`,
    //     textAlign: 'right',
    //     align: 'right',
    //     position: 'relative',
        
    // }

},{ name: "MuiExample_Component" })


const NoteCard = ({note,handleDelete,handleflagchange}) => {
    //console.log('NoteCard')
    const classes=useStyles()

    return (
        <div>

            <Card elevation={3}>

            {/* <CardHeader 

            action={
                    <IconButton onClick={()=>handleDelete(note.id)}>
                        <DeleteOutlined />                        
                    </IconButton>
                }     
                title={note.title}
                subheader={note.category}
                /> */}
                
                {/* editの場合のみに表示 */}
                {handleDelete 
                    ? 

                     <CardHeader 
                     
                        action={
                            
                         <IconButton onClick={()=>handleDelete(note.docid)}>
                        {/* <IconButton  onClick={()=>console.log('hi1'+note.id)}> */}
                            <DeleteOutlined />                        
                        </IconButton>
                        }     
                        title={note.title}
                        subheader={note.category}
                        
                    />                   
                    : 
                    <CardHeader 
                                    title={note.title}
                                    subheader={note.category}
                    />
                }


                <CardContent>
                    <Typography variant='body2'color='textSecondary'>
                        
                        {note.details}
                    </Typography>

                </CardContent>

                {handleDelete 
                    ? 
                <CardActions>
               
                    {/* <Button 　onClick={()=>handleOrderchangeright(note.docid)}><ArrowForwardIosOutlinedIcon  /></Button> */}
                    <Button onClick={()=>handleflagchange(note.docid)} size="small">edit</Button>
                    
                </CardActions>
                :
                <div></div>
            }

                
                
            </Card>

        </div>
      );
}
 
export default NoteCard;