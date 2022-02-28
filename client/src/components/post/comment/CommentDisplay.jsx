import React, { useState, useEffect } from 'react'
import CommentCard from './CommentCard'
import { Box, IconButton, Tooltip } from "@mui/material"
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'

const CommentDisplay = ({ comment, post, replyCm }) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(0)

    useEffect(() => {
        setShowRep(replyCm.slice(replyCm.length - next))
    }, [replyCm, next])

    return (
        <Box>
            <CommentCard comment={comment} post={post} commentId={comment._id}
                seeReply={replyCm.length - next > 0
                    ?
                    <Box alignItems="center" jutifyContent="center">
                        <Tooltip title="View Replies">
                            <IconButton onClick={() => { setNext(next + 10) }}>
                                <ArrowDownward fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        {replyCm.length}
                    </Box>
                    : replyCm.length > 0 &&
                    <Box  alignItems="center" jutifyContent="center">
                        <Tooltip title="Hide Replies">
                            <IconButton onClick={() => setNext(0)}>
                                <ArrowUpward fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        {replyCm.length}
                    </Box>
                }
            >
                <Box sx={{ pl: 8 }}>
                    {
                        showRep.map((item, index) => (
                            item.reply &&
                            <CommentCard
                                key={index}
                                comment={item}
                                post={post}
                                commentId={comment._id}
                            />
                        ))

                    }

                </Box>
            </CommentCard >
        </Box >
    )
}

export default CommentDisplay
