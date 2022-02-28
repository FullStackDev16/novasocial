import React from "react";
import { Box } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import ReactLoading from 'react-loading';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding:8
    },
  };
});

const SmallLoading = () => {
  const classes = useStyles();
  const theme = useTheme()

  return (
    <Box className={classes.wrapper}>
       <ReactLoading  type="spinningBubbles" color={theme.palette.primary.main} height={50} width={50} />
    </Box>
  );
};

export default SmallLoading;
