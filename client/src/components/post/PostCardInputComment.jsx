import { Avatar, Button, TextField, Box} from '@mui/material'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createComment } from "../../redux/actions/commentAction"

import { makeStyles } from "@mui/styles"


const useStyles = makeStyles((theme) => {
    return {
        inputCommentWrapper: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
        inputComment: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputCommentAvatar: {
            margin: 4,
            width: "35px !important",
            height: "35px !important",
        },
        inputCommentTextField: {
            padding: "8px !important",
        },
    }
})
const PostCardInputComment = ({ children, post, onReply, setOnReply }) => {
    const classes = useStyles()

    const [content, setContent] = useState('')
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!content.trim()) { if (setOnReply) return setOnReply(false); return }
        setContent('')
        const newComment = { content, likes: [], dislikes: [], user: auth.user, createdAt: new Date().toISOString(), reply: onReply && onReply.commentId, tag: onReply && onReply.user }
        dispatch(createComment({ post, newComment, auth, socket }))
        if (setOnReply) return setOnReply(false);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Box className={classes.inputCommentWrapper}>
                    {children}
                    <Box className={classes.inputComment}>
                        <Avatar className={classes.inputCommentAvatar} src={auth.user.profileImage} />
                        <TextField className={classes.inputCommentTextField} multiline fullWidth variant="standard" type="text" placeholder="Add Your Comment" value={content} onChange={e => setContent(e.target.value)} />
                        <Button type="submit" disabled={!Boolean(content)} variant="contained" disableElevation>Comment</Button>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default PostCardInputComment
