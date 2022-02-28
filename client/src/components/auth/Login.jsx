import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Divider,
  Chip,
  IconButton,
  Grid,
  Alert,
} from "@mui/material";
import { EmailOutlined, Google, Visibility, VisibilityOff, VpnKeyOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "../../redux/actions/authAction";
import { useHistory, Link } from "react-router-dom";
import AuthPagesCover from "./AuthPagesCover";
import { GoogleLogin } from 'react-google-login';
import { GOOGLE_CLIENT_ID } from "../../utils/config";

const useStyles = makeStyles((theme) => {
  return {
    textFieldInput: {
      fontWeight: `${theme.typography.fontWeightBold} !important`,
      color: 'grey !important'
    },
    linksWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: "8px 5px"
    },
    colorGrey: {
      color: 'grey !important'
    }

  };
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false)

  const initialState = { email: "demo@novaSocial.io", password: "password123" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  const responseGoogle = (res) => {
    dispatch(googleLogin(res.tokenId));
  }

  return (
    <AuthPagesCover title="Login" subtitle="SignIn Using Email">

      <Grid container spacing={1.5}>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>

            <TextField variant="outlined" fullWidth margin="normal" label="Email" name="email" autoComplete="email" autoFocus onChange={handleChangeInput} value={email} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start"><EmailOutlined /></InputAdornment>), }} />
            <TextField variant="outlined" fullWidth margin="normal" label="Password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" onChange={handleChangeInput} value={password} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start"> <VpnKeyOutlined /></InputAdornment>), endAdornment: (<InputAdornment position="end"><IconButton onClick={() => { setShowPassword(!showPassword) }} >  {showPassword ? <Visibility /> : <VisibilityOff />}</IconButton></InputAdornment>) }} />

            <Box className={classes.linksWrapper}>
              <Link to="/register" className={classes.colorGrey}>
                <Typography variant="caption">Don't have An Account ? Register Now</Typography>
              </Link>
              <Link to="/forgot_password" className={classes.colorGrey}>
                <Typography variant="caption">ForgotPassword ?</Typography>
              </Link>
            </Box>

            <Button disabled={email && password ? false : true} disableElevation type="submit" fullWidth color="primary" variant="contained">
              Login
            </Button>

          </form>
        </Grid>

        <Grid item xs={12}>
          <Alert severity="info">You can use <strong>demo@novaSocial.io</strong> and password <strong>Password123</strong></Alert>
        </Grid>
        <Grid item xs={12}>
          <Divider><Chip label="OR" /></Divider>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center"  pt={1} pb={1}>
          <Typography variant="caption">Don't Use Login With Google When Registering First Time And Need Cutom Username</Typography>
          </Box>
          <GoogleLogin clientId={GOOGLE_CLIENT_ID} onSuccess={responseGoogle} cookiePolicy={'single_host_origin'} render={renderProps => (<Button fullWidth variant="gradient" onClick={renderProps.onClick} disableElevation startIcon={<Google />}>Login With Google</Button>)} />
        </Grid>
      </Grid>

    </AuthPagesCover >

  );
};

export default Login;
