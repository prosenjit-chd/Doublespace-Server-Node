const mongoose = require('mongoose')

const utilitiesSchema = new mongoose.Schema({
    hometitle: {
        type: String,
        required: true,
        trim: true
    },
    homemoto: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    bannerphoto: {
        type: String,
        required: true,
        trim: true
    },
    hireustitle: {
        type: String,
        required: true,
        trim: true
    },
    hireusdetails: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    abouttitle: {
        type: String,
        required: true,
        trim: true
    },
    aboutdetails: {
        type: String,
        required: true,
        trim: true
    },
    aboutphoto: {
        type: String,
        required: true,
        trim: true
    },
    facebookurl: {
        type: String,
        required: true,
        trim: true
    },
    twitterurl: {
        type: String,
        required: true,
        trim: true
    },
    linkdinurl: {
        type: String,
        required: true,
        trim: true
    },
    isactive: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Utilities = mongoose.model('Utilities', utilitiesSchema)

module.exports = Utilities