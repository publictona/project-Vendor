const mongoose = require ('mongoose')
const ObjectId =mongoose.Schema.Types.ObjectId

const vegetableSchema = new mongoose.Schema({

    veggieName :{
        type :String,
        required:true,
        trim :true
    },

    seassionalVeggies :{
        type :String,
        required:true,
        enum :['summer' ,'rainy','winter'],
        trim :true
    },

    vendorId :{
        type : ObjectId,
        ref : 'VendorDetails',
        required:true,
        unique :true
    },

    isAvailableVeggie :{
        type :String,
        required: true,
        default:Yes,
        trim :true
    },

    veggieImage :{
         type: String,
        required: true,
    },  // s3 lin

    quantity :{
        type :String,
        enum:['225gm','500gm' ,'725gm','1000gm'],
        required:true
    },

    veggiePrice :{
        type:Number,
        required:true
    },

    category :{
        type:String,
        enum:['veg' ,'nonVeg'],
        required :true
    }
    //payment

},{timestamps:true})

module.exports = mongoose.model('Vegetable' ,vegetableSchema)

