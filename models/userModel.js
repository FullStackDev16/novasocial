const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "https://res.cloudinary.com/programminghero/image/upload/v1641816261/Profile%20Images/User_Blue_zsb2vt.png"
    },
    coverImage: {
        type: String,
        default: "https://res.cloudinary.com/programminghero/image/upload/v1641815752/Banner%20Images/Banner_Blue_aax9n1.jpg"
    },
   
    role: {
        type: String,
        default: "user"
    },
    gender: {
        type: String,
        default: "other"
    },
    dateofbirth: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    about: {
        type: String,
        default: "",
        maxlength: 1000,
    },
    bio: {
        type: String,
        default: "",
        maxlength: 1500,
    },
    links: {
        type: Array,
    },
    story: {
        type: String,
        default: ""
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    blocked: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'user' }]

}, { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)