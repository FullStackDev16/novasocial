import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, IconButton, Typography, Tab, Grid, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getProfileUsers } from "../../redux/actions/profileActions";
import EditProfile from "./EditProfile";
import FollowButton from "../smallComponents/FollowButton";
import { EditOutlined, PersonOutlined, GroupOutlined, KeyboardArrowRightOutlined, RecentActorsOutlined} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import UserCardThree from "../smallComponents/UserCards/UserCardThree";
import Posts from "./Posts";
import moment from "moment";

const useStyles = makeStyles((theme) => {
  return {
    profile: {
      minWidth: "auto",
      overflowX: "hidden",
      padding: 12.5,
      paddingBottom: 0,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.background.paper,
      [theme.breakpoints.down("md")]: {
        padding: 5,
        textAlign: "center"
      },
    },
    coverImageBox: {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      minHeight: "350px",
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundColor:theme.palette.background.default
      
    },
    profileImageBox: {
      width: "110px",
      height: "110px",
      margin: "-55px 0px 0px auto",
      borderRadius: theme.shape.borderRadius * 2,
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat",
      backgroundPosition:"center",
      backgroundColor:theme.palette.background.default,
      [theme.breakpoints.down("md")]: {
        width: "50px",
        height: "50px",
        margin: "-25px auto auto auto",
      },
    },
    infoWrapper: {
      paddingTop: 8
    },
    tabsWrapper: {
      display: "flex",
      justifyContent: "flex-end",
    },
    tab: {
      minHeight: "auto !important"
    },


    info: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: 15,
      [theme.breakpoints.down("md")]: {
        padding: 5,
      },

    },

    bio: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: 15,
      [theme.breakpoints.down("md")]: {
        padding: 5,
      },

    },
    followerFollowingCount: {
      display: 'flex',
      justifyContent: 'center',
      alignItem: 'center'
    },
    followerFollowingCountContent: {
      flex: 1,
      textAlign: 'right',
      padding: 10
    },
    followersfollowings: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: 15,
      [theme.breakpoints.down("md")]: {
        padding: 5,
      },

    },
    textTransformLowerCase: {
      textTransform: "lowercase !important",
    }

  }
})

const Info = () => {
  const classes = useStyles()

  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, profile } = useSelector((state) => state);

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => { setValue(newValue) };

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      const newData = profile.users.filter(user => user._id === id)
      setUserData(newData)
    }
  }, [id, auth, dispatch, profile.users])



  return (
    <Box>

      {userData.map((user) => (
        <Box>

          <TabContext value={value}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <Grid container className={classes.profile}>

                  <Grid item xs={12} md={12}>
                    <Box className={classes.coverImageBox} sx={{backgroundImage:`url(${user.coverImage})`}}>
                     
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box className={classes.profileImageBox} sx={{backgroundImage:`url(${user.profileImage})`}}>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={7}>
                        <Box textAlign="center" className={classes.infoWrapper}>
                          <Typography variant="h6" >{user.fullname}</Typography>
                          <Typography variant="body2" className={classes.textTransformLowerCase}>{"@" + user.username}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={5}>
                        <Box className={classes.infoWrapper}>
                          {user._id === auth.user._id ?
                            <Button variant="outlined" startIcon={<EditOutlined />} onClick={() => { setOnEdit(true) }}>Edit Your Profile</Button>
                            : <FollowButton user={user} />
                          }
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box className={classes.tabsWrapper}>

                          <Box>
                            <TabList variant="scrollable" scrollButtons onChange={handleChange}>
                              <Tab className={classes.tab} icon={<PersonOutlined />} iconPosition="start" label="Profile" value="1" />
                              <Tab className={classes.tab} icon={<GroupOutlined />} iconPosition="start" label="Followers" value="2" />
                              <Tab className={classes.tab} icon={<GroupOutlined />} iconPosition="start" label="Following" value="3" />
                            </TabList>
                          </Box>

                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>

              <Grid item xs={12}>

                <TabPanel value="1">
                  <Grid container spacing={1}>

                    <Grid item xs={12} md={5}>
                      <Grid container spacing={1}>

                        <Grid item xs={12}>
                          <Box className={classes.followersfollowings}>

                            <Grid container>
                              <Grid item xs={12}>
                                <Box className={classes.followerFollowingCount}>
                                  <IconButton color="primary"><RecentActorsOutlined /></IconButton>
                                  <Typography variant="subtitle2" className={classes.followerFollowingCountContent}>{user.following.length ? user.following.length : "No followers Yet"}</Typography>
                                  <IconButton onClick={() => { setValue("2") }}>< KeyboardArrowRightOutlined /></IconButton>
                                </Box>
                              </Grid>
                              <Grid item xs={12}>
                                <Box className={classes.followerFollowingCount}>
                                  <IconButton color="primary"><GroupOutlined /></IconButton>
                                  <Typography variant="subtitle2" className={classes.followerFollowingCountContent}>{user.followers.length ? user.followers.length : "No followers Yet"}</Typography>
                                  <IconButton onClick={() => { setValue("3") }} ><KeyboardArrowRightOutlined /></IconButton>
                                </Box>
                              </Grid>
                            </Grid>

                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box className={classes.info} >
                            <Typography variant="h6">Info</Typography>
                            <Typography variant="subtitle2"><li>Gender - {user.gender}</li></Typography>
                            <Typography variant="subtitle2"><li>Mobile - {user.mobile === "" ? 'No Mobile' : user.mobile}</li></Typography>
                            <Typography variant="subtitle2"><li>Address - {user.address === "" ? 'No Address' : user.address}</li></Typography>
                            <Typography variant="subtitle2"><li>Date Of Birth - { moment(user.dateofbirth).format('ll')}</li></Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box className={classes.bio} >
                            <Typography variant="h6">Bio</Typography>
                            <Typography variant="body2" >{user.bio === "" ? 'No Bio' : user.bio}</Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Box className={classes.bio} >
                            <Typography variant="h6">About</Typography>
                            <Typography variant="body2" >{user.about === "" ? 'No About' : user.about}</Typography>
                          </Box>
                        </Grid>

                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}/>
                    </Grid>

                  </Grid>
                </TabPanel>

                <TabPanel value="2">
                  <Grid container spacing={1}>
                    {user.followers.map((user) => (
                      <Grid item xs={12} md={6} key={user._id}>
                        <UserCardThree user={user} />
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value="3">
                  <Grid container spacing={1}>
                    {user.following.map((user) => (
                      <Grid item xs={12} md={6} key={user._id}>
                        <UserCardThree user={user} />
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

              </Grid>

            </Grid>
          </TabContext>

        </Box >
      ))}

      {<EditProfile setOnEdit={setOnEdit} onEdit={onEdit} />}

    </Box >
  );
};

export default Info;
