import React, { useState } from "react";
import { useDispatch, } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Drawer, IconButton, Toolbar, Tooltip, Typography, Box, Slider, Button, FormControl, Select, alpha, MenuItem, ToggleButtonGroup, ToggleButton, Grid, Fab, } from "@mui/material";
import { ClearOutlined, ColorLens, FullscreenExitOutlined, FullscreenOutlined } from "@mui/icons-material";
import { THEME_TYPES } from "../redux/actions/themeAction";
import DarkThemeImage from "../media/Images/DarkTheme.png";
import LightThemeImage from "../media/Images/LightTheme.png";
import clsx from "clsx"

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      zIndex: `${theme.zIndex.drawer + 2} !important`,
      userSelect: "none",
      "& .MuiBackdrop-root": {
        background: alpha(theme.palette.background.default, 0.2),
        backdropFilter: "blur(10px)",
      },
      "& .MuiDrawer-paper": {
        top: "12px",
        bottom: "12px",
        right: "12px",
        height: "auto",
        borderRadius: theme.shape.borderRadius
      },
      [theme.breakpoints.down("sm")]: {
        "& .MuiDrawer-paper": {
          borderRadius: "0",
          top: "0",
          bottom: "0",
          right: "0",
        },
      },
    },
    drawerInner: {
      width: "250px",
      overflow: "scroll",
      overflowX: "hidden",
      ["&::-webkit-scrollbar"]: {
        display: 'none !important'
      }
    },

    // Theme Mode Changer 
    themeModes: {
      display: "flex",
      maxHeight: "100px",
    },
    theme: {
      width: "100px",
      height: "auto",
      flex: 1,
      margin: "3px",
      cursor: "pointer",
      border: `2px solid transparent`,
      borderRadius: theme.shape.borderRadius
    },
    themeActive: {
      border: `2px solid ${theme.palette.primary.main}`
    },

    // Theme Color Changer 
    themeColorChanger: {
      display: "flex",
      flexWrap: "wrap",
    },
    colorButton: {
      width: "55px",
      height: "45px",
      border: "2px solid rgba(145, 158, 171, 0.24)",
      borderRadius: theme.shape.borderRadius,
      display: "flex",
      margin: "4px auto",
      cursor: "pointer",
      position: "relative",
    },
    colorButtonActive: {
      border: `2px solid ${theme.palette.primary.main}`,
      boxShadow: `13px 10px 60px -17px inset ${theme.palette.primary.main}`,
    },
    iconButton: {
      minWidth: "auto !important",
      width: "100%"
    },
    icon: {
      width: "21px",
      height: "11px",
      textAlign: "center",
      alignItems: "center",
      borderRadius: "50%",
      transition: "0.5s",
      transform: "rotate(-50deg)",
    },
    iconActive: {
      transform: "rotate(0deg)",
    },

    themeFontSelector: {
      height: "35px",
    },

  };
});

const Theme = ({ props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const ThemeColors = [
    ["blue", "#41a0ff"],
    ["red", "#E97E88"],
    ["yellow", "#FDC741"],
    ["green", "#82C953"],
    ["purple", "#7863B6"],
    ["orange", "#E86100"],
  ];

  const [drawer, setDrawer] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const [themeMode, setThemeMode] = useState(localStorage.getItem("palettemode") ? localStorage.getItem("palettemode") : "light");
  const [themeColor, setThemeColor] = useState(localStorage.getItem("palettecolor") ? localStorage.getItem("palettecolor") : "blue")
  const [themeFont, setThemeFont] = useState(localStorage.getItem("palettefont") ? localStorage.getItem("palettefont") : "roboto");
  const [themeBorderRadius, setThemeBorderRadius] = useState(localStorage.getItem("paletteborderradius") ? Number(localStorage.getItem("paletteborderradius")) : 10);
  const [themeFontSize, setThemeFontSize] = useState(localStorage.getItem("palettefontsize") ? Number(localStorage.getItem("palettefontsize")) : 18);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(!drawer);
  };


  const changeThemeMode = (mode) => {
    dispatch({ type: THEME_TYPES.MODE_CHANGE, payload: mode });
    localStorage.setItem("palettemode", mode);
    setThemeMode(mode);
  };
  const changeThemeColor = (color) => {
    dispatch({ type: THEME_TYPES.COLOR_CHANGE, payload: color });
    localStorage.setItem("palettecolor", color);
    setThemeColor(color);
  };
  const changeThemeFont = (event) => {
    const font = event.target.value;
    dispatch({ type: THEME_TYPES.FONT_CHANGE, payload: font });
    localStorage.setItem("palettefont", font);
    setThemeFont(font);
  };
  const changeThemeBorderRadius = (event) => {
    const border_radius = event.target.value === '' ? '5' : Number(event.target.value)
    dispatch({
      type: THEME_TYPES.BORDER_RADIUS_CHANGE,
      payload: border_radius,
    });
    localStorage.setItem("paletteborderradius", border_radius);
    setThemeBorderRadius(border_radius);
  };
  const changeThemeFontSize = (event) => {
    const font_size = event.target.value === '' ? '5' : Number(event.target.value)
    dispatch({
      type: THEME_TYPES.FONT_SIZE_CHANGE,
      payload: font_size,
    });
    localStorage.setItem("palettefontsize", font_size);
    setThemeFontSize(font_size);
  };


  const fullScreenMode = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    }
  };

  return (
    <Box>
      <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 50003, display: { xs: "block", md: "none" } }}>
        <Fab size="small" color="primary" onClick={toggleDrawer}>
          <ColorLens />
        </Fab>
      </Box>

      <Tooltip title="Theme Customizer" arrow sx={{ display: { xs: "none", md: "block" } }}>
        <IconButton onClick={toggleDrawer}>
          <ColorLens fontSize="small" />
        </IconButton>
      </Tooltip>



      <Drawer anchor="right" open={drawer} onClose={toggleDrawer} className={classes.drawer} elevation={0}>
        <Box className={classes.drawerInner}>

          <Toolbar variant="dense" sx={{ background: (theme) => { return theme.palette.background.paper }, position: 'sticky', top: 0 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Settings
            </Typography>
            <Tooltip title="Close" arrow>
              <IconButton onClick={toggleDrawer} sx={{ marginRight: "-10px", strokeWidth: 1, stroke: (theme) => { return theme.palette.text.primary; } }}>
                <ClearOutlined color="inherit" />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <Box sx={{ p: 2 }}>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>Mode</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.themeModes}>
                  <img onClick={() => { changeThemeMode("light"); }} src={LightThemeImage} alt="lightmode" className={themeMode === "dark" ? classes.theme : clsx(classes.theme, classes.themeActive)} />
                  <img onClick={() => { changeThemeMode("dark"); }} src={DarkThemeImage} alt="darkmode" className={themeMode === "light" ? classes.theme : clsx(classes.theme, classes.themeActive)} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>Color</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.themeColorChanger} >
                  {ThemeColors.map(([theme, color], index) => (
                    <Box key={index} className={themeColor === theme ? clsx(classes.colorButton, classes.colorButtonActive) : classes.colorButton} onClick={() => { changeThemeColor(theme) }} button>
                      <Button className={classes.iconButton}>
                        <Box className={themeColor === theme ? clsx(classes.icon, classes.iconActive) : classes.icon} style={{ background: color }}>
                        </Box>
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>Border Radius</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.themeBorderSlider}>
                  <Slider value={themeBorderRadius} onChange={changeThemeBorderRadius} valueLabelDisplay="auto" step={1} min={1} max={30} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>Font Size</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.themeFontSizeWrapper} textAlign="center">
                  <ToggleButtonGroup fullWidth color="primary" value={themeFontSize} exclusive onChange={changeThemeFontSize} >
                    <ToggleButton value={20}>
                      small
                    </ToggleButton>
                    <ToggleButton value={19}>
                      medium
                    </ToggleButton>
                    <ToggleButton value={18}>
                      large
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>Font</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.themeFontChanger}>
                  <FormControl fullWidth>
                    <Select className={classes.themeFontSelector} value={themeFont} onChange={changeThemeFont}>
                      <MenuItem disabled value="">
                        <em>Select Font</em>
                      </MenuItem>
                      <MenuItem value="roboto" sx={{ fontFamily: "'Roboto', sans-serif" }}>Roboto</MenuItem>
                      <MenuItem value="ubuntu" sx={{ fontFamily: "'Ubuntu', sans-serif" }}>Ubuntu</MenuItem>
                      <MenuItem value="chakrapetch" sx={{ fontFamily: "'Chakra Petch', sans-serif" }}>Chakrapetch</MenuItem>
                      <MenuItem value="sansita" sx={{ fontFamily: "'Sansita', sans-serif" }}>Sansita</MenuItem>
                      <MenuItem value="lobster" sx={{ fontFamily: "'Lobster Two', cursive" }}>Lobster</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>Full Screen</Typography>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.fullScreenWrapper}>
                  <Button className={classes.fullScreenButton} onClick={fullScreenMode} fullWidth color="secondary" disableElevation variant="contained" startIcon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}>
                    {fullScreen ? "exit fullscreen" : "FullScreen"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Drawer>
    </Box>

  );
};

export default Theme;
