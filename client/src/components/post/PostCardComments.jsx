import React, { useState, useEffect } from 'react'
import CommentDisplay from './comment/CommentDisplay'
import { Box, IconButton, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'

const useStyles = makeStyles((theme) => {
    return {
        seeMoreComments: {
            padding: 8
        },
        noComments: {
            padding: 16
        }
    }
})

const PostCardComments = ({ post }) => {
    const classes = useStyles()
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)

    const [replyComments, setReplyComments] = useState([])

    useEffect(() => {
        const newCm = post.comments.filter(cm => !cm.reply)
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    }, [post.comments, next])

    useEffect(() => {
        const newRep = post.comments.filter(cm => cm.reply)
        setReplyComments(newRep)
    }, [post.comments])

    return (
        <Box>
            {showComments.map((comment, index) => (<CommentDisplay key={index} comment={comment} post={post} replyCm={replyComments.filter(item => item.reply === comment._id)} />))}
            {comments.length - next > 0 ?
                <Typography className={classes.seeMoreComments} textAlign="center" onClick={() => setNext(next + 10)}>
                    <IconButton>
                        <KeyboardArrowDownOutlined />
                    </IconButton>
                </Typography>
                : comments.length > 2 && <Typography className={classes.seeMoreComments} textAlign="center" onClick={() => setNext(2)}>
                    <IconButton>
                        <KeyboardArrowUpOutlined />
                    </IconButton>
                </Typography>
            }
            {comments.length === 0 && <Typography className={classes.noComments} variant="subtitle2" textAlign="center">No Comments Yet</Typography>}
        </Box>
    )
}

export default PostCardComments
