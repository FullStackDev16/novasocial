import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography, useMediaQuery, useTheme, Box, Tooltip, alpha, DialogActions, Tab, Tabs, Grid } from "@mui/material";
import { CameraOutlined, Close, EditOutlined, GroupOutlined, HouseOutlined, PersonOutlined, PhoneAndroidOutlined, StarOutlineOutlined } from "@mui/icons-material";
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from "@mui/styles";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateUserProfile } from "../../redux/actions/profileActions";
import { checkImage } from "../../utils/imageUpload";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TabContext, TabPanel } from '@mui/lab';
import { deleteDataAPI } from "../../utils/fetchData";

const useStyles = makeStyles((theme) => {
  return {
    dialogPaper: {
      height: "100%"
    },
    dialogContent: {
      padding: "10px !important"
    },
    tabContextInner: {
      display: "flex",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column"
      }
    },

    tabListWrapper: {
      display: 'flex',
      minWidth: 200,
      position: "fixed",
      [theme.breakpoints.down("md")]: {
        paddingBottom: 10,
        paddingRight: 0,
        position: "static",
      }
    },
    tab: {
      minHeight: "auto !important",
      justifyContent: 'left !important'
    },

    tabPanelsWrapper: {
      flexGrow: 1,
      marginLeft: "180px",
      [theme.breakpoints.down("md")]: {
        marginLeft: "0px",
      }
    },
    tabPanelZeroContentWrapper: {
    },





    coverImageWrapper: {
      position: "relative !important",
    },
    coverImage: {
      width: "100%",
      height: "230px",
      borderRadius: theme.shape.borderRadius,
    },
    changeCoverImage: {
      position: "absolute !important",
      right: 7,
      top: 7,
      background: `${alpha(theme.palette.primary.main, 0.2)} !important`,
      boxShadow: theme.shadows[800],
      transition: "1s",
      ["&:hover"]: {
        background: `${alpha(theme.palette.primary.main, 0.4)} !important`,
      }
    },


    profileImageWrapper: {
      position: "relative !important",
    },
    profileImage: {
      width: "160px !important",
      height: "160px !important",
      borderRadius: `${theme.shape.borderRadius}px !important`,
    },
    changeProfileImage: {
      position: "absolute !important",
      top: 7,
      right: 7,
      background: `${alpha(theme.palette.primary.main, 0.2)} !important`,
      boxShadow: theme.shadows[800],
      transition: "1s",
      ["&:hover"]: {
        background: `${alpha(theme.palette.primary.main, 0.4)} !important`,
      }
    },
    customTextField: {
      background: `${theme.palette.mode === "dark" ? alpha(theme.palette.background.default, 0.4) : theme.palette.background.default} !important`,
      borderRadius: `${theme.shape.borderRadius}px !important`,
      margin: "4px 0px",
      transition: "all ease-in-out 0.1s",
      ["& .MuiOutlinedInput-notchedOutline"]: {
        border: "none !important",
      },
    },



    CloseIcon: {
      position: "absolute !important",
      right: 8,
      top: 8,
      color: theme.palette.grey[900],
      strokeWidth: 1,
      stroke: theme.palette.text.primary,
    },

  };
});

const EditProfile = ({ onEdit, setOnEdit }) => {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const initialState = { fullname: "", dateofbirth: "", mobile: "", gender: "", about: "", bio: "", address: "", };
  const [userData, setUserData] = useState(initialState);
  const { fullname, dateofbirth, mobile, gender, about, bio, address } = userData;

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [tab, setTab] = useState(0)
  const handleTabChange = (event, newValue) => { setTab(newValue); };

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  // Profile Info 
  const handleChangeProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return
    const err = checkImage(file);
    if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setProfileImage(file);
  };
  const handleChangeCoverImage = (e) => {
    const file = e.target.files[0];
    if (!file) return
    const err = checkImage(file);
    if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setCoverImage(file);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleDateChangeInput = (value) => {
    setUserData({ ...userData, dateofbirth: value });
  };
  const handleDialogSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userData, profileImage, coverImage, auth }));
    setOnEdit(false)
  };

  // Account Settings 
  const handleDeleteAccount = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
        localStorage.removeItem("firstlogin");
        deleteDataAPI(`delete/${auth.user._id}`, auth.token)
        localStorage.removeItem("firstlogin");
        localStorage.removeItem('palettemode')
        localStorage.removeItem('palettecolor')
        localStorage.removeItem('paletteborderradius')
        localStorage.removeItem('palettefont')
        localStorage.removeItem('palettefontsize')
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your Account had been Deleted" } });
        window.location.href = "/";
      }
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
  }
  // Dialog 
  const handleDialogClose = () => {
    setUserData(auth.user);
    setProfileImage("");
    setCoverImage("");
    setOnEdit(false)
  }


  return (
    <>
      <Dialog PaperProps={{ className: classes.dialogPaper }} maxWidth="lg" fullWidth fullScreen={isFullScreen} open={onEdit} onClose={handleDialogClose}>

        {/* CloseIcon  */}
        <Tooltip title="Close" arrow>
          <IconButton className={classes.CloseIcon} onClick={handleDialogClose} >
            <Close color="inherit" fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Dialog Title */}
        <DialogTitle>Edit Profile</DialogTitle>

        {/* Dialog Form/Content */}
        <DialogContent className={classes.dialogContent}>

          <TabContext value={tab}>
            <Box className={classes.tabContextInner}>

              <Box className={classes.tabListWrapper}>
                <Tabs allowScrollButtonsMobile fullWidth orientation={isFullScreen ? "horizontal" : "vertical"} value={tab} variant="scrollable" scrollButtons={isFullScreen} centered={isFullScreen} onChange={handleTabChange} >
                  <Tab icon={<PersonOutlined />} className={classes.tab} iconPosition="start" label="Personal Info" value={0} />
                  <Tab icon={<GroupOutlined />} className={classes.tab} iconPosition="start" label="Account Settings" value={1} />
                </Tabs>
              </Box>

              <Box className={classes.tabPanelsWrapper}>

                <TabPanel value={0}>
                  <Box className={classes.tabPanelZeroContentWrapper}>

                    <form>
                      <Grid container spacing={1}>

                        <Grid item xs={12}>
                          <Grid container spacing={1}>


                            {/* Cover Image */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" pb={1}>Banner Image</Typography>
                              <Box className={classes.coverImageWrapper}>
                                <img className={classes.coverImage} src={coverImage ? URL.createObjectURL(coverImage) : auth.user.coverImage} alt="Cover Photo" />
                                <Box>
                                  <input type="file" name="file" hidden id="icon-button-file-two" accept="image/*" onChange={handleChangeCoverImage} />
                                  <label htmlFor="icon-button-file-two">
                                    <IconButton className={classes.changeCoverImage} component="span" >
                                      <EditOutlined color="primary" fontSize="small" />
                                    </IconButton>
                                  </label>
                                </Box>
                              </Box>
                            </Grid>

                            {/* Profile Image */}
                            <Grid item >
                              <Typography variant="subtitle2" pb={1}>Profile Image</Typography>
                              <Box textAlign="center">
                                <Box className={classes.profileImageWrapper}>
                                  <Avatar className={classes.profileImage} src={profileImage ? URL.createObjectURL(profileImage) : auth.user.profileImage} alt="Profile Photo" />
                                  <Box>
                                    <input type="file" name="file" hidden id="icon-button-file-three" accept="image/*" onChange={handleChangeProfileImage} />
                                    <label htmlFor="icon-button-file-three">
                                      <IconButton className={classes.changeProfileImage} component="span" >
                                        <CameraOutlined color="primary" fontSize="small" />
                                      </IconButton>
                                    </label>
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>

                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container spacing={1}>

                            {/* Full Name */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" pb={1}>Full Name</Typography>
                              <TextField className={classes.customTextField} fullWidth name="fullname" onChange={handleChangeInput} value={fullname} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutlined /></InputAdornment>) }} />
                            </Grid>

                            {/* Address */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" pb={1}>Address</Typography>
                              <TextField className={classes.customTextField} fullWidth name="address" onChange={handleChangeInput} value={address} InputProps={{ startAdornment: (<InputAdornment position="start"><HouseOutlined /></InputAdornment>) }} />
                            </Grid>

                            {/* Mobile */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" pb={1}>Mobile Number</Typography>
                              <TextField className={classes.customTextField} fullWidth name="mobile" onChange={handleChangeInput} value={mobile} InputProps={{ startAdornment: (<InputAdornment position="start"> <PhoneAndroidOutlined /></InputAdornment>) }} />
                            </Grid>

                            {/* Date Of Birth */}
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" pb={1}>Date Of Birth</Typography>
                              <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker name="dateofbirth" onChange={handleDateChangeInput} value={dateofbirth} disableFuture openTo="year" views={['year', 'month', 'day']} renderInput={(params) => <TextField {...params} className={classes.customTextField} fullWidth />} />
                              </LocalizationProvider>
                            </Grid>

                            {/* Bio */}
                            <Grid item xs={12}>
                              <Typography variant="subtitle2">About</Typography>
                              <TextField fullWidth className={classes.customTextField} margin="normal" label="About" name="about" onChange={handleChangeInput} value={about} helperText={`${about.length}/1000`} multiline error={about.length > 1000 ? true : false} maxRows={6} InputProps={{ startAdornment: (<InputAdornment position="start"><StarOutlineOutlined /></InputAdornment>) }} />

                            </Grid>

                            <Grid item xs={12}>
                              <Typography variant="subtitle2">Bio</Typography>
                              <TextField className={classes.customTextField} fullWidth name="bio" onChange={handleChangeInput} value={bio} helperText={`${bio.length}/1500`} multiline error={bio.length > 1500 ? true : false} rows={8} InputProps={{ startAdornment: (<InputAdornment position="start"><StarOutlineOutlined /></InputAdornment>) }} />
                            </Grid>

                            {/* Gender */}
                            <Grid item xs={12}>
                              <Box>
                                <Typography variant="subtitle2" pb={1}>Gender</Typography>
                                <Box>
                                  <RadioGroup row value={gender} onChange={handleChangeInput} name="gender">
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                  </RadioGroup>
                                </Box>
                              </Box>
                            </Grid>


                          </Grid>
                        </Grid>

                      </Grid>
                    </form>

                  </Box>
                </TabPanel>

                <TabPanel value={1}>
                  <Button onClick={handleDeleteAccount} color="error" variant="contained">Delete My Account</Button>
                </TabPanel>


              </Box>

            </Box>
          </TabContext>

        </DialogContent>

        <DialogActions>

          <Button disableElevation variant="contained" onClick={handleDialogSubmit}>
            Save Changes
          </Button>
          <Button disableElevation variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>

        </DialogActions>

      </Dialog>
    </>
  );
};

export default EditProfile;
