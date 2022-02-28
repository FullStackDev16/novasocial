import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import CommentMenu from './CommentMenu'
import { updateComment, likeComment, dislikeComment, removeDislikeComment, removeLikeComment } from '../../../redux/actions/commentAction'
import PostCardInputComment from '../PostCardInputComment'
import { Avatar, Typography, Box, IconButton, Tooltip, TextField } from '@mui/material'
import { makeStyles } from "@mui/styles"
import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined, ReplyOutlined } from '@mui/icons-material'


const useStyles = makeStyles((theme) => {
    return {
        commentCard: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            marginTop: 8,
            display: "flex",

        },
        commentCardInner: {
            flex: 1,
            width: "100%",
            display: "flex",
            flexWrap: 'wrap',
        },
        commentAvatar: {
            margin: "0px 10px",
        },
        commentName: {
            display: "flex"
        },
        commentContent: {
            width: "100%",
            alignItems: 'center',
        },
        commentOptions: {
            display: "flex",
            alignItems: 'center',
            paddingTop:6
        },
    }
})

const CommentCard = ({ children, comment, post, commentId, seeReply }) => {
    const classes = useStyles()

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)

    const [onEdit, setOnEdit] = useState(false)

    const [likeDislikeLoading, setLikeDislikeLoading] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)

    const [onReply, setOnReply] = useState(false)


    useEffect(() => {
        setContent(comment.content)
        setOnReply(false)

        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
        if (comment.dislikes.find(dislike => dislike._id === auth.user._id)) {
            setIsDislike(true)
        } else {
            setIsDislike(false)
        }

    }, [comment, auth.user._id])


    const handleUpdate = () => {
        if (comment.content !== content) {
            dispatch(updateComment({ comment, post, content, auth }))
            setOnEdit(false)
        } else {
            setOnEdit(false)
        }
    }

    const handleLikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isDislike) {
            await dispatch(removeDislikeComment({ comment, post, auth }))
            setIsDislike(false)
        }
        await dispatch(likeComment({ comment, post, auth }))

        setLikeDislikeLoading(false)
    }
    const handleRemoveLikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        await dispatch(removeLikeComment({ comment, post, auth }))

        setLikeDislikeLoading(false)
    }
    const handleDislikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isLike) {
            if (isLike) await dispatch(removeLikeComment({ comment, post, auth }))
            setIsLike(false)
        }
        await dispatch(dislikeComment({ comment, post, auth }))

        setLikeDislikeLoading(false)
    }
    const handleRemoveDislikeComment = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        await dispatch(removeDislikeComment({ comment, post, auth }))

        setLikeDislikeLoading(false)
    }


    const handleReply = () => {
        if (onReply) return setOnReply(false)
        setOnReply({ ...comment, commentId })
    }

    return (
        <Box >
            <Box className={classes.commentCard}>
                <Box className={classes.commentAvatar}>
                    <Link to={`/profile/${comment.user._id}`}>
                        <Avatar src={comment.user.profileImage} />
                    </Link>
                </Box>
                <Box className={classes.commentCardInner}>
                    <Box className={classes.commentName}>
                        <Link to={`/profile/${comment.user._id}`}>
                            <Typography color="primary.light" variant="body2">{"@" + comment.user.username}</Typography>
                        </Link>
                        <Typography variant="caption" pl={1}>{moment(comment.createdAt).fromNow()}</Typography>
                    </Box>
                    <Box className={classes.commentContent}>
                        {onEdit ? <TextField variant="standard" multiline fullWidth value={content} onChange={e => setContent(e.target.value)} />
                            : <Box sx={{ wordWrap: "break-word", width: "85%" }}>
                                {
                                    comment.tag && comment.tag._id !== comment.user._id &&
                                    <Link to={`/profile/${comment.tag._id}`}>
                                        @{comment.tag.username}
                                    </Link>
                                }
                                <Typography>
                                    {content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '...'}
                                </Typography>
                                {content.length > 100 && <Typography className="readMore" onClick={() => setReadMore(!readMore)}>{readMore ? 'Hide content' : 'Read more'}</Typography>}
                            </Box>}
                    </Box>
                    <Box className={classes.commentOptions}>

                        {/* Like Unlike Comment  */}
                        <Tooltip title="I Like This Comment">
                            {isLike ?
                                <IconButton onClick={handleRemoveLikeComment}>
                                    <ThumbUp fontSize="small" />
                                </IconButton> :
                                <IconButton onClick={handleLikeComment}>
                                    <ThumbUpOutlined fontSize="small" />
                                </IconButton>}
                        </Tooltip>
                        <Typography p={.4} variant="subtitle2" >
                            {comment.likes.length}
                        </Typography>

                        <Tooltip title="I Dislike This Comment">
                            {isDislike ?
                                <IconButton onClick={handleRemoveDislikeComment}>
                                    <ThumbDown fontSize="small" />
                                </IconButton> :
                                <IconButton onClick={handleDislikeComment}>
                                    <ThumbDownOutlined fontSize="small" />
                                </IconButton>}
                        </Tooltip>

                        <Typography p={.4} variant="subtitle2" >
                            {comment.dislikes.length}
                        </Typography>

                        {seeReply}
                        
                        {onEdit
                            ? <>
                                <Typography sx={{cursor:'pointer'}} pl={1} variant="subtitle2" onClick={handleUpdate}>
                                    update
                                </Typography>
                                <Typography sx={{cursor:'pointer'}} pl={1} pr={1} variant="subtitle2" onClick={() => setOnEdit(false)}>
                                    cancel
                                </Typography>
                            </> :
                            <Typography variant="subtitle2"  >
                                {onReply ?
                                    <Typography sx={{cursor:'pointer'}} p={.8} variant="subtitle2" onClick={handleReply}>
                                        cancel
                                    </Typography>
                                    :
                                    <Tooltip title="Reply">
                                        <IconButton onClick={handleReply}>
                                            <ReplyOutlined fontSize="small" />
                                        </IconButton>
                                    </Tooltip>}
                            </Typography>
                        }

                    </Box>
                </Box>

                <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} handleReplyToComment={handleReply} />

            </Box>
            {onReply &&
                <Box mt={1}>
                    <PostCardInputComment post={post} onReply={onReply} setOnReply={setOnReply} >
                        <Link to={`/profile/${onReply.user._id}`}>
                            <Typography color="primary.light" variant="body2">
                                @{onReply.user.username}
                            </Typography>
                        </Link>
                    </PostCardInputComment>
                </Box>}
            {children}
        </Box >
    )
}

export default CommentCard
