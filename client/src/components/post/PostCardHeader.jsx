import React, { useState } from 'react'
import { makeStyles } from "@mui/styles"
import moment from 'moment'
import { Avatar, Box, CardHeader, IconButton, ListItemIcon, Menu, MenuItem, Typography, } from '@mui/material'
import { DeleteOutline, EditOutlined, MoreVertOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { deletePost } from '../../redux/actions/postAction'
import { BASE_URL } from '../../utils/config'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const useStyles = makeStyles((theme) => {
    return {
        MenuPaper: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: 0.1,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },

        }
    }
})

const PostCardHeader = ({ post }) => {
    const classes = useStyles()

    const { auth, socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } })
    }
    const handleDeletePost = () => {
        if (window.confirm("Are you sure want to delete this post?")) {
            dispatch(deletePost({ post, auth, socket }))
            return history.push("/")
        }
    }
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => { setAnchorEl(event.currentTarget) };
    const handleMenuClose = () => { setAnchorEl(null) };

    const HeaderMenu = () => {
        return (
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} onClick={handleMenuClose} PaperProps={{ elevation: 0, className: classes.MenuPaper }}>
                <Box>
                    {auth.user._id === post.user._id &&
                        <>
                            <MenuItem onClick={handleDeletePost}>
                                <ListItemIcon>
                                    <DeleteOutline fontSize="small" />
                                </ListItemIcon>
                                Delete
                            </MenuItem>
                            <MenuItem onClick={handleEditPost}>
                                <ListItemIcon>
                                    <EditOutlined fontSize="small" />
                                </ListItemIcon>
                                Edit
                            </MenuItem>
                        </>
                    }
                    <MenuItem onClick={handleCopyLink}>
                        <ListItemIcon>
                            <DeleteOutline fontSize="small" />
                        </ListItemIcon>
                        Copy Link
                    </MenuItem>
                </Box>
            </Menu>
        )
    }

    return (
        <Box className={classes.wrapper}>
            <CardHeader
                avatar={<Avatar src={post.user.profileImage} component={Link} to={`/profile/${post.user._id}`}></Avatar>}
                action={<IconButton onClick={handleMenuOpen}><MoreVertOutlined fontSize="small" /></IconButton>}
                title={<Typography variant="subtitle2" sx={{ display: "inline" }}>{post.user.fullname}</Typography>}
                subheader={moment(post.createdAt).fromNow()}
            />
            {HeaderMenu()}
        </Box>
    )
}

export default PostCardHeader
