import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Box, Button, Grid, TextField } from '@mui/material'
import { postDataAPI } from '../../utils/fetchData'
import AuthPagesCover from "./AuthPagesCover"


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const { token } = useParams()

    const { password, cf_password, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }


    const handleResetPass = async (e) => {
        e.preventDefault();
        if (password.length < 6)
            return setData({ ...data, err: "Password must be at least 6 characters long", success: '' })

        if (!password === cf_password)
            return setData({ ...data, err: "Password did not match", success: '' })

        try {
            const res = await postDataAPI('/reset', { password }, token)

            return setData({ ...data, err: "", success: res.data.msg })

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }

    }


    return (
        <AuthPagesCover title="Password Reset" subtitle="Reset your account password">

            <Box mt={3}>
                <Grid container spacing={2}>
                    {err && <Grid item xs={12}>
                        <Alert variant="filled" severity="error">{err}</Alert>
                    </Grid>}

                    {success && <>
                        <Grid item xs={12}>
                            <Alert variant="filled" severity="success">{success}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Link to="/login">
                                <Button fullWidth variant="contained">Go To Login Page</Button>
                            </Link>
                        </Grid>
                    </>}
                </Grid>
            </Box>

            {!success && <Box mt={2}>
                <form onSubmit={handleResetPass}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" label="password" autoFocus name="password" id="password" value={password} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" label="confirm password" name="cf_password" id="cf_password" value={cf_password} onChange={handleChangeInput} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" disableElevation type="submit">Reset Password</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            }

        </AuthPagesCover>
    )
}

export default ResetPassword
