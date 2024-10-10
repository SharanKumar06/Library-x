const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    phone: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    role:{
        type: String,
        required: true,
        default: 'patron'
    },
    status:{
        type: String,
        required: true,
        default: 'active'
    }
})