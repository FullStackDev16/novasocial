import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import MessageDisplay from './MessageDisplay'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { ImageUpload } from '../../utils/imageUpload'
import { addMessage, getMessages, loadMoreMessages, deleteConversation } from '../../redux/actions/messageAction'
import { Avatar, Box, Grid, IconButton, InputBase, Tooltip, Typography } from '@mui/material'
import { AddPhotoAlternate, ArrowBack, CallOutlined, CancelOutlined, DeleteOutline, InsertEmoticon, RefreshOutlined, SendOutlined, VideoCallOutlined } from '@mui/icons-material'
import { IsVideo } from '../../utils/MediaCheck'
import { ImageShow, VideoShow } from '../../utils/MediaShow'
import { makeStyles } from "@mui/styles"
import SmallLoading from "../smallComponents/SmallLoading"
import DetectRTC from "detectrtc"
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useTheme } from '@emotion/react'

const useStyles = makeStyles((theme) => {
    return {
        chatHeader: {
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            padding: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        chatHeaderTitleWrapper: {
            display: 'flex',
            alignItems: 'center',
            flex: 1
        },
        chatHeaderAvatar: {
            width: "30px !important",
            height: "30px !important",
            margin: 8
        },
        chatInput: {
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            padding: 4,
        },
        emojiPickerReact: {
            background: `${theme.palette.background.paper} !important`,
            borderRadius: theme.shape.borderRadius,
            display: 'flex',
            overflowX: 'auto',
            padding: 4,
            margin: 4,
        },
        chatInputImages: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            display: 'flex',
            overflowX: 'auto',
            padding: 4,
            margin: 4,
        },
        imageVideo: {
            borderRadius: theme.shape.borderRadius,
            margin: 4,
        },
        imageVideoCutIcon: {
            position: "absolute !important",
            right: 5,
            top: 5
        },
        chatInputMessage: {
            background: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            display: "flex",
            padding: 4,
            margin: 4,
        },
        chatInputMessageTextField: {
            padding: "4px 8px !important",
            flex: "1 !important"
        },


        pageEndRefreshButton: {
            opacity: 0,
            display: "none !important",
            marginTop: "-25px"
        },
    }
})

const RightSide = () => {
    const classes = useStyles()
    const { auth, message, socket, peer } = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)

    const refDisplay = useRef()
    const pageEnd = useRef()

    const [showEmoji, setShowEmoji] = useState(false)
    const textInputCursorRef = useRef(null);
    const handleShowEmoji = (e) => { setShowEmoji(!showEmoji) }

    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(0)


    const history = useHistory()
    const theme = useTheme()

    DetectRTC.load()

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        const cursor = textInputCursorRef.current.selectionStart;
        const message = text.slice(0, cursor) + emoji + text.slice(cursor);
        setText(message);
        setShowEmoji(false)
    };


    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if (newData) {
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    }, [message.data, id])
    useEffect(() => {
        try {
            if (id && message.users.length > 0) {
                setTimeout(() => { refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, 50)
                const newUser = message.users.find(user => user._id === id)
                if (newUser) setUser(newUser)
            }
        } catch (e) { console.log(e) }
    }, [message.users, id])

    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."

            if (file.size > 1024 * 1024 * 5) {
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setMedia([...media, ...newMedia])
        e.target.value = ''

    }
    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)
        let newArr = [];
        if (media.length > 0) newArr = await ImageUpload(media)
        const msg = { sender: auth.user._id, recipient: id, text, media: newArr, createdAt: new Date().toISOString() }

        setLoadMedia(false)
        await dispatch(addMessage({ msg, auth, socket }))
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }

    useEffect(() => {
        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id)) {
                await dispatch(getMessages({ auth, id }))
                setTimeout(() => { refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, 50)
            }
        }
        getMessagesData()
    }, [id, dispatch, auth, message.data])


    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsLoadMore(p => p + 1)
            }
        }, {
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    }, [setIsLoadMore])

    useEffect(() => {
        if (isLoadMore > 1) {
            if (result >= page * 9) {
                dispatch(loadMoreMessages({ auth, id, page: page + 1 }))
                setIsLoadMore(1)
            }
        }
        // eslint-disable-next-line
    }, [isLoadMore])

    const handleDeleteConversation = () => {
        if (window.confirm('Do you want to delete?')) {
            dispatch(deleteConversation({ auth, id }))
            return history.push('/message')
        }
    }

    // Call
    const caller = ({ video }) => {
        const { _id, profileImage, username, fullname } = user
        const msg = { sender: auth.user._id, recipient: _id, profileImage, username, fullname, video }
        dispatch({ type: GLOBALTYPES.CALL, payload: msg })
    }
    const callUser = ({ video }) => {
        const { _id, profileImage, username, fullname } = auth.user
        const msg = { sender: _id, recipient: user._id, profileImage, username, fullname, video }
        if (peer.open) msg.peerId = peer._id
        socket.emit('callUser', msg)
    }

    const handleAudioCall = () => {
        if (user.online) {
            if (DetectRTC.hasMicrophone === false) {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "No Audio Device Found" } })
            }
            else {
                if (DetectRTC.isWebsiteHasMicrophonePermissions === false) {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(function (stream) {
                            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Thanks For Allowing Microphone Permission" } })
                        })
                        .catch(function (err) {
                            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please Allow Permisson For Microphone" } })
                        });
                } else {
                    caller({ video: true })
                    callUser({ video: true })
                }
            }
        }
        else {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "User Is Offline" } })

        }
    }
    const handleVideoCall = () => {
        if (user.online) {
            if (DetectRTC.hasWebcam === false) {
                dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "No Video Device Found" } })
            }
            else {
                if (DetectRTC.isWebsiteHasWebcamPermissions === false) {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(function (stream) {
                            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Thanks For Allowing Camera or Webcam Permission" } })
                        })
                        .catch(function (err) {
                            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please Allow Permisson For Camera or Webcam" } })
                        });
                } else {
                    caller({ video: true })
                    callUser({ video: true })
                }
            }
        } else {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "User Is Offline" } })

        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box className={classes.chatHeader}>
                    <Tooltip title="Go Back" arrow sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton size="small" onClick={() => { history.push("/message") }}>
                            <ArrowBack fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Box className={classes.chatHeaderTitleWrapper}>
                        <Link to={`/profile/${user._id}`}>
                            <Avatar className={classes.chatHeaderAvatar} src={user.profileImage} />
                        </Link>
                        <Typography variant="subtitle2">{user.fullname}</Typography>
                    </Box>
                    <Box>
                        {auth.user.following.find(followUser => followUser._id === user._id) &&
                            <>
                                <Tooltip title="audio calling is coming soon" arrow>
                                    <IconButton disabled size="small" onClick={handleAudioCall}>
                                        <CallOutlined fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="video calling is coming soon" arrow>
                                    <IconButton disabled size="small" onClick={handleVideoCall} >
                                        <VideoCallOutlined fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        }
                        <Tooltip title="Delete" arrow>
                            <IconButton size="small" onClick={handleDeleteConversation}>
                                <DeleteOutline fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box style={{ maxHeight: '360px', overflow: 'auto', height: "360px" }}>
                    <Box>
                        <Box ref={refDisplay}>
                            <IconButton ref={pageEnd} className={classes.pageEndRefreshButton}>
                                <RefreshOutlined />
                            </IconButton>
                            {data.map((msg, index) => (
                                <Box key={index}>
                                    {msg.sender !== auth.user._id && <MessageDisplay user={user} msg={msg} />}
                                    {msg.sender === auth.user._id && <MessageDisplay user={auth.user} msg={msg} data={data} />}
                                </Box>
                            ))
                            }
                            {loadMedia && <SmallLoading />}
                        </Box>
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <Grid container className={classes.chatInput}>
                        <Grid item xs={12}>
                            {media.length !== 0 &&
                                <Box className={classes.chatInputImages}>
                                    {media.map((item, index) => (
                                        <Box key={index} sx={{ position: 'relative', lineHeight: "0px" }}>
                                            {IsVideo(item.type) ? VideoShow(URL.createObjectURL(item), classes.imageVideo, "150px", "100px") : ImageShow(URL.createObjectURL(item), classes.imageVideo, "150px", "100px")}
                                            <IconButton className={classes.imageVideoCutIcon} onClick={() => handleDeleteMedia(index)} ><CancelOutlined /></IconButton>
                                        </Box>
                                    ))}
                                </Box>}
                        </Grid>
                        {showEmoji && <Picker onSelect={addEmoji} set="facebook" theme={theme.palette.mode} showPreview={false} autoFocus style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: "6000" }} color={theme.palette.primary.light} showSkinTones={false} />}
                        <Grid item xs={12}>
                            <Box className={classes.chatInputMessage}>

                                <span>
                                    <IconButton onClick={handleShowEmoji}>
                                        <InsertEmoticon />
                                    </IconButton>
                                </span>

                                <InputBase inputProps={{ ref: textInputCursorRef }} className={classes.chatInputMessageTextField} type="text" placeholder="Type Your Message..." multiline maxRows={5} value={text} onChange={e => setText(e.target.value)} />

                                <input type="file" name="file" id="icon-button-file-input" hidden multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                                <label htmlFor="icon-button-file-input">
                                    <IconButton component="span">
                                        <AddPhotoAlternate />
                                    </IconButton>
                                </label>


                                <span>
                                    <IconButton type="submit" disabled={(text || media.length > 0) ? false : true}>
                                        <SendOutlined />
                                    </IconButton>
                                </span>

                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Grid >
        </Grid >
    )
}

export default RightSide
