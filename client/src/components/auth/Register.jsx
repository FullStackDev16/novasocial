import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthPagesCover from "./AuthPagesCover";
import {
  AlternateEmail,
  EmailOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";

import {
  InputAdornment,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";

const useStyles = makeStyles((theme) => {
  return {
    textFieldInput: {
      fontWeight: `${theme.typography.fontWeightMedium} !important`,
      color:'grey !important'
    },
    linksWrapper: {
      textAlign:"right",
      margin: "0px 5px 5px 5px"
    },
    colorGrey: {
      color: 'grey !important'
    }
  };
});

const Register = () => {
  const classes = useStyles();

  const initialState = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    cfpassword: "",
  };

  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cfpassword } = userData;

  const dispatch = useDispatch();
  const history = useHistory();
  const { auth, alert } = useSelector((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (auth.token) {
      history.push("/");
    }
  }, [auth, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <AuthPagesCover title="Register" subtitle="SignUp Using Email">
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Your Name" name="fullname" autoFocus onChange={handleChangeInput} value={fullname} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start">       <PersonOutlined />  </InputAdornment>), }} helperText={alert.fullname ? alert.fullname : ""} error={alert.fullname ? true : false} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Username" name="username" onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, "")} InputProps={{  className: classes.textFieldInput, startAdornment: (<InputAdornment position="start">  <AlternateEmail /></InputAdornment>), }} helperText={alert.username ? alert.username : ""} error={alert.username ? true : false} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" name="email" autoComplete="email" onChange={handleChangeInput} value={email} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start"> <EmailOutlined /> </InputAdornment>), }} helperText={alert.email ? alert.email : ""} error={alert.email ? true : false} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth name="password" label="Password" type={showPassword ? "text" : "password"} autoComplete="current-password" onChange={handleChangeInput} value={password} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start">       <VpnKeyOutlined />     </InputAdornment>), endAdornment: (<InputAdornment position="end">       <IconButton onClick={() => { setShowPassword(!showPassword); }}       >         {showPassword ? <Visibility /> : <VisibilityOff />}       </IconButton>     </InputAdornment>), }} helperText={alert.password ? alert.password : ""} error={alert.password ? true : false} />
            {password ? ( <PasswordStrengthBar
                password={password}
                minLength={6}
                style={{ width: "100%" }}
                barColors={[
                  "#B83E26",
                  "#FFB829",
                  "#009200",
                  "#009200",
                  "#009200",
                  "#009200"
                ]}
              /> ) : ("")}
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth name="cfpassword" label="Confirm Password" type={showConfirmPassword ? "text" : "password"} autoComplete="current-password" onChange={handleChangeInput} value={cfpassword} InputProps={{ className: classes.textFieldInput, startAdornment: (<InputAdornment position="start">       <VpnKeyOutlined />     </InputAdornment>), endAdornment: (<InputAdornment position="end">       <IconButton onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}       >         {showConfirmPassword ? <Visibility /> : <VisibilityOff />}       </IconButton>     </InputAdornment>), }} helperText={alert.cfpassword ? alert.cfpassword : ""} error={alert.cfpassword ? true : false} />
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.linksWrapper}>
              <Link to="/login" className={classes.colorGrey}>
                <Typography variant="caption"> Already Have An Account ? Login</Typography>
              </Link>
            </Box>
            <Button disabled={fullname && username && email && password && cfpassword ? false : true} type="submit" fullWidth disableElevation color="primary" variant="contained">
              Register
            </Button>
          </Grid>

        </Grid>

      </form>
    </AuthPagesCover>
  );
};

export default Register;
