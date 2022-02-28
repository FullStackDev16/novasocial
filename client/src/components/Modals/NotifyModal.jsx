import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { isReadNotify, deleteAllNotifies } from '../../redux/actions/notifyAction'
import { SETTINGS_TYPES } from '../../redux/actions/settingAction'
import { Box, Avatar, Menu, Tooltip, IconButton, Badge, Typography, Divider, Chip } from "@mui/material"
import { DeleteOutlined, FiberManualRecord, NotificationsActive, NotificationsOff, NotificationsOutlined } from '@mui/icons-material'
import { makeStyles } from "@mui/styles"
import { IsVideo } from "../../utils/MediaCheck"
import { ImageShow, VideoShow } from '../../utils/MediaShow'
import { alpha } from '@mui/material'

const useStyles = makeStyles((theme) => {
    return {
        notificationMenu: {
            width: "300px",
            background: `${theme.palette.background.paper} !important`,
        },
        notificationsWrapper: {
            maxHeight: "450px",
            minHeight: "250px",
            overflow: 'auto',
        },
        notificationTitleWrapper: {
            display: "flex",
            alignItems: 'center',
            padding: 7,
            margin: 7,
            background: `${alpha(theme.palette.background.default,0.6)} !important`,
            borderRadius: theme.shape.borderRadius,
        },
        notificationTitle: {
            flex: 1,
        },
        notificationMedia: {
            borderRadius: theme.shape.borderRadius,
            margin: 5
        },
        notificationItem: {
            display: 'flex',
            padding: 7,
            margin: 7,
            background: `${alpha(theme.palette.background.default,0.6)} !important`,
            borderRadius: theme.shape.borderRadius,
        },
        notificationItemAvatar: {
            margin: 5,
        },
        notificationItemContentWrapper: {
            flex: 1,
        },
        notReadedIcon: {
            width: "10px !important",
            height: "10px !important",
        },
        noNotification: {
            textAlign: "center",
            padding: 7,
            margin: 7
        },
        link: {
            color: theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.black,
        }
    }
})

const NotifyModal = () => {
    const classes = useStyles()

    const { auth, settings,notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleIsRead = (msg) => { dispatch(isReadNotify({ msg, auth })) }

    const Unread = notify.data.filter(item => item.isRead === false)
    const Readed = notify.data.filter(item => item.isRead === true)

    const handleDeleteAll = () => {
        if (window.confirm("Are your sure you want to delete all notifications ?")) {
            return dispatch(deleteAllNotifies(auth.token))
        }
    }
    const handleSound = () => { dispatch({ type: SETTINGS_TYPES.UPDATE_NOTIFY_SOUND, payload: !settings.notifySound }); localStorage.setItem("notification_sound", !settings.notifySound) }
    
    const handleMenuOpen = (e) => { setAnchorEl(e.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) };

    const NotificationItem = (msg) => {
        return (
            <Box className={classes.notificationItem}>
                <Avatar className={classes.notificationItemAvatar} src={msg.user.profileImage} />
                <Box className={classes.notificationItemContentWrapper}>
                    <Box>
                        <Typography variant="caption">{moment(msg.createdAt).fromNow()}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption">{"@" + msg.user.username + " " + msg.text}</Typography>
                    </Box>
                    {msg.image &&
                        <>
                            {IsVideo(msg.image) ? VideoShow(msg.image, classes.notificationMedia, "120px") : ImageShow(msg.image, classes.notificationMedia, "120px")}
                        </>
                    }
                    <Typography variant="body2">{msg.content && msg.content.length > 40 ? <>{msg.content.slice(0, 40)}...</> : <>{msg.content}</>}</Typography>

                </Box>
                {!msg.isRead && <FiberManualRecord className={classes.notReadedIcon} color="primary" />}
            </Box>)

    }

    return (
        <Box>

            <Tooltip title="Notification" arrow>
                <IconButton onClick={handleMenuOpen}>
                    <Badge badgeContent={Unread.length} invisible={Unread.length === 0 ? true : false}>
                        <NotificationsOutlined fontSize="small"/>
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu PaperProps={{ className: classes.notificationMenu }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} onClick={handleMenuClose} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>


                <Box className={classes.notificationTitleWrapper}>
                    <Typography variant='h6' className={classes.notificationTitle}> Notifications</Typography>
                    {notify.data.length !== 0 && <IconButton onClick={handleDeleteAll}><DeleteOutlined fontSize="small" /></IconButton>}
                    <IconButton onClick={handleSound}>{settings.notifySound ? <NotificationsActive fontSize="small" /> : <NotificationsOff fontSize="small" />}</IconButton>
                </Box>

                {notify.data.length === 0 && <Box className={classes.noNotification}><Typography variant="h6">No Notification yet</Typography></Box>}

                <Box className={classes.notificationsWrapper}>
                    {Unread.length !== 0 && <Divider>
                        <Chip label={`${Unread.length} New Notifications`} />
                    </Divider>}
                    {Unread.length !== 0 && Unread.map((msg, index) => (
                        <Link key={index} to={`${msg.url}`} onClick={() => handleIsRead(msg)} className={classes.link}>
                            {NotificationItem(msg)}
                        </Link>
                    ))}

                    {Readed.length !== 0 && <Divider>
                        <Chip label={`${Readed.length} Old Notifications`} />
                    </Divider>}
                    {Readed.length !== 0 && Readed.map((msg, index) => (
                        <Link key={index} to={`${msg.url}`} onClick={() => handleIsRead(msg)} className={classes.link}>
                            {NotificationItem(msg)}
                        </Link>
                    ))}
                </Box>
                
            </Menu>
        </Box>
    )
}

export default NotifyModal
