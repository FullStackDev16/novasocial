import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction'
import PostCardSmall from '../components/post/PostCardSmall'
import { getDataAPI } from '../utils/fetchData'
import SmallLoading from "../components/smallComponents/SmallLoading"
import { Button, Grid, Box, Typography } from '@mui/material'

const Discover = () => {
    const { auth, discover } = useSelector(state => state)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!discover.firstLoad) {
            dispatch(getDiscoverPosts(auth.token))
        }
    }, [dispatch, auth.token, discover.firstLoad])

    const handleLoadMore = async () => {
        const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token)
        dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })
    }

    return (
        <Box>
            <Grid container spacing={1}>
                {discover.loading ? <Grid item xs={12}><SmallLoading /></Grid> :
                    <>
                        {discover.posts.length === 0 ?
                            <Grid item xs={12}>
                                <Typography fullWidth variant="subtitle2" textAlign="center"> No Posts Yet</Typography>
                            </Grid>
                            : <>
                                {discover.posts.map((post, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <PostCardSmall post={post} />
                                    </Grid>
                                ))}

                                {!discover.loading &&
                                    !Boolean(discover.result < 9 * (discover.page - 1)) && <Button onClick={handleLoadMore}>
                                        Load more
                                    </Button>}
                            </>}
                    </>}
            </Grid>
        </Box>
    )
}

export default Discover
