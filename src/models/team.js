const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    userphoto: {
        type: String,
        required: true,
        trim: true
    },
    facebookurl: {
        type: String,
        required: false,
    },
    weburl: {
        type: String,
        required: false,
    },
    linkdinurl: {
        type: String,
        required: false,
    }

})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team