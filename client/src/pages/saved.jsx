import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Typography } from '@mui/material'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import { getDataAPI } from '../utils/fetchData'
import SmallLoading from '../components/smallComponents/SmallLoading'
import PostCardSmall from '../components/post/PostCardSmall'
import InfiniteScroll from "react-infinite-scroll-component"

const Saved = () => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)

    const [savePosts, setSavePosts] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(2)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        getDataAPI('getSavePosts', auth.token).then(res => {
            setSavePosts(res.data.savePosts)
            setResult(res.data.result)
            setLoad(false)
        }).catch(err => {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        })

        return () => setSavePosts([])
    }, [auth.token, dispatch])

    const handleLoadMore = async () => {
        setLoad(true)
        const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
        setPage(page + 1)
        setLoad(false)
    }

    return (
        <Box>
            {savePosts.length !== 0 &&
                <InfiniteScroll
                    dataLength={auth.user.saved.length}
                    next={handleLoadMore}
                    hasMore={result < 9 * (page - 1) ? false : true}
                    loader={<SmallLoading />}
                    endMessage={<Box textAlign="center" p={1}>You have seen every saved Post</Box>}
                >
                    <Grid container spacing={1}>
                        {savePosts.map((post, index) => (
                            <Grid item xs={12} md={7} key={index}>
                                <PostCardSmall post={post} />
                            </Grid>
                        ))}
                    </Grid>
                </InfiniteScroll>
            }
            {!load && savePosts.length === 0 && <Typography textAlign="center" variant="subtitle2">No Posts Yet</Typography>}
        </Box>
    )
}

export default Saved
