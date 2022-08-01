const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    mobileNum: {
        type: Number,
        required: true,
        unique:true
    },

    age: {
        type: Number,
        required: true
    },

    DOB: {
        type: Date,
        required :true
    },

    gender: {
        type: String,
        required :true,
        enum: ['male', 'female', 'others'],
        trim:true
    },

    profileImage: {
        type: String,
        required: true,
    } // s3 link

    // permanentAddress: [{
    //     street: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     city: {
    //         type: String,
    //         required: true,
    //         trim: true
    //     },
    //     pincode: {
    //         type: Number,
    //         required: true,
    //         trim: true
    //     }
    // }]

},{timestamps: true}) 

module.exports = mongoose.model('VendorDetails',vendorSchema)