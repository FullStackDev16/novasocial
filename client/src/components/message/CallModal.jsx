import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { addMessage } from '../../redux/actions/messageAction'
import Ringing from '../../media/audio/ringing.wav'
import { Avatar, Box, Dialog, DialogContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { CallEndOutlined } from '@mui/icons-material'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => {
    return {
        avatar: {
            width: "20rem !important",
            height: "20rem !important",
            margin: "auto"

        }
    }
})

const CallModal = () => {
    const classes = useStyles()

    const { call, auth, peer, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const [second, setSecond] = useState(0)
    const [total, setTotal] = useState(0)

    const [answer, setAnswer] = useState(false)
    const youVideo = useRef()
    const otherVideo = useRef()
    const [tracks, setTracks] = useState(null)
    const [newCall, setNewCall] = useState(null)



    // Set Time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1)
            setTimeout(setTime, 1000)
        }
        setTime()

        return () => setTotal(0)
    }, [])

    useEffect(() => {
        setSecond(total % 60)
        setMins(parseInt(total / 60))
        setHours(parseInt(total / 3600))
    }, [total])

    // End Call
    const addCallMessage = useCallback((call, times, disconnect) => {
        if (call.recipient !== auth.user._id || disconnect) {
            const msg = {
                sender: call.sender,
                recipient: call.recipient,
                text: '',
                media: [],
                call: { video: call.video, times },
                createdAt: new Date().toISOString()
            }
            dispatch(addMessage({ msg, auth, socket }))
        }
    }, [auth, dispatch, socket])

    const handleEndCall = () => {
        tracks && tracks.forEach(track => track.stop())
        if (newCall) newCall.close()
        let times = answer ? total : 0
        socket.emit('endCall', { ...call, times })

        addCallMessage(call, times)
        dispatch({ type: GLOBALTYPES.CALL, payload: null })
    }

    useEffect(() => {
        if (answer) {
            setTotal(0)
        } else {
            const timer = setTimeout(() => {
                socket.emit('endCall', { ...call, times: 0 })
                addCallMessage(call, 0)
                dispatch({ type: GLOBALTYPES.CALL, payload: null })
            }, 15000)

            return () => clearTimeout(timer)
        }

    }, [dispatch, answer, call, socket, addCallMessage])

    useEffect(() => {
        socket.on('endCallToClient', data => {
            tracks && tracks.forEach(track => track.stop())
            if (newCall) newCall.close()
            addCallMessage(data, data.times)
            dispatch({ type: GLOBALTYPES.CALL, payload: null })
        })

        return () => socket.off('endCallToClient')
    }, [socket, dispatch, tracks, addCallMessage, newCall])


    // Stream Media
    const openStream = (video) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true, video })
                .then(mediaStream => {
                    return mediaStream
                }).catch(err => {
                    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong while accessing your webcam or camera" } })
                    return false
                })
        }
    }
    const playStream = (tag, stream) => {
        let video = tag;
        video.srcObject = stream;
        video.play()
    }
    // Answer Call
    const handleAnswer = () => {
        openStream(call.video).then(stream => {
            playStream(youVideo.current, stream)
            const track = stream.getTracks()
            setTracks(track)

            const newCall = peer.call(call.peerId, stream);
            newCall.on('stream', function (remoteStream) {
                playStream(otherVideo.current, remoteStream)
            });
            setAnswer(true)
            setNewCall(newCall)
        })
    }

    useEffect(() => {
        peer.on('call', newCall => {
            openStream(call.video).then(stream => {
                if (youVideo.current) {
                    playStream(youVideo.current, stream)
                }
                const track = stream.getTracks()
                setTracks(track)

                newCall.answer(stream)
                newCall.on('stream', function (remoteStream) {
                    if (otherVideo.current) {
                        playStream(otherVideo.current, remoteStream)
                    }
                });
                setAnswer(true)
                setNewCall(newCall)
            })
        })
        return () => peer.removeListener('call')
    }, [peer, call.video])

    // Disconnect
    useEffect(() => {
        socket.on('callerDisconnect', () => {
            tracks && tracks.forEach(track => track.stop())
            if (newCall) newCall.close()
            let times = answer ? total : 0
            addCallMessage(call, times, true)

            dispatch({ type: GLOBALTYPES.CALL, payload: null })

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: `The ${call.username} disconnect` }
            })
        })

        return () => socket.off('callerDisconnect')
    }, [socket, tracks, dispatch, call, addCallMessage, answer, total, newCall])

    // Play - Pause Audio
    const playAudio = (newAudio) => {
        newAudio.play()
    }

    const pauseAudio = (newAudio) => {
        newAudio.pause()
        newAudio.currentTime = 0
    }

    useEffect(() => {
        let newAudio = new Audio(Ringing)
        if (answer) {
            pauseAudio(newAudio)
        } else {
            playAudio(newAudio)
        }

        return () => pauseAudio(newAudio)
    }, [answer])


    return (
        <Box>
            <Dialog open={true} >

                <DialogContent>
                    <Box sx={{ display: (answer && call.video) ? 'none' : 'flex' }} >
                        <Box fullWidth textAlign="center">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Avatar src={call.profileImage} className={classes.avatar} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">{call.fullname}</Typography>
                                    <Typography variant="h6">{"@" + call.username}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {answer
                                        ? <Box>
                                            <Typography>
                                                {hours.toString().length < 2 ? '0' + hours : hours}
                                                : {mins.toString().length < 2 ? '0' + mins : mins}
                                                : {second.toString().length < 2 ? '0' + second : second}
                                            </Typography>
                                        </Box>
                                        : <Box>
                                            {call.video ? <Typography variant="h6">Video calling</Typography> : <Typography variant="h6">Audio Calling</Typography>}
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    {!answer &&
                                        <Box>
                                            <Typography>{mins.toString().length < 2 ? '0' + mins : mins} : {second.toString().length < 2 ? '0' + second : second}</Typography>
                                        </Box>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Tooltip title="End Call">
                                        <IconButton color="primary" onClick={handleEndCall}>
                                            <CallEndOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12}>
                                    {(call.recipient === auth.user._id && !answer) &&
                                        <>{call.video
                                            ? <Tooltip title="Answer Call">
                                                <IconButton color="primary" onClick={handleAnswer}>
                                                    <CallEndOutlined />
                                                </IconButton>
                                            </Tooltip>
                                            : <Tooltip title="Answer Call">
                                                <IconButton color="primary" onClick={handleAnswer}>
                                                    <CallEndOutlined />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                        </>
                                    }
                                </Grid>
                                <Grid item xs={12}>
                                    <Box style={{ opacity: (answer && call.video) ? '1' : '0', }} >

                                        <video ref={youVideo} playsInline muted width={300} height={200} />
                                        <video ref={otherVideo} playsInline width={300} height={200} />

                                        <Box>
                                            <Typography>{hours.toString().length < 2 ? '0' + hours : hours} : {mins.toString().length < 2 ? '0' + mins : mins} : {second.toString().length < 2 ? '0' + second : second}</Typography>
                                        </Box>

                                        <Tooltip title="End Call">
                                            <IconButton color="primary" onClick={handleEndCall}>
                                                <CallEndOutlined />
                                            </IconButton>
                                        </Tooltip>

                                    </Box>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>


                </DialogContent>
            </Dialog>


        </Box>
    )
}

export default CallModal
