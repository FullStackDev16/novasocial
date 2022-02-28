import React, { useEffect } from "react";
import {
    Box,
    Tooltip,
    IconButton,
    Fade,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close, DeleteOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import StatusComponent from "./StatusComponent";
import { deleteStory } from "../../../redux/actions/storyAction";

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "#000",
            height: "100%",
            width: "100%",
            zIndex: 10000,
            textAlign: 'center',
            overflow: "hidden",
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
        DeleteIcon: {
            position: "absolute !important",
            right: 48,
            top: 8,
            color: theme.palette.grey[900],
            strokeWidth: 1,
            stroke: theme.palette.text.primary,
        },
    };
});

const StatusShower = ({ stories, setStatus }) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const { auth } = useSelector((state) => state)

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [document]);

    const handleClose = () => {
        document.body.style.overflow = 'auto';
        setStatus(false)
    }
    const handleDeleteStory = () => {
        document.body.style.overflow = 'auto';
        setStatus(false)
        if (window.confirm("Are you sure want to delete your status?")) {
            dispatch(deleteStory(auth))
        }
    }

    return (

        <Fade in={true} timeout={1000}>
            <Box className={classes.wrapper}>
                {/* CloseIcon  */}
                <Tooltip title="Close" arrow>
                    <IconButton className={classes.CloseIcon} onClick={handleClose} >
                        <Close />
                    </IconButton>
                </Tooltip>

                {auth.user.story === stories[0].url &&
                    <>
                        <Tooltip title="Delete" arrow>
                            <IconButton className={classes.DeleteIcon} onClick={handleDeleteStory} >
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                    </>
                }

                <StatusComponent stories={stories} onAllStoriesEnd={handleClose} />
            </Box>
        </Fade >
    );
};

export default StatusShower;
