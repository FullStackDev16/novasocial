import React, { useState, useRef } from 'react'
import { Avatar, Button, Box, Grid, IconButton, TextField, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Add, InsertEmoticon } from '@mui/icons-material'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createPost } from '../../redux/actions/postAction';
import { Cancel } from '@mui/icons-material';
import { ImageShow, VideoShow } from "../../utils/MediaShow"
import { IsVideo } from "../../utils/MediaCheck";
import { alpha } from '@mui/system';
import { useTheme } from '@emotion/react'
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";



const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
        },
        inputWrapper: {
            borderRadius: theme.shape.borderRadius,
            background: alpha(theme.palette.background.default, 0.5),
            padding: 8,
        },
        input: {
            borderRadius: theme.shape.borderRadius,
            flexGrow: 1,
            padding: "0px 4px !important",
            ["& input"]: {
                background: "transparent",
                padding: 10,
                width: "100%",
                outline: "none",
                border: "none",
                color: theme.palette.mode === "dark" ? "#fff" : "#000"
            }
        },
        imagesWrapper: {
            borderRadius: theme.shape.borderRadius,
            background: alpha(theme.palette.background.default, 0.5),
            padding: 8,
            marginTop: 8,
            overflowX: "auto",
            display: 'flex'
        },
        imageVideoWrapper: {
            position: 'relative',
            marginRight: 8
        },
        imageVideo: {
            borderRadius: theme.shape.borderRadius,
            background: alpha(theme.palette.background.default, 0.5),
        },
        removeButton: {
            position: "absolute  !important",
            right: 0,
            top: 0
        },
    }

})
const PostInput = () => {
    const classes = useStyles()

    const { auth, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const theme = useTheme()
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);


    const [showEmoji, setShowEmoji] = useState(false)
    const textInputCursorRef = useRef()
    const handleShowEmoji = (e) => { setShowEmoji(!showEmoji) }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        const cursor = textInputCursorRef.current.selectionStart;
        const message = content.slice(0, cursor) + emoji + content.slice(cursor);
        setContent(message);
        setShowEmoji(false)
    };


    const handleInputImageClick = (e) => { e.target.value = '' }

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }

    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (content || images.length !== 0) {
            dispatch(createPost({ content, images, auth, socket }));
        } else {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo or content" } })
        }

        setContent("");
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUS, payload: false })
    };


    return (
        <Box className={classes.wrapper}>
            {showEmoji && <Picker onSelect={addEmoji} set="facebook" theme={theme.palette.mode} showPreview={false} autoFocus style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: "6000" }} color={theme.palette.primary.light} showSkinTones={false} />}
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.inputWrapper}>
                            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "flex", md: "none" } }}>
                                <Avatar src={auth.user.profileImage} />
                                <Button fullWidth startIcon={<Add />} onClick={() => { dispatch({ type: GLOBALTYPES.STATUS, payload: true }) }} variant="contained" disableElevation>Create Your Post</Button>
                            </Stack>
                            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
                                <Avatar src={auth.user.profileImage} />
                                <TextField inputRef={textInputCursorRef} multiline maxRows={10} value={content} onChange={e => setContent(e.target.value)} className={classes.input} variant="standard" placeholder={`What's on your mind, ${auth.user.fullname} ?`} />
                                <Box>
                                    <input onClick={handleInputImageClick} type="file" name="file" hidden id="icon-button-file-seven" multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                    <label htmlFor="icon-button-file-seven">
                                        <IconButton component="span">
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                    </label>
                                </Box>
                                <Box>
                                    <IconButton onClick={handleShowEmoji}>
                                        <InsertEmoticon />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <Button type="submit" variant="contained" disableElevation disabled={content || images.length !== 0 ? false : true}>Create</Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    {images.length !== 0 && <Grid item xs={12}>
                        <Box className={classes.imagesWrapper}>
                            {images.map((img, index) => (
                                <Box key={index} className={classes.imageVideoWrapper}>
                                    <IconButton className={classes.removeButton} onClick={() => deleteImages(index)}>
                                        <Cancel />
                                    </IconButton>
                                    {img.camera ? ImageShow(img.camera, classes.imageVideo, "180px", "auto") : img.url
                                        ? <>{IsVideo(img.url) ? VideoShow(img.url, classes.imageVideo, "180px", "auto") : ImageShow(img.url, classes.imageVideo, "180px", "auto")}</>
                                        : <>{IsVideo(img.type) ? VideoShow(URL.createObjectURL(img), classes.imageVideo, "180px", "auto") : ImageShow(URL.createObjectURL(img), classes.imageVideo, "180px", "auto")}</>
                                    }
                                </Box>
                            ))}
                        </Box>
                    </Grid>}
                </Grid>
            </form>
        </Box>
    )
}

export default PostInput
