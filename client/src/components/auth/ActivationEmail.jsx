import { Typography, Box,alpha } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory()
  const {auth} = useSelector(state => state)

  useEffect(() => {
      if(auth.token){
          history.push("/")
      }
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/api/activate_user", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [auth,history,activation_token]);

  return (
    <div>
      {(err || success) && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                margin: 2,
                padding: 2,
                minWidth: "600px",
                borderRadius: (theme) => {
                  return theme.shape.borderRadius / 10;
                },
                background: (theme) => {
                  return alpha(theme.palette.primary.main, 0.1);
                },
              }}
            >
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {err}
                {success}
              </Typography>
              {success &&
              <Link to="/login">
                <Typography color="primary">Go To Login Page</Typography>
              </Link>}
              {err &&
              <Link to="/register">
                <Typography color="primary">Go To Register Page</Typography>
              </Link>}
            </Box>
          </Box>
        )}
    </div>
  );
};

export default ActivationEmail;
