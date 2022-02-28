import {  Grid } from '@mui/material'
import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import MessageBoxCover from '../../components/message/MessageBoxCover'
import RightSide from '../../components/message/RightSide'

const Conversation = () => {
    return (
        <MessageBoxCover>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4} sx={{display:{xs:"none",lg:'block'}}}>
                    <LeftSide />
                </Grid>
                <Grid item xs={12} md={8}>
                    <RightSide />
                </Grid>
            </Grid>
        </MessageBoxCover>
    )
}

export default Conversation
