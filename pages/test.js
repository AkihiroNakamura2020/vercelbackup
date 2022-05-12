import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { Button, Container, Typography } from "@mui/material"
import HailIcon from '@mui/icons-material/Hail'
import { makeStyles } from "@mui/styles"

import { TextField } from "@mui/material"
import { useState } from "react"

import { Drawer } from "@mui/material"

import { AppBar } from "@mui/material"
import { Toolbar } from "@mui/material"

const drawerWidth=240

const useStyles=makeStyles({
    field:{
        marginTop:20,
        marginBottom:20,
        display:'block',
    },
    page:{
        background:'#f9f9f9',
        width:'100%'

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

},{ name: "MuiExample_Component" })

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        border: '1px solid',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

// Item.propTypes = {
//   sx: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
//     ),
//     PropTypes.func,
//     PropTypes.object,
//   ]),
// };

export default function FlexGrow() {
    const classes=useStyles()

    const [title,setTitle]=useState('')
    const [details,setDetails]=useState('')
    const [titleError,setTitleError]=useState(false)
    const [detailsError,setDetailsError]=useState(false)


    const handleSubmit=(e)=>{
        e.preventDefault()
        setDetailsError(false)
        setTitleError(false)


        if(title==''){
            setTitleError(true)
        }

        if(details==''){
            setDetailsError(true)
        }

        if(title&&details){
            console.log(title,details)
        }
    }


  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1,  borderRadius: 1 }}
      >
        <Item >
        <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{paper:classes.drawerPaper}}
            >
            <div>
            <Typography varient="h5">
                notes
            </Typography>
            </div>
            </Drawer>
        </Item>

        <Item sx={{ flexGrow: 1 }}>
        <Typography
            //className={classes.title}
            varient="h6"
            color="textSecondary"
            gutterBottom
            >
            Createpage
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                onChange={(e)=>setTitle(e.target.value)}
                className={classes.field}
                label="Note Title"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={titleError}
                />

                <TextField 
                onChange={(e)=>setDetails(e.target.value)}
                className={classes.field}
                label="Details"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                error={detailsError}

                />

                <Button
                //className={classes.btn}
                type="submit"
                varient="contained"
                endIcon={<HailIcon />}
                >
                    submit
                </Button>


            </form>

        </Item>

      </Box>
    </div>
  );
}
