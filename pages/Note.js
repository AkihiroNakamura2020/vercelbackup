import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { Paper } from "@mui/material"

export default function Notes(){
    return(
        <div>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Paper>1</Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper>1</Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper>1</Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper>1</Paper>
                </Grid>
            </Grid>
            
        </div>
    )
}