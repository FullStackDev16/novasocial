import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserCardTwo from '../smallComponents/UserCards/UserCardTwo'
import { getSuggestions } from '../../redux/actions/suggestionsAction'
import { Avatar, AvatarGroup, Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { RefreshOutlined } from '@mui/icons-material'
import SmallLoading from '../smallComponents/SmallLoading'
import { Link } from 'react-router-dom'
import { makeStyles } from "@mui/styles"


const useStyles = makeStyles((theme) => {
    return {
        onlineFriends: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 10
        },
        avatar: {
            width: '35px !important',
            height: '35px !important'
        },
        suggestions: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 10,
            maxHeight: 500,
            overflow: 'auto'
        },
        suggestionsTitle: {
            background: theme.palette.background.paper,
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        },
    }
})

const RightBar = () => {
    const classes = useStyles()
    const { auth, suggestions, online } = useSelector(state => state)
    const dispatch = useDispatch()

    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        let onlineUserList = [];
        for (let i = 0; i < online.length; i++) {
            if (auth.user.following.find(user => user._id === online[i])) {
                onlineUserList.push(auth.user.following.find(user => user._id === online[i]))
            }
        }
        setOnlineUsers(onlineUserList)
    }, [setOnlineUsers, auth, online])

    return (
        <Grid container spacing={1}>

            {onlineUsers.length !== 0 &&
                <Grid item xs={12}>
                    <Box className={classes.onlineFriends}>
                        <Typography variant="subtitle2" textAlign="center">Online Friends</Typography>
                        <AvatarGroup max={10}>
                            {onlineUsers.map((user) => (<>{user && <Avatar className={classes.avatar} alt={user.fullname} component={Link} to={`/profile/${user._id}`} key={user._id} src={user.profileImage} />}</>))}
                        </AvatarGroup>
                    </Box>
                </Grid>
            }

            <Grid item xs={12}>
                {suggestions.users.length !== 0 && <Box className={classes.suggestions}>
                    <Box className={classes.suggestionsTitle}>
                        <Tooltip title="refresh" arrow>
                            <IconButton onClick={() => { if (suggestions.loading) { return } else { dispatch(getSuggestions(auth.token)) } }}>
                                <RefreshOutlined fontSize='small' />
                            </IconButton>
                        </Tooltip>
                        <Typography variant="subtitle2" >who to follow ?</Typography>
                    </Box>
                    <Box>
                        {suggestions.loading ? <SmallLoading /> : <>{suggestions.users.map(user => (<UserCardTwo key={user._id} user={user} />))}</>}
                    </Box>
                </Box>}
            </Grid>

        </Grid>
    )
}

export default RightBar
