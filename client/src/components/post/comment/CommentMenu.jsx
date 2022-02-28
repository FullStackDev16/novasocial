import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'
import { IconButton, Tooltip, Box, MenuItem, Menu as MUIMenu, ListItemIcon } from '@mui/material'
import { DeleteOutline, EditOutlined, FlagOutlined, MoreVertOutlined } from '@mui/icons-material'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => {
    return {
        MUIMenu: {
           
        },
    }
})

const CommentMenu = ({ post, comment, setOnEdit, handleReplyToComment }) => {
    const classes = useStyles()

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {setAnchorEl(event.currentTarget)}
    const handleMenuClose = () => {setAnchorEl(null)}

    const handleRemove = () => {
        if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
            dispatch(deleteComment({ post, auth, comment, socket }))
        }
    }

    const Menu = (
        <MUIMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} PaperProps={{ className: classes.MUIMenu }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <MenuItem onClick={() => setOnEdit(true)}>
                <ListItemIcon >
                    <EditOutlined fontSize="small" />
                </ListItemIcon>
                Edit
            </MenuItem>
            <MenuItem onClick={handleRemove}>
                <ListItemIcon>
                    <DeleteOutline fontSize="small" />
                </ListItemIcon>
                Delete
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <FlagOutlined fontSize="small" />
                </ListItemIcon>
                Report
            </MenuItem>
            <MenuItem onClick={handleReplyToComment}>
                <ListItemIcon>
                    <FlagOutlined fontSize="small" />
                </ListItemIcon>
                Reply
            </MenuItem>
        </MUIMenu>
    )

    return (
        <Box>
            {(post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <Box>
                    <Tooltip title="Menu">
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertOutlined fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    {post.user._id === auth.user._id ? comment.user._id === auth.user._id ? Menu :
                        <MUIMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} PaperProps={{ className: classes.MUIMenu }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
                            <MenuItem onClick={handleRemove}>
                                <ListItemIcon>
                                    <DeleteOutline fontSize="small" />
                                </ListItemIcon>
                                Delete
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <FlagOutlined fontSize="small" />
                                </ListItemIcon>
                                Report
                            </MenuItem>
                        </MUIMenu> : comment.user._id === auth.user._id && Menu
                    }

                </Box>
            }

        </Box>
    )
}

export default CommentMenu
