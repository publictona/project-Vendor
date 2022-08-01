const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema({

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

    totalPrice : {
        type : Number,
        required :true ,//total all veggies price which veggies present in the basket 
    },
    totalVeggiesPresent :{
        type :Number,
        required: true,//total all veggies Number which veggies present in the basket

    }

},{timestamps:true})

module.exports = mongoose.model('Basket' ,basketSchema)





