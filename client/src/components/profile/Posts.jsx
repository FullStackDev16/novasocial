import React, { useState, useEffect } from 'react'
import { getDataAPI } from '../../utils/fetchData'
import SmallLoading from '../smallComponents/SmallLoading'
import { PROFILE_TYPES } from '../../redux/actions/profileActions'
import { Box, Grid } from '@mui/material'
import PostCardSmall from '../post/PostCardSmall'

const Posts = ({ auth, id, dispatch, profile }) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        profile.posts.forEach(data => {
            if (data._id === id) {
                setPosts(data.posts)
                setResult(data.result)
                setPage(data.page)
            }
        })
    }, [profile.posts, id])


    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
        const newData = { ...res.data, page: page + 1, _id: id }
        dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData })
        setLoad(false)
    }

    return (
        <>
            <Grid container spacing={1}>
                {posts.length !== 0 ? posts.map((post, index) => (
                    <Grid item xs={12} key={index}>
                        <PostCardSmall post={post} />
                    </Grid>
                )) :
                    <Grid item xs={12}>
                        <Box p={1} sx={{background:(theme)=>{return theme.palette.background.paper},borderRadius:(theme)=>{return `${theme.shape.borderRadius}px`}}} textAlign="center" alignItems="center">
                            No Posts
                        </Box>
                    </Grid>
                }
            </Grid>

            {load && <SmallLoading />}

            {result < 9 * (page - 1) ? '' :
                !load && <button className="btn btn-dark mx-auto d-block"
                    onClick={handleLoadMore}>
                    Load more
                </button>
            }
        </>
    )
}

export default Posts
