const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    rating: String,
    review: String,
    email: String,
    user: { type: mongoose.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
})

module.exports = mongoose.model('feedback', feedbackSchema)