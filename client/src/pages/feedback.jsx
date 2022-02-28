import React, { useState } from 'react';

import { makeStyles } from "@mui/styles"
import { alpha, Box, Button, Grid, InputAdornment, Rating, TextField, Typography } from '@mui/material'
import { DescriptionOutlined, EmailOutlined, PersonOutline, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAlt, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { postDataAPI } from "../utils/fetchData"
import { GLOBALTYPES } from '../redux/actions/globalTypes';



const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      borderRadius: theme.shape.borderRadius,
      padding: 8,
      
    },
    titleWrapper: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding:"12px !important"
      
    },
    formWrapper: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      marginTop: "8px !important",
      padding:"12px !important"

    },
    ratingIcons: {
     ["& .MuiRating-iconFilled"]:{
       color:theme.palette.primary.main
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
  }
})

const Feedback = () => {
  const classes = useStyles()
  const { auth } = useSelector((state) => state)

  const initialState = { name: auth.user.fullname, email: auth.user.email, review: "", rating: 3 };
  const [feedbackData, setfeedbackData] = useState(initialState);
  const { name, email, review, rating } = feedbackData;
  const dispatch = useDispatch()

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfied fontSize='large' />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfied fontSize='large' />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfied fontSize='large' />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAlt fontSize='large' />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfied fontSize='large' />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setfeedbackData({ ...feedbackData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postDataAPI("/user/feedback", feedbackData, auth.token);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Something went wrong white sending feedback" } })
    }
  };


  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.titleWrapper}>
          <Typography textAlign="center" color="primary.light" variant="h5" pb={1}>Feedback</Typography>
        </Grid>
        <Grid item xs={12} className={classes.formWrapper}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5}>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" pb={1}>Name</Typography>
                <TextField className={classes.customTextField} fullWidth value={name} InputProps={{ startAdornment: (<InputAdornment position="start"><PersonOutline /></InputAdornment>) }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" pb={1}>Email</Typography>
                <TextField className={classes.customTextField} fullWidth value={email} InputProps={{ startAdornment: (<InputAdornment position="start"><EmailOutlined /></InputAdornment>) }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" pb={1}>Rating</Typography>
                <Rating className={classes.ratingIcons} IconContainerComponent={IconContainer} highlightSelectedOnly name="rating" value={rating} size="large" onChange={handleChangeInput} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" pb={1}>Describe Your Review</Typography>
                <TextField className={classes.customTextField} fullWidth multiline maxRows={8} minRows={8} name="review" onChange={handleChangeInput} value={review} InputProps={{ startAdornment: (<InputAdornment position="start"><DescriptionOutlined /></InputAdornment>) }} />
              </Grid>

              <Grid item xs={12}>
                <Button onClick={handleSubmit} disabled={!name || !email || !rating || !review} variant="contained">Submit</Button>
              </Grid>

            </Grid>
          </form>

        </Grid>
      </Grid>

    </Box>)
};

export default Feedback;
