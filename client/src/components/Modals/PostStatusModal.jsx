import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    Box,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    IconButton,
    TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Cancel } from "@mui/icons-material";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createPost, updatePost } from "../../redux/actions/postAction"
import { ImageShow, VideoShow } from "../../utils/MediaShow"
import { IsVideo } from "../../utils/MediaCheck";

const useStyles = makeStyles((theme) => {
    return {
        imagesWrapper: {
            display: 'flex',
            overflowX: "auto",
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            marginTop: 8,
            marginBottom: 8,
            padding: 4
        },
        imageWrapper: {
            position: "relative",
            lineHeight: 0,
        },
        imageVideo: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            height: 'auto !important',
            margin: 4,
        },
        removeButton: {
            position: "absolute !important",
            right: 4,
            top: 4,
            zIndex:5001,
            
        },
        streamVideoWrapper: {
            position: "relative ",
        },
        streamVideo: {
            borderRadius: theme.shape.borderRadius,
        },
    };
});

const StatusModal = () => {
    const classes = useStyles();
    const { auth, status, socket } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);


    const [stream, setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks, setTracks] = useState('')

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

    const handleStream = () => {
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(mediaStream => {
                        videoRef.current.srcObject = mediaStream
                        videoRef.current.play()

                        const track = mediaStream.getTracks()
                        setTracks(track[0])
                    }).catch(err => {
                        setStream(false)
                        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong while accessing your webcam or camera" } })
                    })
            }
            setStream(true)

        } catch (error) {

            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Stream Unsuccessful" } })

        }

    }

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }

    const handleStopStream = () => {
        if (tracks.stop) {
            tracks.stop()
            setStream(false)
        }
        setStream(false)
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (status.onEdit) {
            dispatch(updatePost({ content, images, auth, status }));
        } else {
            if (images.length !== 0 || content) {
                dispatch(createPost({ content, images, auth, socket }));
            } else {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your content or Media" } })
            }
        }

        setContent("");
        setImages([]);
        dispatch({ type: GLOBALTYPES.STATUS, payload: false })
    };

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setImages(status.images);
        }
    }, [status]);

    const handleDrawerClose = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    };

    return (
        <Box className={classes.wrapper}>
            <Dialog maxWidth="sm" open={true} scroll="body" onClose={handleDrawerClose} fullWidth>
                <form onSubmit={handleSubmit}>
                    <DialogTitle >Create Post</DialogTitle>
                    <DialogContent>
                        <Box>

                            {!stream ? <Box><TextField variant="outlined" fullWidth multiline placeholder="Write Here" rows={10} value={content} onChange={e => setContent(e.target.value)} /></Box> : ""}

                            {images.length !== 0 && <Box className={classes.imagesWrapper}>
                                {images.map((img, index) => (
                                    <Box key={index} className={classes.imageWrapper}>
                                        <Box>
                                            <IconButton className={classes.removeButton} onClick={() => deleteImages(index)}>
                                                <Cancel />
                                            </IconButton>
                                        </Box>
                                        {img.camera ? ImageShow(img.camera, classes.imageVideo, "180px", "80px") : img.url
                                            ? <>{IsVideo(img.url) ? VideoShow(img.url, classes.imageVideo, "180px", "80px") : ImageShow(img.url, classes.imageVideo, "180px", "80px")}</>
                                            : <>{IsVideo(img.type) ? VideoShow(URL.createObjectURL(img), classes.imageVideo, "180px", "80px") : ImageShow(URL.createObjectURL(img), classes.imageVideo, "180px", "80px")}</>
                                        }
                                    </Box>
                                ))}
                            </Box>}

                            {stream &&
                                <Box className={classes.streamVideoWrapper}>
                                    <IconButton className={classes.removeButton} onClick={handleStopStream}>
                                        <Cancel />
                                    </IconButton>
                                    <video className={classes.streamVideo} autoPlay muted ref={videoRef} width="100%" height="90%" style={{ margin: "auto" }} />
                                    <canvas ref={refCanvas} style={{ display: 'none' }} />
                                </Box>
                            }

                            <Box pt={1} pb={1} display="flex" alignItems="center" justifyContent="center">
                                {stream ?
                                    <IconButton component="span" onClick={handleCapture}><Camera /></IconButton>
                                    : <>
                                        <IconButton component="span" onClick={handleStream}><Camera /></IconButton>
                                        <Box>
                                            <input onClick={handleInputImageClick} type="file" name="file" hidden id="icon-button-file-five" multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                            <label htmlFor="icon-button-file-five">
                                                <IconButton component="span" className={classes.button}>
                                                    <AddPhotoAlternateIcon />
                                                </IconButton>
                                            </label>
                                        </Box>
                                    </>
                                }

                            </Box>

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleDrawerClose} >
                            Cancel
                        </Button>
                        <Button type="submit" variant="gradient" color="secondary">
                            Post
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default StatusModal;
