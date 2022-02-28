import React, { useEffect, useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  InputAdornment,
  Toolbar,
  InputBase,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Avatar,
  ListItemButton,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { logout } from "../redux/actions/authAction";
import {  BookmarkBorder, ChatBubbleOutline, SettingsOutlined, Close, HomeOutlined, LogoutOutlined, PersonOutlined, ExploreOutlined, HelpOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Theme from "../theme/themeCustomizer"
import NotifyModal from "./Modals/NotifyModal";
import Logo from "./smallComponents/Logo/Logo"
import UserCardOne from "./smallComponents/UserCards/UserCardOne"

const useStyles = makeStyles((theme) => {
  return {

    appBar: {
      zIndex: `${theme.zIndex.drawer + 1} !important`,
      background: `${theme.palette.background.paper} !important`,
      [theme.breakpoints.down("sm")]: {
        zIndex: `${theme.zIndex.drawer} !important`,
      },
    },
    toolbar: {
      padding: "0 !important",
      justifyContent: 'space-between',
      alignItems: 'space-between',
      width: "80% !important",
      margin: "0 auto !important",
      [theme.breakpoints.down("md")]: {
        width: "90% !important",
      },
      [theme.breakpoints.down("lg")]: {
        width: "96% !important",
      }
    },
    appBarLogo: {
      width: "200px !important",
      height: "40px !important",
      padding: "0px 15px",
      [theme.breakpoints.down("sm")]:{
        display:'none !important'
      }
    },
    appBarLogoSecond: {
      width: "200px !important",
      height: "40px !important",
      padding: "0px 15px",
    },
    searchBarWrapper: {
      posiiton: 'relative'
    },
    searchBar: {
      width: "30vw",
      background: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
      padding: "0px 12px",
      [theme.breakpoints.down("sm")]: {
        width: "20ch",
      },
    },
    searchBarBorderRemove: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    searchUserBox: {
      position: "absolute",
      background: theme.palette.background.default,
      boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      minWidth: 200,
      width: "100%",
      maxHeight: "80vh",
      maxWidth: "30vw",
      overflow: "auto",
    },
    createButton: { marginRight: "5px !important" },
    container: {
      padding: "8px 0 25px 0",
      width: "85% !important",
      margin: "0 auto !important",
      [theme.breakpoints.down("md")]: {
        width: "90% !important",
      },
      [theme.breakpoints.down("lg")]: {
        width: "96% !important",
      }
    },
    leftSide: {
      position: "sticky",
      top: 48
    },


    mobileDrawerToggler: {
      [theme.breakpoints.up("sm")]: {
        display: 'none !important'
      }
    },
    desktopDrawer: {
      maxWidth: "100vw",
      display: "block !important",
      [`& .MuiDrawer-paper`]: {
        position: "relative !important",
        maxWidth: "100vw",
        border: 0,
        padding: "0.6rem",
        borderRadius: theme.shape.borderRadius,
      },
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      }
    },
    mobileDrawer: {
      width: 260,
      maxWidth: "100vw",
      display: "none !important",
      [`& .MuiDrawer-paper`]: {
        maxWidth: "100vw",
        width: 260,
        border: 0,
      },
      [theme.breakpoints.down("sm")]: {
        display: "block !important",
      }
    },
    mobileDrawerPaper: {
        padding: "0.6rem",
        background:`${theme.palette.background.paper} !important`
    },


    desktopList: {
      overflow: 'auto',
      ["&::-webkit-scrollbar"]: {
        width: "0 !important",
      }
    },

    listItemButton: {
      margin: "4px 0px !important",
      color: `grey !important`,
      borderRadius: `${theme.shape.borderRadius}px !important`,
      borderLeft: `6px solid transparent !important`,
      '& .MuiListItemIcon-root': {
        minWidth: "30px !important",
        color: `${theme.palette.mode === "light" ? "grey" : "#fff"} !important`
      },
      '& .MuiListItemText-root': {
        color: `${theme.palette.mode === "light" ? "grey" : "#fff"} !important`,
      },
      '&.Mui-selected': {
        color: `${theme.palette.primary.light} !important`,
        borderLeft: `6px solid ${theme.palette.primary.light} !important`,
        borderTopLeftRadius: "0 !important",
        borderBottomLeftRadius: "0 !important",
      },
      '&.Mui-selected .MuiListItemIcon-root': {
        color: `${theme.palette.primary.main} !important`,
      },
      '&.Mui-selected .MuiListItemText-root': {
        color: `${theme.palette.primary.main} !important`,
      },
    },



    cursorPointer: {
      cursor: 'pointer'
    },
    createPostButton: {
      padding: '0.5rem 1rem !important',
    },
    avatar: {
      width: '25px !important',
      height: '25px !important',
    },
    link: {
      color: 'grey'
    },

  };
});

const Header = ({ children }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);


  // ---------------------------------------------Search-------------------------------------
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([]);
  const handleSearchInput = (e) => { setSearch(e.target.value.toLowerCase().replace(/ /g, "")) }

  useEffect(() => {
    setLoading(true);
    if (search && auth.token) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => { setUsers(res.data.users) })
        .catch((err) => { dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response } }) });
      setLoading(false);
    }
  }, [search, auth.token, dispatch]);

  const searchUserBox = (
    <Box className={classes.searchUserBox}>
      <List>
        {users.map((user, index) => (
          <Link key={index} to={`/profile/${user._id}`} className={classes.link} onClick={() => { setSearch("") }}>
            <ListItemButton>
              <ListItemIcon>
                <Avatar src={user.profileImage} />
              </ListItemIcon>
              <ListItemText primary={user.fullname} secondary={"@" + user.username} />
            </ListItemButton>
          </Link>
        ))}
        {!loading && users.length === 0 ? (<ListItemButton><ListItemText className={classes.link} primary="Oops! no user Found" /></ListItemButton>) : ("")}
      </List>
    </Box>
  )
  const searchBase = (
    <Box className={classes.searchBarWrapper}>
      <InputBase className={!search ? classes.searchBar : [classes.searchBar, classes.searchBarBorderRemove]} value={search} onChange={handleSearchInput} placeholder="Search..."
        startAdornment={<InputAdornment position="start">
          {!search ? <SearchIcon fontSize="small" /> : ""}
        </InputAdornment>}
        endAdornment={<InputAdornment position="end">
          {!search ? "" : <Close className={classes.cursorPointer} fontSize="small" onClick={() => { setSearch("") }} />}
        </InputAdornment>}>
      </InputBase>
      {search ? searchUserBox : ""}
    </Box>
  )

  // ---------------------------------------------User Menu-------------------------------------


  const handleMenuOpen = (e) => { setAnchorEl(e.currentTarget) };
  const handleMenuClose = () => { setAnchorEl(null) };
  const userProfileMenu = (
    <Box>
      <Tooltip title="Profile" arrow>
        <IconButton color="primary" size="small" onClick={handleMenuOpen}>
          <Avatar src={auth.user.profileImage} sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{ className: classes.userProfileMenu }}
      >
        <Link to={`/profile/${auth.user._id}`} className={classes.link}>
          <MenuItem>
            <ListItemIcon>
              <Avatar src={auth.user.profileImage} className={classes.avatar} />
            </ListItemIcon>
            <ListItemText >
              Your Profile
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={() => { dispatch(logout()); }} >
          <ListItemIcon >
            <LogoutOutlined color="primary" />
          </ListItemIcon>
          <ListItemText className={classes.link}>
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );

  // ---------------------------------------------Drawer-------------------------------------

  const [mobileDrawer, setMobileDrawer] = useState(false);
  const handleMobileDrawerToggle = () => { setMobileDrawer(!mobileDrawer) };
  const drawerLinkList = [
    ["Discover", <ExploreOutlined />, "/discover"],
    ["Profile", <PersonOutlined />, `/profile/${auth.user._id}`],
    ["Chat", <ChatBubbleOutline />, "/message"],
    ["Saved", <BookmarkBorder />, "/saved"],
    ["Feedback", <HelpOutline />, "/feedback"],
    ["Settings", <SettingsOutlined />, "/settings"],
  ]
  const drawerInner = (
    <>
      <List className={classes.desktopList}>
        <Link to="/">
          <ListItemButton className={classes.listItemButton} selected={pathname === "/"}>
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        {drawerLinkList.map(([label, icon, path], index) => (
          <Box key={index}>
            <Link to={path}>
              <ListItemButton className={classes.listItemButton} selected={pathname.includes(path)}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          </Box>
        ))}
      </List>
    </>

  );

  return (
    <Box>

      {/* Toolbar  */}
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar variant="dense" className={classes.toolbar}>

          <IconButton onClick={handleMobileDrawerToggle} className={classes.mobileDrawerToggler}>
            <MenuIcon fontSize="small" />
          </IconButton>

          <Logo className={classes.appBarLogo} />
          {searchBase}

          <Box sx={{ display: 'flex', justifyContent: "right" }}>
            <Button  sx={{display:{xs:"none",md:"block"}}} className={classes.createButton} onClick={() => { dispatch({ type: GLOBALTYPES.STATUS, payload: true }) }} variant="contained" disableElevation>Create</Button>
            <NotifyModal />
            <Theme />
            {userProfileMenu}
          </Box>

        </Toolbar>
      </AppBar>

      {/* Main  */}
      <Box className={classes.container}>
        <Toolbar variant="dense" />
        <Grid container spacing={1}>
          <Grid item xs={12} md={3} sx={{display:{xs:"none",md:"block"}}}>
            <Box className={classes.leftSide}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <UserCardOne image={auth.user.profileImage} fullname={auth.user.fullname} username={auth.user.username} />
                </Grid>
                <Grid item xs={12}>
                  <Drawer open={true} variant="persistent" className={classes.desktopDrawer} >
                    {drawerInner}
                  </Drawer>
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.createPostButton} onClick={() => { dispatch({ type: GLOBALTYPES.STATUS, payload: true }) }} fullWidth color="primary" variant="contained">
                    Create Post
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {children}
          </Grid>
        </Grid>
      </Box>

      <Drawer PaperProps={{className:classes.mobileDrawerPaper}} variant="temporary" className={classes.mobileDrawer} open={mobileDrawer} onClick={handleMobileDrawerToggle} onClose={handleMobileDrawerToggle}>
        <Toolbar><Logo className={classes.appBarLogoSecond} /></Toolbar>
        {drawerInner}
      </Drawer>

    </Box >
  );
};

export default Header;
