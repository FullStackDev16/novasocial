import React, { useState } from 'react'
import AuthPagesCover from "./AuthPagesCover"
import { Alert, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { postDataAPI } from '../../utils/fetchData'
import validateEmail from '../../utils/validation/validateEmail'
import { Link, Redirect } from "react-router-dom";

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const { email, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const forgotPassword = async (e) => {
        e.preventDefault()
        if (!validateEmail(email))
            return setData({ ...data, err: 'Invalid emails.', success: '' })

        try {
            const res = await postDataAPI('/forgot', { email }, null)
            setData({ ...data, err: '', success: res.data.msg })
            return <Redirect to='/somewhere' />
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const resendEmail = async () => {
        try {
            await postDataAPI('/forgot', { email }, null)
            setData({ ...data, err: '', success: "Email Resend successful" })
            return <Redirect to='/somewhere' />
        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <AuthPagesCover title="Password Recovery" subtitle="Tell us your email so we can send you a reset link">

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {err && <Alert variant="filled" severity="error">{err}</Alert>}
                </Grid>

                {success && <>
                    <Grid item xs={12}>
                        <Alert variant="filled" severity="success">{success}</Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={resendEmail} variant="contained">Didn't Recieve the Email ? Resend Email</Button>
                    </Grid>
                </>}
            </Grid>

            {!success &&
                <form onSubmit={forgotPassword}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField fullWidth type="email" margin="normal" label="Enter Your Email" autoFocus name="email" id="email" value={email} onChange={handleChangeInput} />
                            <Box display='flex' justifyContent="right">
                                <Link to="/login" style={{ color: 'grey' }}>
                                    <Typography variant="caption" >Go Back To Login Page</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" disableElevation type="submit">Recover Password</Button>
                        </Grid>
                    </Grid>
                </form>
            }
        </AuthPagesCover>
    )
}

export default ForgotPassword
