const router = require('express').Router()
const authCtrl = require("../controllers/authCtrl")
const auth = require("../middlewares/auth")

router.post('/register', authCtrl.register)
router.post('/activate_user', authCtrl.activateEmail)

router.post("/login", authCtrl.login)
router.post("/refresh_token", authCtrl.generateAccessToken)

router.post('/forgot', authCtrl.forgotPassword)
router.post('/reset', auth, authCtrl.resetPassword)

router.post('/google_login', authCtrl.googleLogin)

router.post("/logout", authCtrl.logout)


module.exports = router