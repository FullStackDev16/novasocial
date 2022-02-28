import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'
import { Box, InputAdornment, Button, InputBase, ListItemButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Close } from '@mui/icons-material'
import UserCardOne from '../smallComponents/UserCards/UserCardOne'
import UserCardFour from '../smallComponents/UserCards/UserCardFour'
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => {
    return {
        searchBarWrapper: {
        },
        searchBar: {
            width: "100%",
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            padding: "0.3rem 0.8rem",
        },
        listItemButton: {
            margin: "10px 0px !important",
            padding: "5px !important",
            borderRadius: `${theme.shape.borderRadius}px !important`,
             '&.Mui-selected': {
                background: `${theme.palette.background.default} !important`,
                color: `${theme.palette.primary.light} !important`,
              },
        },
    }
})

const LeftSide = () => {
    const classes = useStyles()

    const { auth, message, online } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const { pathname } = useLocation();

    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const pageEnd = useRef()
    const [page, setPage] = useState(0)


    const handleSearch = async () => {
        if (!search) return setSearchUsers([]);
        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users.filter(user => user._id !== auth.user._id))
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }

    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
        dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
        return history.push(`/message/${user._id}`)
    }

    const isActive = (user) => { if (id === user._id) return 'active'; return '' }

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }))
    }, [dispatch, auth, message.firstLoad])

    // Load More
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(p => p + 1)
            }
        }, { threshold: 0.1 })
        observer.observe(pageEnd.current)
    }, [setPage])

    useEffect(() => {
        if (message.resultUsers >= (page - 1) * 9 && page > 1) { dispatch(getConversations({ auth, page })) }
    }, [message.resultUsers, page, auth, dispatch])

    useEffect(() => { if (message.firstLoad) { dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online }) } }, [online, message.firstLoad, dispatch])

    return (
        <Box>
            <Box className={classes.searchBarWrapper}>
                <InputBase className={classes.searchBar} value={search} onChange={e => { setSearch(e.target.value); handleSearch() }} placeholder="Search..."
                    startAdornment={<InputAdornment position="start">
                        {!search ? <SearchIcon fontSize="small" /> : ""}
                    </InputAdornment>}
                    endAdornment={<InputAdornment position="end">
                        {!search ? "" : <Close className={classes.cursorPointer} fontSize="small" onClick={() => { setSearch("") }} />}
                    </InputAdornment>}>
                </InputBase>
            </Box>

            <Box>
                {search.length !== 0 && searchUsers.length !== 0 ? <>
                    {searchUsers.map(user => (
                        <Box key={user._id} className={`${isActive(user)}`} onClick={() => handleAddUser(user)}>
                            <ListItemButton className={classes.listItemButton}>
                                <UserCardOne image={user.profileImage} fullname={user.fullname} username={user.username} />
                            </ListItemButton>

                        </Box>
                    ))
                    }
                </>
                    : <>
                        {message.users.map(user => (
                            <Box key={user._id} className={`message_user ${isActive(user)}`} onClick={() => handleAddUser(user)}>
                                <ListItemButton selected={pathname.includes(user._id)} className={classes.listItemButton}>
                                    <UserCardFour user={user} />
                                </ListItemButton>
                            </Box>
                        ))
                        }
                    </>
                }

                <Button ref={pageEnd} style={{ opacity: 0 }} >Load More</Button>
            </Box>
        </Box>
    )
}

export default LeftSide
