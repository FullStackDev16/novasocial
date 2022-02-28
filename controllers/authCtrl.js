const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendmail/sendMail");
const verificationEmailContent = require("./sendmail/content/emailVerification");

const { google } = require('googleapis')
const { OAuth2 } = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)
const { CLIENT_URL } = process.env;
var rug = require('random-username-generator');

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password } = req.body;
            let newusername = username.toLowerCase().replace(/ /g, "");

            const user_name = await Users.findOne({ username: newusername });
            if (user_name)
                return res.status(400).json({ msg: "this username already exists" });

            if (!validateEmail(email))
                return res.status(400).json({ msg: "please add a valid email address" });

            const user_email = await Users.findOne({ email });
            if (user_email)
                return res.status(400).json({ msg: "this Email already exists" });

            if (password.length < 6)
                return res.status(400).json({ msg: "password must have atleast 6 characters" });
            const hashPassword = await bcrypt.hash(password, 12);

            const newUser = {
                fullname,
                username: newusername,
                email,
                password: hashPassword,
            };

            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activate/${activation_token}`;
            sendEmail(email, url, "Email verification", verificationEmailContent(fullname, url));

            res.json({
                msg: "Register Success! Please activate your email to start",
            });
        } catch (error) {
            res.status(500).json({ msg: error.msg });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET)

            if (!user) {
                return res.status(400).json({ msg: "This link is expired .Register again to get new link" });

            }
            const { username, fullname, email, password } = user;

            const check = await Users.findOne({ email });
            if (check)
                return res.status(400).json({ msg: "This email already exists" });

            const newUser = new Users({ fullname, username, email, password });
            await newUser.save();

            res.json({ msg: "Account has been activated !" });


        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email })
                .select("-password")
                .populate({
                    path: "following",
                    select: "-password",
                })
                .populate({
                    path: "followers",
                    select: "-password",
                })

            if (!user)
                return res.status(400).json({ msg: "This email does not exists." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect" });

            const access_token = createAccessToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/api/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milisecond
            });

            res.json({
                msg: "Login Succesful!",
                access_token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (error) {
            res.status(500).json({ msg: error.msg });
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
            res.json({
                msg: "Logged Out!",
            });
        } catch (error) {
            res.status(500).json({ msg: error.msg });
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const refresh_token = req.cookies.refreshtoken;
            if (!refresh_token) {
                return res.status(400).json({
                    msg: "Something Went Wrong While Logging In. Please Login Again ",
                });
            }
            jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            msg: "Please Login Now",
                        });
                    }


                    const user = await Users.findById(result.id)
                        .select("-password")
                        .populate({
                            path: "following",
                            select: "-password",
                        })
                        .populate({
                            path: "followers",
                            select: "-password",
                        })


                    if (!user) {
                        return res.status(400).json({
                            msg: "Please Login Now",
                        });
                    }
                    const access_token = createAccessToken({ id: result.id });
                    return res.json({ access_token, user });
                }
            );
        } catch (error) {
            return res.status(500).json({ msg: error.msg });
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`
            sendEmail(email, url, "Reset your password", verificationEmailContent(user.fullname, url))
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    googleLogin: async (req, res) => {
        try {
            const { tokenId } = req.body

            const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

            const { email_verified, email, name, picture } = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

            const user = await Users.findOne({ email })
                .select("-password")
                .populate({
                    path: "following",
                    select: "-password",
                })
                .populate({
                    path: "followers",
                    select: "-password",
                })



            if (user) {
                const access_token = createAccessToken({ id: user._id });
                const refresh_token = createRefreshToken({ id: user._id });

                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/api/refresh_token",
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milisecond
                });

                res.json({
                    msg: "Login Succesful!",
                    access_token,
                    user: {
                        ...user._doc,
                        password: "",
                    },
                });
            } else {
                var new_username = rug.generate();
                const newUser = new Users({ username: new_username, fullname: name, email, password: passwordHash, profileImage: picture })
                await newUser.save()

                const populatedUser = await Users.findOne({ _id: newUser._id })
                    .select("-password")
                    .populate({
                        path: "following",
                        select: "-password",
                    })
                    .populate({
                        path: "followers",
                        select: "-password",
                    })

                const access_token = createAccessToken({ id: populatedUser._id });
                const refresh_token = createRefreshToken({ id: populatedUser._id });

                res.cookie("refreshtoken", refresh_token, {
                    httpOnly: true,
                    path: "/api/refresh_token",
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milisecond
                });

                res.json({
                    msg: "Login Succesful!",
                    access_token,
                    user: {
                        ...populatedUser._doc,
                        password: "",
                    },
                });
            }


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
};

const validateEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: "5m",
    });
};
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = authCtrl;
