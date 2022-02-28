import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles"
import { CardActions, IconButton, Tooltip, Typography } from '@mui/material'
import { Bookmark, BookmarkBorder, CommentOutlined, ForumOutlined, ShareOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils/config'
import ShareModal from '../Modals/ShareModal'
import { likePost, dislikePost, removeDislikePost, removeLikePost, savePost, unSavePost } from '../../redux/actions/postAction'

const useStyles = makeStyles((theme) => {
    return {
        rightSideButton: {
            marginLeft: 'auto'
        },
        displayInline: {
            display: 'inline'
        }
    }
})

const PostCardFooter = ({ post, handleExpand }) => {
    const classes = useStyles()
    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [likeDislikeLoading, setLikeDislikeLoading] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [isDislike, setIsDislike] = useState(false)

    const [isShare, setIsShare] = useState(false)

    const [saved, setSaved] = useState(false)
    const [saveLoad, setSaveLoad] = useState(false)

    // ---------------------- Like Post ---------------------------- 
    useEffect(() => {
        if (post.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        } else {
            setIsLike(false)
        }
    }, [post.likes, auth.user._id])
    const handleLikePost = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isDislike) await dispatch(removeDislikePost({ post, auth, socket }))
        await dispatch(likePost({ post, auth, socket }))

        setLikeDislikeLoading(false)
    }
    const handleRemoveLikePost = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        await dispatch(removeLikePost({ post, auth, socket }))

        setLikeDislikeLoading(false)
    }

    // ---------------------- Dislike Post ---------------------------- 
    useEffect(() => {
        if (post.dislikes.find(dislike => dislike._id === auth.user._id)) {
            setIsDislike(true)
        } else {
            setIsDislike(false)
        }
    }, [post, auth.user._id])
    const handleDislikePost = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        if (isLike) await dispatch(removeLikePost({ post, auth, socket }))

        await dispatch(dislikePost({ post, auth, socket }))

        setLikeDislikeLoading(false)
    }
    const handleRemoveDislikePost = async () => {
        if (likeDislikeLoading) return;
        setLikeDislikeLoading(true)

        await dispatch(removeDislikePost({ post, auth, socket }))

        setLikeDislikeLoading(false)
    }

    // ---------------------- Save Unsave Post ---------------------------- 
    useEffect(() => {
        if (auth.user.saved.find(id => id === post._id)) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }, [auth.user.saved, post._id])
    const handleSavePost = async () => {
        if (saveLoad) return;
        setSaveLoad(true)
        await dispatch(savePost({ post, auth }))
        setSaveLoad(false)
    }
    const handleUnSavePost = async () => {
        if (saveLoad) return;
        setSaveLoad(true)
        await dispatch(unSavePost({ post, auth }))
        setSaveLoad(false)
    }


    return (
        <Box className={classes.wrapper}>
            <CardActions disableSpacing>

                <Box>

                    {/* Like  */}
                    <Tooltip title="You Like This Post">
                        {isLike ?
                            <IconButton onClick={handleRemoveLikePost}>
                                <ThumbUp fontSize="small" />
                            </IconButton>
                            : <IconButton onClick={handleLikePost}>
                                <ThumbUpOutlined fontSize="small" />
                            </IconButton>
                        }
                    </Tooltip>
                    <Typography className={classes.displayInline}>{post.likes.length}</Typography>

                    {/* Dislike  */}
                    <Tooltip title="You Dislike This Post">
                        {isDislike ?
                            <IconButton onClick={handleRemoveDislikePost}>
                                <ThumbDown fontSize="small" />
                            </IconButton>
                            : <IconButton onClick={handleDislikePost}>
                                <ThumbDownOutlined fontSize="small" />
                            </IconButton>
                        }
                    </Tooltip>
                    <Typography className={classes.displayInline}>{post.dislikes.length}</Typography>

                    {/* See Post */}
                    <Tooltip title="See this post">
                        <Link to={`/post/${post._id}`}>
                            <IconButton>
                                <ForumOutlined fontSize="small" />
                            </IconButton>
                        </Link>
                    </Tooltip>

                    {/* Share Post */}
                    <Tooltip title="Share">
                        <IconButton onClick={() => { setIsShare(!isShare) }}>
                            <ShareOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>

                </Box>

                <Box className={classes.rightSideButton}>

                    {/* Comment Post  */}
                    {<Tooltip title="Comments">
                        <IconButton onClick={handleExpand} >
                            <CommentOutlined fontSize="small" />
                        </IconButton>
                    </Tooltip>}
                    <Typography className={classes.displayInline}>{post.comments.filter(cm => !cm.reply).length}</Typography>


                    {/* Save Unsave Post  */}
                    {saved ?
                        <Tooltip title="Saved">
                            <IconButton aria-label="save" onClick={handleUnSavePost}>
                                <Bookmark fontSize="small" />
                            </IconButton>
                        </Tooltip> :
                        <Tooltip title="Unsaved">
                            <IconButton aria-label="unsave" onClick={handleSavePost}>
                                <BookmarkBorder fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    }
                </Box>

            </CardActions>

            {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} setIsShare={setIsShare} />}
        </Box>
    )
}

export default PostCardFooter
