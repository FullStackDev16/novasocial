const Users = require("../models/userModel")
const Notifies = require('../models/notifyModel')
const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Feedback = require('../models/feedbackModel')

const userCtrl = {
    searchUser: async (req, res) => {
        try {
            let query;
            if (req.query.username.charAt(0) == "@") { query = req.query.username.substring(1) }
            else { query = req.query.username }

            const users = await Users.find({ $username: { $search: query } }).select("fullname username profileImage coverImage")
            res.json({ users })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select("-password").populate("followers following", '-password')
            if (!user) return res.status(500).json({ msg: "User does not exists" })
            res.json({ user })

        } catch (error) {
            res.status(500).json({ msg: "User does not exists" })
        }
    },
    updateUserProfle: async (req, res) => {
        try {
            const { profileImage, coverImage, fullname, dateofbirth, mobile, gender, about, website, address } = req.body;

            if (!fullname) return res.status(500).json({ msg: "Please add your fullname" })
            await Users.findOneAndUpdate({ _id: req.user._id }, { profileImage, coverImage, fullname, dateofbirth, mobile, gender, about, website, address })

            res.json({ msg: "Profile Updated" })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    follow: async (req, res) => {
        try {
            const user = await Users.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) {
                return res.status(500).json({ msg: "You already followed this user" })
            }
            await Users.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.user._id } }, { new: true })
            await Users.findOneAndUpdate({ _id: req.user._id }, { $push: { following: req.params.id } }, { new: true })

            res.json({ msg: "User Followed" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    unfollow: async (req, res) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params.id }, { $pull: { followers: req.user._id } }, { new: true })
            await Users.findOneAndUpdate({ _id: req.user._id }, { $pull: { following: req.params.id } }, { new: true })

            res.json({ msg: "User UnFollowed" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    suggestionsUser: async (req, res) => {
        try {
            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 10

            const users = await Users.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
            ]).project("-password")

            return res.json({
                users,
                result: users.length
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Posts.deleteMany({ user: req.params.id })
            await Comments.deleteMany({ user: req.params.id })
            await Notifies.deleteMany({ user: req.params.id })
            await Users.findByIdAndDelete(req.params.id)

            res.json({ msg: "Deleted Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    feedbackUser: async (req, res) => {
        try {
            const { email, rating, review } = req.body;
            const feedback = new Feedback({ rating, review, user:req.user._id, email });
            await feedback.save();

            res.json({ msg: "Feedback Send Successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createStory: async (req, res) => {
        try {
            const { media } = req.body
            const user = Users.findById({ _id: req.user._id })
            if (user.story !== "") {
                await Users.findOneAndUpdate({ _id: req.user._id }, { story: media }, { new: true })
                res.json({ msg: "Story Updated" })
            }
            else {
                await Users.findOneAndUpdate({ _id: req.user._id }, { story: media }, { new: true })
                res.json({ msg: "Story Created" })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getStory: async (req, res) => {
        try {
            const user = await Users.findById({ _id: req.params.id }, { new: true })
            res.json({ story: user.story })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteStory: async (req, res) => {
        try {
            await Users.findOneAndUpdate({ _id: req.user._id }, { story: "" })
            res.json({ msg: 'Story Deleted!' })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = userCtrl;