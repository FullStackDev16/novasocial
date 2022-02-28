import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Avatar, Typography, Badge } from "@mui/material";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            minWidth: "240px",
            width: "100%",
            display: "flex",
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
        avatarWrapper: {
            marginRight: 8,
        },
        badgeOnline: {
            "& .MuiBadge-dot": {
                background: `${theme.palette.mode === "light" ? theme.palette.primary.main : theme.palette.common.white} !important`,
                '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: 'ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""',
                },
            },
        },
        badgeOffline: {
            "& .MuiBadge-dot": {
                border: `2px solid ${theme.palette.grey[500]} !important`
            }
        },
        nameWrapper: {
            flex: 1,
            display: "flex",
            flexDirection: 'column',
            alignItems: "left",
            justifyContent: 'center'
        },
    };
});

const UserCardFour = ({ user }) => {
    const classes = useStyles();
    const { auth } = useSelector(state => state)

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.avatarWrapper}>
                {auth.user.following.find(item => item._id === user._id) ? <Badge anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} className={user.online ? classes.badgeOnline : classes.badgeOffline} badgeContent=" " variant="dot">
                    <Avatar src={user.profileImage} />
                </Badge> : <Avatar src={user.profileImage} />}
            </Box>
            <Box className={classes.nameWrapper}>
                <Typography variant="h6">{user.fullname}</Typography>
                <Typography variant="body2">{"@" + user.username}</Typography>
            </Box>
        </Box>
    );
};

export default UserCardFour;
