import React from 'react'
import {  Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {  useSelector } from 'react-redux'
import StatusCardOne from "../smallComponents/StatusCards/StatusCardOne"
import AddYourStory from '../smallComponents/StatusCards/AddYourStory'

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.background.paper,
            padding: 8,
        },
        statusCardWrapper: {
            display: 'flex',
            overflow: 'auto'
        },
    }

})
const Status = () => {
    const classes = useStyles()
    const { auth } = useSelector(state => state)


    const story = (user) => {
        let stories = []
        stories.push({ url: user.story, header: { profileImage: user.profileImage, heading: user.fullname }, type: user.story.indexOf("image") !== -1 ? "image" : "video" })
        return <StatusCardOne stories={stories} avatar={user.profileImage} thumbnail={stories[0].url} />
    }

    return (

        <Box>
            <Box className={classes.wrapper}>
                <Box className={classes.statusCardWrapper}>
                    {auth.user.story !== "" ? story(auth.user) : <AddYourStory />}
                    {auth.user.following.map((user, index) => <Box key={index}>
                        {user.story !== "" ? story(user) : "no story "}
                    </Box>)}
                </Box>
            </Box>
        </Box>
    )
}

export default Status
