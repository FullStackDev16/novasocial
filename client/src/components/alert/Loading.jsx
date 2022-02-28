import React from "react";
import { Box } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import ReactLoading from 'react-loading';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      width: "100vw",
      background: theme.palette.background.paper,
      height: "100vh",
      display: "flex",
      position: "fixed",
      top: 0,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
    },
  };
});

const Loading = () => {
  const classes = useStyles();
  const theme = useTheme()

  return (
    <Box className={classes.wrapper}>
       <ReactLoading  type="spinningBubbles" color={theme.palette.primary.main} height={80} width={80} />
    </Box>
  );
};

export default Loading;
