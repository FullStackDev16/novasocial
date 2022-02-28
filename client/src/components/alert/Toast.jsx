import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { useDispatch } from "react-redux";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Toast = ({ message, type }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    setOpen(false);
  };

  return (
    <>
      <Snackbar TransitionComponent={SlideTransition} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={3000} open={open} onClose={handleClose}>
        <Alert variant="filled" severity={type} sx={{textTransform:"capitalize"}}>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
