import React from 'react'
import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessages } from '../../redux/actions/messageAction'
import { Call, DeleteOutline, KeyboardArrowDownOutlined, PhoneDisabled, Videocam, VideocamOff } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import { IsVideo } from "../../utils/MediaCheck"
import { ImageShow, VideoShow } from "../../utils/MediaShow"

const useStyles = makeStyles((theme) => {
    return {
        messageWrapper: {
            textAlign: "right",
            userSelect: "none"
        },
        message: {
            display: 'inline-flex',
            margin: 3,
        },
        messageAvatar: {
            margin: 5,
        },
        messageContentWrapper: {
            display: "flex",
            flexDirection: 'column',
        },
        nameWrapper: {
            display: "flex",
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            padding: 4,
            justifyContent:'right'
        },
        nameWrapperChildren: {
            padding: "2px 4px",
        },
        chatWrapper: {
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            margin: 4,
        },
        chatText: {
            overflowWrap: 'break-word',
            maxWidth: "350px",
        },
        chatCall: {
            padding: 8,
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageVideo: {
            borderRadius: theme.shape.borderRadius,
        }
    }
})


const MsgDisplay = ({ user, msg, data }) => {
    const classes = useStyles()

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        if (!data) return;
        if (window.confirm('Do you want to delete?')) {
            dispatch(deleteMessages({ msg, data, auth }))
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box className={data ? classes.messageWrapper : ""}>
            <Box className={classes.message}>
                {!data &&  <Avatar className={classes.messageAvatar} src={user.profileImage} />}
                <Box className={classes.messageContentWrapper}>
                    <Box className={classes.nameWrapper}>
                        <Typography className={classes.nameWrapperChildren} variant="subtitle2">{user.fullname}</Typography>
                        <Typography className={classes.nameWrapperChildren} variant="caption">{moment(msg.createdAt).fromNow()}</Typography>
                        <KeyboardArrowDownOutlined sx={{ cursor: "pointer" }} onClick={handleMenuClick} />
                        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            {user._id === auth.user._id &&
                                <ListItem disablePadding onClick={handleMenuClose}>
                                    <ListItemButton onClick={handleDeleteMessages}>
                                        <ListItemIcon>
                                            <DeleteOutline />
                                        </ListItemIcon>
                                        <ListItemText primary="delete" />
                                    </ListItemButton>
                                </ListItem>
                            }
                        </Menu>
                    </Box>
                    <Box>
                        <Box className={classes.chatWrapper}>
                            {msg.media.map((item, index) => (<Box key={index}>{IsVideo(item.url) ? VideoShow(item.url, classes.imageVideo, "350px", "200px") : ImageShow(item.url, classes.imageVideo, "350px", "200px")}</Box>))}
                            {msg.text && <Box className={classes.chatText}>{msg.text}</Box>}
                            {msg.call && <Typography className={classes.chatCall}>{msg.call.times === 0 ? msg.call.video ? <VideocamOff color="error" size="small" /> : <PhoneDisabled color="error" size="small" /> : msg.call.video ? <Videocam color="success" size="small" /> : <Call color="success" size="small" />}</Typography>}
                        </Box>
                    </Box>
                </Box>
                {data && <Avatar className={classes.messageAvatar} src={user.profileImage} />}
            </Box>
        </Box>
    )
}

export default MsgDisplay
