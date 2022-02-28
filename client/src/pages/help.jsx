import React from 'react';
import { makeStyles } from "@mui/styles"
import { Box } from '@mui/material'


const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'

        }
    }
})

const Help = () => {
    const classes = useStyles()
    return <Box className={classes.wrapper}>

    </Box>;
};

export default Help;
