import React from 'react'
import { makeStyles } from "@mui/styles"
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Box, Button, Grid } from '@mui/material'
import PurpleNotFound from "../media/Images/NotFound/purple.png"
import BlueNotFound from "../media/Images/NotFound/blue.png"
import GreenNotFound from "../media/Images/NotFound/green.png"
import YellowNotFound from "../media/Images/NotFound/yellow.png"
import RedNotFound from "../media/Images/NotFound/red.png"
import OrangeNotFound from "../media/Images/NotFound/orange.png"

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            background: theme.palette.background.default,
            borderRadius: 0,
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            width: '100vw',
            height: "100vh"
        },
        notFound: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            width: "100%",
            maxWidth: 1000,
            padding: "24px",
            textAlign: 'center'
        },
        notFoundImage: {
            width: "100%",
            height: "100%",
            maxHeight: 700,
            animation: "float 5s infinite ease-in-out",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
        notFoundText: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            textAlign:'left'
        },
    }
})


const NotFound = () => {
    const classes = useStyles()
    const { theme } = useSelector((state) => state)
    const history = useHistory()
    

    const ThemeImages = {
        blue: BlueNotFound,
        purple: PurpleNotFound,
        green: GreenNotFound,
        yellow: YellowNotFound,
        red: RedNotFound,
        orange: OrangeNotFound,
    }
    const GoToHomePage = () => {
        return history.push("/")
    }

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.notFound}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box className={classes.notFoundImage}>
                            <img src={ThemeImages[theme.color ? theme.color : "blue"]} alt="Not Found" />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                    <Box className={classes.notFoundText}>
                            <ul>
                                <li>Checking the network cables, modem, and router</li>
                                <li>Reconnecting to Wi-Fi</li>
                                <li>Make sure you have a working IP address</li>
                                <li>Reset your network settings</li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Box pt={2} textAlign="center">
                            <Button onClick={GoToHomePage} variant="contained">Go Back to Home page</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default NotFound
