import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            background: theme.palette.background.paper,
            minHeight: 510,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        }
    }
})

const MessageBoxCover = ({ children, rightSide }) => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            {children}
        </Box>
    );
};

export default MessageBoxCover;
