import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import LeftSide from '../../components/message/LeftSide'
import MessageBoxCover from '../../components/message/MessageBoxCover'

const Message = () => {
    return (
        <MessageBoxCover>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <LeftSide />
                </Grid>
                <Grid item xs={12} md={8} sx={{ display: { xs: "none", lg: 'block' } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: 500, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" color="primary.light">Message </Typography>
                        <Typography variant="subtitle1">Select a chat to start messaging</Typography>
                        <Box>
                            <ul>
                                <li><Typography variant="caption">Message And Calls Are End To End Encrypted</Typography></li>
                                <li><Typography variant="caption">Easily Send Message to Everyone</Typography></li>
                                <li><Typography variant="caption">You can contact us anytime</Typography></li>
                            </ul>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </MessageBoxCover>
    )
}

export default Message
