import React from 'react'
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import { makeStyles } from "@mui/styles"
import { Link } from 'react-router-dom'
import NoImage from "../../media/Images/noImage.png"
import { Carousel } from 'react-responsive-carousel'
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
        smallCard: {
          background: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          padding: 8,
        },
    
        smallCardLeftSide: {
          borderRadius: theme.shape.borderRadius,
          paddingBottom: 4
        },
    
        smallCardHeaderAvatar: {
          width: "35px !important",
          height: "35px !important",
        },
    
        smallCardBodyImage: {
          borderRadius: theme.shape.borderRadius,
          width: "100%",
        },
    
    }
    
})

const PostCardSmall = ({ post }) => {
  const classes = useStyles()

  const ImageCarousel = ({ post }) => {
    const imageArr = post.images
    return (
        <Box className={classes.carousel} >
            {imageArr.length >= 2 ? <Carousel showThumbs={false} swipeable infiniteLoop useKeyboardArrows className={classes.carousel}>
                {imageArr.map((image, index) => (
                    <Box key={index}>
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
    <Box className={classes.smallCard}>
      <Grid container>

        <Grid item xs={12}>
          <Box className={classes.smallCardLeftSide}>
            <Link to={`/post/${post._id}`} >
              {post.images.length !== 0 ? <ImageCarousel post={post} />: <img src={NoImage} alt={post.user.fullname} className={classes.smallCardBodyImage} />}
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <Box pt={1} flexGrow={1}>
                {post.content && <Typography variant='subtitle2' className={classes.smallCardBodyContent}>{post.content}</Typography>}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Link to={`/profile/${post.user._id}`}>
                  <Avatar src={post.user.profileImage} alt={post.user.fullname} className={classes.smallCardHeaderAvatar} />
                </Link>
                <Box display="inline-flex" alignItems="center" flexDirection="column">
                  <Typography variant='subtitle2' pl={0.5}>{post.user.fullname}</Typography>
                  <Typography variant='caption' pl={0.5}>{" @" + post.user.username}</Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Grid >

      </Grid >
    </Box >
  )
}

export default PostCardSmall
