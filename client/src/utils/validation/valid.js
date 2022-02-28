import validateEmail from "./validateEmail"

const valid = ({ fullname, username, email, password, cfpassword, gender }) => {
    const err = {}

    if (!fullname) {
        err.fullname = 'Please add your your Name'
    } else if (fullname.length > 25) {
        err.fullname = 'Your Name is Up to 25 characters long'
    }

    if (!username) {
        err.username = 'Please add your User Name'
    } else if (username.length > 25) {
        err.username = 'User Name is Up to 25 characters long'
    }


    if (!email) {
        err.email = 'Please add your Email'
    } else if (!validateEmail(email)) {
        err.email = 'Please add a valid email address'
    }

    if (!password) {
        err.password = 'Please add your Password'
    } else if (password.length < 6) {
        err.password = 'Password must be at least 6 characters'
    }

    if (cfpassword !== password) {
        err.cfpassword = 'Confirm password did not match'
    }

    return {
        errorMsg: err,
        errlength: Object.keys(err).length
    }
}


export default valid
