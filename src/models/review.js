const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        trim: true
    },
    ownerDesignation: {
        type: String,
        required: true,
        trim: true
    },
    ownerPhoto: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review