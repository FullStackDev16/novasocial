import { Grid ,Box} from '@mui/material'
import React from 'react'
import Posts from '../components/home/Posts'
import RightBar from '../components/home/RightBar'
import Status from '../components/home/Status'
import PostInput from '../components/home/PostInput'

const Home = () => {

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Status />
            </Grid>
            <Grid item xs={12}>
              <PostInput />
            </Grid>
            <Grid item xs={12}>
              <Posts />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <RightBar/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
