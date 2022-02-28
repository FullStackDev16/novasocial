import React from 'react'
import { makeStyles } from "@mui/styles"
import { Box, Grid, Typography } from '@mui/material'


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
        offline: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: "24px",

        },
        offlineHeading: {
            width: "100%",
            height: "100%",
            textAlign: "center"
        },
        OfflineText: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
        },
    }
})


const Offline = () => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.offline}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box className={classes.offlineHeading}>
                            <Typography variant="h4" color="primary.light">
                                No Internet
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Try
                        </Typography>
                        <Box className={classes.OfflineText}>
                            <ul>
                                <li>Checking the network cables, modem, and router</li>
                                <li>Reconnecting to Wi-Fi</li>
                                <li>Make sure you have a working IP address</li>
                                <li>Reset your network settings</li>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Offline
