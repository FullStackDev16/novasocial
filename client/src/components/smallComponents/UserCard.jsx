import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Avatar, Typography } from "@mui/material";
import FollowButton from "./FollowButton";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            background: theme.palette.background.paper,
            minWidth: "240px",
            width: "100%",
            display: "flex",
            borderRadius: theme.shape.borderRadius,
            padding: 10,
        },
        avatar: {
            width: 45,
            height: 45,
            margin: 5,
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

const UserCard = ({ user }) => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Avatar className={classes.avatar} src={user.profileImage} />
            <Box className={classes.nameWrapper}>
                <Typography variant="h6">{user.fullname}</Typography>
                <Typography variant="body2">{"@" + user.username}</Typography>
            </Box>
            <Box className={classes.buttonWrapper}>
                <FollowButton user={user} />
            </Box>
        </Box>
    );
};

export default UserCard;
