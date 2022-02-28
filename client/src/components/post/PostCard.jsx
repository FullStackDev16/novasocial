import React, { useState } from 'react'
import { Card, Box, Collapse, Typography, alpha, IconButton } from '@mui/material'
import { makeStyles } from "@mui/styles"

import PostCardHeader from "./PostCardHeader"
import PostCardBody from "./PostCardBody"
import PostCardFooter from "./PostCardFooter"
import PostCardInputComment from './PostCardInputComment'
import PostCardComments from './PostCardComments'
import { Sort } from '@mui/icons-material'

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            borderRadius: theme.shape.borderRadius,
            background: theme.palette.background.paper,
        },
        comments: {
            background: `${alpha(theme.palette.background.default, 0.4)}`,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            margin: 8,
        },
        commentsTopBar: {
            background:theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            marginBottom: 8,
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
        },
        commentsTitle: {
            color: `${theme.palette.mode === "light" ? theme.palette.grey[700] : theme.palette.grey[200]}`,
        }
    }
})

const PostCard = ({ post }) => {
    const classes = useStyles()

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => { setExpanded(!expanded); };

    return (
        <Box className={classes.wrapper}>
            <Card elevation={0} fullWidth>
                <PostCardHeader post={post} />
                <PostCardBody post={post} />
                <PostCardFooter post={post} handleExpand={handleExpandClick} />

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box className={classes.comments}>
                        <Box className={classes.commentsTopBar}>
                            <Typography variant="h6" textAlign="center" className={classes.commentsTitle}>Comments</Typography>
                            <IconButton><Sort/></IconButton>
                        </Box>
                        <PostCardInputComment post={post} />
                        <PostCardComments post={post} />
                    </Box>
                </Collapse>

            </Card>
        </Box>
    )
}

export default PostCard
