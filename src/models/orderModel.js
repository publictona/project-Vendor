const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorDetails',
        required: true,
        unique: true
    },
    veggiesList: [{
        vegitableId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vegetable',
            required: true
        },
        quantity: {
            type: String,
            required: true,
            min: 10,//vendor have to order veggies stockin bulk}
            max: 15
        }
    }],

    totalPrice: {
        type: Number,
        required: true,//total all veggies price which veggies present in the basket 
    },
    totalVeggiesPresent: {
        type: Number,
        required: true,//total all veggies Number which veggies present in the basket

    },

    totalQuantity: {
        type: Number,
        required: true//"Holds total number of quantity in the basket"
    },

    cancleOrder: {
        type: Boolean,
        default: true,
    },

    status: {
        type: String,
        default: pending,
        enum: ['pending', 'Successfull order', 'cancled']
    },
    deletedAt: {
        type: Date,

    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

module.exports = mongoose.model('OrderVeggie', orderSchema)







