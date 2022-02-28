import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
import { Box, Grid } from "@mui/material"
import PostCard from '../post/PostCard'
import InfiniteScroll from "react-infinite-scroll-component"
import SmallLoading from '../smallComponents/SmallLoading'

const Posts = () => {
    const { homePosts, auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)
        dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: homePosts.page + 1 } })
        setLoad(false)
    }

    return (
        <Box>
            <InfiniteScroll
                dataLength={homePosts.posts.length}
                next={handleLoadMore}
                hasMore={homePosts.result < 9 * (homePosts.page - 1) ? false : true}
                loader={<SmallLoading />}
                endMessage={<Box textAlign="center" p={1}>{load ? <>Yay! you have seen every Post</> : ""}</Box>}
            >
                <Grid container spacing={1}>
                    {homePosts.posts.map((post, index) => (
                        <Grid item xs={12} key={index}>
                            <PostCard post={post} />
                        </Grid>
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    )
}

export default Posts
