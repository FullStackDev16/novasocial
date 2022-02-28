import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Avatar, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => {
    return {
        userCard: {
            background: theme.palette.background.paper,
            width: "100%",
            display: "flex",
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
        avatar: {
            width: 35,
            height: 35,
            marginRight: 8,
        },
        nameWrapper: {
            flex: 1,
            display: "flex",
            flexDirection: 'column',
            alignItems: "left",
            justifyContent: 'center'
        },
        buttonWrapper: {
            display: "flex",
            alignItems: "center",
            justifyContent: 'center'
        }
    };
});

const UserCardOne = ({ image, fullname, username }) => {
    const classes = useStyles();

    return (
        <Box className={classes.userCard}>
            <Avatar className={classes.avatar} src={image} />
            <Box className={classes.nameWrapper}>
                <Typography variant="h6">{fullname}</Typography>
                <Typography variant="body2">{"@" + username}</Typography>
            </Box>
        </Box>
    );
};

export default UserCardOne;
