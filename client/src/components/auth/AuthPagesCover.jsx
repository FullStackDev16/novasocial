import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box, Grid } from "@mui/material";
import SmallLogo from "../smallComponents/Logo/SmallLogo";

const useStyles = makeStyles((theme) => {
  return {
    authPagesWrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: 'center',
      padding: "20px 15px",
      justifyContent: 'center'
    },
    authPages: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      maxWidth: "500px",
      padding: "15px",

    },
  };
});

const AuthPagesCover = ({ children,title,subtitle }) => {
  const classes = useStyles();

  return (
    <Box className={classes.authPagesWrapper}>
      <Box className={classes.authPages}>

        <Grid container spacing={0.5}>
          <Grid item xs={12}>
            <SmallLogo />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" textAlign="center">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" textAlign="center">{subtitle}</Typography>
          </Grid>
        </Grid>

        {children}
      </Box>
    </Box >
  );
};

export default AuthPagesCover;
