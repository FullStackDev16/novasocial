import React, { useState } from 'react'
import { makeStyles } from "@mui/styles"
import { CardContent, CardMedia, IconButton } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import { Box } from '@mui/material'
import { DownloadOutlined } from '@mui/icons-material'
import { saveAs } from 'file-saver';
import { ImageShow, VideoShow } from '../../utils/MediaShow';
import { IsImage, IsVideo } from '../../utils/MediaCheck'

const useStyles = makeStyles((theme) => {
    return {
        carouselItem: {
            width: "100%",
            minHeight: "100%",
            height: "100%",
            maxHeight: "100%",
        },
        imageItem: {
            borderRadius: theme.shape.borderRadius,
            width: "100%",
            minHeight: "100%",
            height: "100%",
            maxHeight: "100%",
        },
        readMore: {
            cursor: "pointer",
            color: theme.palette.primary.main,
            display: "inline"
        },
        carousel: {
            margin:"8px !important",
            borderRadius: theme.shape.borderRadius,
            userSelect: "none",
            overflow: "hidden",
            "& .control-prev": {
                height: "30px !important",
                top: "50% !important",
                transform: "translateY(-50%) !important",
                borderRadius: "50%",
            },
            "& .control-next": {
                background: "transparent !important",
                height: "30px !important",
                top: "50% !important",
                transform: "translateY(-50%) !important",
                borderRadius: "50%",
            },
            "& .carousel-status": {
                padding: "8px 16px !important",
            }
        },
    }
})

const PostCardBody = ({ post }) => {
    const classes = useStyles()
    const [readMore, setReadMore] = useState(false)



    const ImageCarousel = ({ post }) => {
        const imageArr = post.images
        return (
            <Box className={classes.carousel} >
                {imageArr.length >= 2 ? <Carousel showThumbs={false} swipeable infiniteLoop useKeyboardArrows className={classes.carousel}>
                    {imageArr.map((image, index) => (
                        <Box key={index} sx={{position:"relative"}}>
                            <IconButton sx={{position:"absolute",top: 5,left:5,zIndex:50000}} onClick={()=>{saveAs(image.url,post.user.fullname)}}>
                                <DownloadOutlined/>
                            </IconButton>
                            {IsImage(image.url) && ImageShow(image.url, classes.carouselItem)}
                            {IsVideo(image.url) && VideoShow(image.url, classes.carouselItem)}
                        </Box>
                    ))}
                </Carousel>
                    : <>
                        {imageArr.map((image, index) => (
                            <Box key={index}>
                                {IsVideo(image.url) && VideoShow(image.url, classes.imageItem)}
                                {IsImage(image.url) && ImageShow(image.url, classes.imageItem)}
                            </Box>
                        ))}
                    </>
                }
            </Box>
        )
    }

    return (
        <>
            {post.images.length !== 0 ? <CardMedia children={<ImageCarousel post={post} />} /> : ""}
            {post.content &&
            <CardContent sx={{ whiteSpace: "pre-wrap" }}>
                {
                    post.content.length < 300
                        ? post.content
                        : readMore ? post.content + ' ' : post.content.slice(0, 300) + ''
                }
                {
                    post.content.length > 300 &&
                    <Box onClick={() => setReadMore(!readMore)} className={classes.readMore}>
                        {readMore ? '' : ' ...Read More'}
                    </Box>
                }
            </CardContent>
            }
        </>
    )
}

export default PostCardBody
