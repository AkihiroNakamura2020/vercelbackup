import { Button, Container, Typography } from "@mui/material"
import HailIcon from '@mui/icons-material/Hail'
import { makeStyles } from "@mui/styles"

import { TextField } from "@mui/material"
import { useState } from "react"

import { Drawer } from "@mui/material"

import { AppBar } from "@mui/material"
import { Toolbar } from "@mui/material"

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import { Box } from "@mui/system"

import { useRouter } from 'next/router'


const drawerWidth=240

//const useStyles=makeStyles({
const useStyles=makeStyles({
    field:{
        marginTop:20,
        marginBottom:20,
        display:'block',
    },
    doright:{
        // marginTop:20,
        // marginBottom:20,
        //flexGrow:1//可能な限りの幅を取る
    //   alignItems="center"
},

},{ name: "MuiExample_Component" })

export default function Create(){

    const classes=useStyles()
    const [title,setTitle]=useState('')
    const [details,setDetails]=useState('')
    const [titleError,setTitleError]=useState(false)
    const [detailsError,setDetailsError]=useState(false)
    const [category, setCategory] = useState('money')
    const router = useRouter()


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
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({ title, details, category })
              }).then(() => router.push("/edit"))
            
        }
    }


    return(
        
        <Container>
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


                <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="money" control={<Radio />} label="Money" />
                    <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                    <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                    <FormControlLabel value="work" control={<Radio />} label="Work" />
                </RadioGroup>
                </FormControl>     
                 
                 <Box textAlign="center">
                    <Button
                        type="submit"
                        varient="contained"
                        endIcon={<HailIcon />}
                        >
                        submit
                    </Button>
                 </Box>

            </form>
 
        </Container>
    )
}