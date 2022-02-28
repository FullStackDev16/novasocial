import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import SmallLoading from "../../components/smallComponents/SmallLoading"
import PostCard from '../../components/post/PostCard'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(() => {
    return {
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight:"500px",
            height:"100%",
        },
        post: {
            width: "500px", 

        }
    }
})

const Post = () => {
    const classes = useStyles()
    const { id } = useParams()
    const [post, setPost] = useState([])

    const { auth, detailPost } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({ detailPost, id, auth }))

        if (detailPost.length > 0) {
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        }
    }, [detailPost, dispatch, id, auth])

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.post}>
                {post.length === 0 && <SmallLoading />}

                {post.map(item => (
                    <PostCard key={item._id} post={item} />
                ))
                }
            </Box>
        </Box>
    )
}

export default Post
