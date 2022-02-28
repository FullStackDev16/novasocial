import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemIcon, Box, ListSubheader, ListItemText, Switch } from '@mui/material'
import { MessageOutlined, NotificationsOutlined } from '@mui/icons-material'
import { makeStyles } from "@mui/styles"
import { SETTINGS_TYPES } from '../redux/actions/settingAction'


const useStyles = makeStyles((theme) => {
    return {
        list: {
            width:"100%",
            background:theme.palette.background.paper,
            borderRadius:theme.shape.borderRadius
        },
        listSubHeader: {
            borderRadius:theme.shape.borderRadius
        }
    }
})

const Settings = () => {
    const classes = useStyles()
    const { settings } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleNotifySound = () => { dispatch({ type: SETTINGS_TYPES.UPDATE_NOTIFY_SOUND, payload: !settings.notifySound }); localStorage.setItem("notification_sound", !settings.notifySound) }
    const handleMessageSound = () => { dispatch({ type: SETTINGS_TYPES.UPDATE_MESSAGE_SOUND, payload: !settings.messageSound }); localStorage.setItem("message_sound", !settings.messageSound) }

    return (
        <Box>
            <List className={classes.list} subheader={<ListSubheader className={classes.listSubHeader}>Settings</ListSubheader>}>
                <ListItem>
                    <ListItemIcon>
                        <NotificationsOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Notification Sound" />
                    <Switch edge="end" onChange={handleNotifySound} checked={settings.notifySound}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <MessageOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Message Sound" />
                    <Switch edge="end" onChange={handleMessageSound} checked={settings.messageSound}/>
                </ListItem>
            </List>
        </Box>
    )
}

export default Settings
