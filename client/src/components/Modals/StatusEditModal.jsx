import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    Box,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
    IconButton,
    Button,
    TextField,
    Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createStory } from "../../redux/actions/storyAction";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ImageShow, VideoShow } from "../../utils/MediaShow"
import { IsVideo } from "../../utils/MediaCheck";

const useStyles = makeStyles((theme) => {
    return {
        dialogPaper: {
            height: "100%"
        },
        dialogContent: {
            padding: "10px !important"
        },
        imageVideo: {
            maxWidth:200,
            maxHeight:500,
        },
        CloseIcon: {
            position: "absolute !important",
            right: 8,
            top: 8,
            color: theme.palette.grey[900],
            strokeWidth: 1,
            stroke: theme.palette.text.primary,
        },
    };
});


const StatusEditModal = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state)

    const [content, setContent] = useState("");
    const [media, setMedia] = useState("");

    const handleInputImageClick = (e) => { e.target.value = '' }

    const handleChangeImage = e => {
        const file = e.target.files[0]
        let err = ""

        if (!file) return err = "File does not exist."
        if (file.size > 1024 * 1024 * 5) { return err = "The image/video largest is 5mb." }

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setMedia(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content || media.length !== 0) {
            dispatch(createStory({ content, media, auth }))
            setContent("");
            setMedia([]);
            dispatch({ type: GLOBALTYPES.STATUS_EDIT, payload: false })
        } else{
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo or content" } })
        }
        
    };

    const handleStatusEditClose = () => {
        dispatch({ type: GLOBALTYPES.STATUS_EDIT, payload: false })
    }



    return (
        <Box className={classes.wrapper}>
            <Dialog PaperProps={{ className: classes.dialogPaper }} maxWidth="sm" open={true} fullWidth>

                {/* CloseIcon  */}
                <Tooltip title="Close" arrow>
                    <IconButton className={classes.CloseIcon} onClick={handleStatusEditClose} >
                        <Close color="inherit" fontSize="small" />
                    </IconButton>
                </Tooltip>

                {/* Dialog Title */}
                <DialogTitle>Post Your Status</DialogTitle>

                {/* Dialog Form/Content */}
                <DialogContent>
                    <Box>

                        <Grid container>
                            <Grid item xs={12}>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth variant="outlined" helperText={`${content.length}/200`} multiline error={content.length > 200 ? true : false} placeholder="Write Here" rows={5} value={content} onChange={e => setContent(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input onClick={handleInputImageClick} type="file" name="file" hidden id="icon-button-input-image-file" multiple accept="image/*,video/*" onChange={handleChangeImage} />
                                            <label htmlFor="icon-button-input-image-file">
                                                <IconButton component="span" className={classes.button}>
                                                    <AddPhotoAlternateIcon />
                                                </IconButton>
                                            </label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {media &&
                                                <Box>
                                                    {IsVideo(media.type) ? VideoShow(URL.createObjectURL(media), classes.imageVideo, "auto", "auto") : ImageShow(URL.createObjectURL(media), classes.imageVideo, "auto", "auto")}
                                                </Box>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" fullWidth variant="contained">
                                                Create
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                {/* Dialog Actions */}
                <DialogActions>
                    <Button disableElevation variant="outlined" onClick={handleStatusEditClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StatusEditModal;
