import { AddCircleOutline } from '@mui/icons-material'
import {  Button, Box, Tooltip, IconButton } from '@mui/material'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'
import { alpha } from '@mui/system'
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ImageShow, VideoShow } from "../../../utils/MediaShow"
import { IsVideo } from "../../../utils/MediaCheck";
import { createStory } from '../../../redux/actions/storyAction';

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            background: theme.palette.mode === "dark" ? alpha(theme.palette.common.white, 0.1): alpha(theme.palette.primary.light, 0.2),
            borderRadius: theme.shape.borderRadius,
            minWidth: 100,
            minHeight: 180,
            maxWidth: 100,
            maxHeight: 180,
            width: "100%",
            height: "100%",
            margin: 4,
            cursor: "pointer",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        CloseIcon: {
            position: "absolute !important",
            right: 8,
            top: 8,
            color: theme.palette.grey[900],
            strokeWidth: 1,
            stroke: theme.palette.text.primary,
        },
    }

})
const AddYourStory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { auth } = useSelector((state) => state)

    const [media, setMedia] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

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
        if (media.length !== 0) {
            dispatch(createStory({ media, auth }))
            setMedia("");
            handleDialogClose()
        } else {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo" } })
        }
    };

    useEffect(() => {
        setMedia("");
    }, [setMedia])


    const handleDialogClose = (e) => {
        setDialogOpen(false)
    };

    return (
        <Box className={classes.wrapper} >
            <Tooltip title="Add your Story">
                <IconButton onClick={() => { return setDialogOpen(true) }}>
                    <AddCircleOutline />
                </IconButton>
            </Tooltip>
                <Dialog PaperProps={{ className: classes.dialogPaper }} maxWidth="xs" open={dialogOpen} fullWidth>
            <form onSubmit={handleSubmit}>
                    {/* CloseIcon  */}
                    <Tooltip title="Close" arrow>
                        <IconButton className={classes.CloseIcon} onClick={handleDialogClose} >
                            <Close color="inherit" fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {/* Dialog Title */}
                    <DialogTitle>Create Your Story</DialogTitle>
                    {/* Dialog Form/Content */}
                    <DialogContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box textAlign="center">
                                    <input onClick={handleInputImageClick} type="file" name="file" hidden id="icon-button-input-image-file" accept="image/*,video/*" onChange={handleChangeImage} />
                                    <label htmlFor="icon-button-input-image-file">
                                        <IconButton component="span" className={classes.button}>
                                            <AddPhotoAlternateIcon />
                                        </IconButton>
                                    </label>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {media &&
                                    <Box>
                                        {IsVideo(media.type) ? VideoShow(URL.createObjectURL(media), classes.imageVideo, "400px", "auto") : ImageShow(URL.createObjectURL(media), classes.imageVideo, "400px", "auto")}
                                    </Box>}
                            </Grid>
                        </Grid>
                    </DialogContent>

                    {/* Dialog Actions */}
                    <DialogActions>
                        <Button disabled={media === '' ? true : false} type="submit" variant="contained">
                            Create
                        </Button>
                        <Button onClick={handleDialogClose} disableElevation variant="outlined">
                            Cancel
                        </Button>
                    </DialogActions>
            </form>
                </Dialog>
        </Box>
    )
}

export default AddYourStory
