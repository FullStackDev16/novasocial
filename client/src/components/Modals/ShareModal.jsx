import React from 'react'
import { Box, Chip, Dialog, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, OutlinedInput, Tooltip } from '@mui/material'
import { makeStyles } from "@mui/styles"
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon,
} from 'react-share'
import { ContentCopy } from '@mui/icons-material'

const useStyles = makeStyles((theme) => {
    return {
        shareButtons: {
            display: "flex",
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
        },
        shareUrl: {
            display: 'flex',
            paddingTop: 15
        }
    }
})

const ShareModal = ({ url, setIsShare }) => {
    const classes = useStyles()
    const newUrl = `Hey ! This Amazing Post ${url}`

    const handleDrawerClose = () => {
        setIsShare(false)
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(url)
    }

    return (
        <>
            <Dialog maxWidth="xs" open={true} scroll="body" onClose={handleDrawerClose} fullWidth>
                <DialogTitle>Share</DialogTitle>
                <DialogContent>
                    <Box className={classes.shareButtons} fullWidth>

                        <EmailShareButton url={newUrl} >
                            <EmailIcon round={true} size={32} />
                        </EmailShareButton>

                        <FacebookShareButton url={newUrl} >
                            <FacebookIcon round={true} size={32} />
                        </FacebookShareButton>

                        <TwitterShareButton url={newUrl} >
                            <TwitterIcon round={true} size={32} />
                        </TwitterShareButton>

                        <RedditShareButton url={newUrl} >
                            <RedditIcon round={true} size={32} />
                        </RedditShareButton>

                        <TelegramShareButton url={newUrl} >
                            <TelegramIcon round={true} size={32} />
                        </TelegramShareButton>

                        <WhatsappShareButton url={newUrl} >
                            <WhatsappIcon round={true} size={32} />
                        </WhatsappShareButton>

                    </Box>

                    <Divider>
                        <Chip label="OR" />
                    </Divider>

                    <Box className={classes.shareUrl} fullWidth>
                        <OutlinedInput fullWidth value={url}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip title="copy">
                                        <IconButton onClick={handleCopyUrl}>
                                            <ContentCopy />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }/>

                    </Box>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShareModal
