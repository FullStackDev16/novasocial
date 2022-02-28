import { Avatar, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import StatusShower from "../../home/Status/StatusShower"

const useStyles = makeStyles((theme) => {
    return {
        wrapper: {
            borderRadius: theme.shape.borderRadius,
            margin: 4,
            minWidth: 100,
            minHeight: 180,
            maxWidth: 100,
            maxHeight: 180,
            width: "100%",
            height: "100%",
            cursor: 'pointer',
            display: 'flex',
            position: "relative",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center",
            backgroundColor:theme.palette.background.default
        },
        avatar: {
            position: 'absolute !important',
            top: "75%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            border: "2px solid white"
        },
    }

})
const StatusCardOne = ({ thumbnail, avatar, stories }) => {
    const classes = useStyles()
    const [status, setStatus] = useState(false);

    const handleShowStatus = () => {
        setStatus(true)
    }

    return (
        <Box>
            {status && <StatusShower stories={stories} setStatus={setStatus} />}
            <Box className={classes.wrapper} onClick={handleShowStatus} sx={{backgroundImage:`url(${thumbnail})`}}>
                <Avatar className={classes.avatar} sx={{ width: 50, height: 50 }} src={avatar} />
            </Box>
        </Box>
    )
}

export default StatusCardOne
