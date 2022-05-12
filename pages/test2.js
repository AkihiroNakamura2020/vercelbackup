import { Button, Container, Typography } from "@mui/material"
import HailIcon from '@mui/icons-material/Hail'
import { makeStyles } from "@mui/styles"

import { TextField } from "@mui/material"
import { useState } from "react"

import { Drawer } from "@mui/material"

import { AppBar } from "@mui/material"
import { Toolbar } from "@mui/material"

const drawerWidth=240

//const useStyles=makeStyles({
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
    appbar:{
        // width:`calc(100% - ${drawerWidth}px)`
    },
    toolbar:{
        // height:100,
        // flexGrow:1//可能な限りの幅を取る
    },
    date:{
        // flexGrow:1//可能な限りの幅を取る
    },
    contents:{
        //width:`calc(100% - ${drawerWidth}px)`,
        // textAlign: 'right',
        // align: 'right',
        // position: 'relative',
        
        
        
        

    }

},{ name: "MuiExample_Component" })

export default function test2(){

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


    return(
        
        <Container>
        {/* <div className={classes.root}>
        */}

            {/* <AppBar
            className={classes.appbar}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Welcome to the ninja site 3/6
                    </Typography>

                    <Typography>
                        Mario
                    </Typography>
                </Toolbar>

            </AppBar> */}

        
         {/* <div className={classes.root}> */}

        
        
            {/* <div className={classes.toolbar}></div> */}
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
 
        </Container>
    )
}