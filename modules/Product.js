const mongoose = require('mongoose');
const { isEmail} = require('validator');

const ProductSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Provide a Product Name'],
        unique: true
    },
    Vendor:{
        type:String,
        required:[true,'Provide vendor']
    },
    Sellable:{
        type:String,
        required:true,
        default:false
    },
    image:{
        type:String,
    },
    vendor_Price:{
        type:Number,
        required:true
    },
    selling_Price:{
        type:Number,
        required:true
    },
    product_code:{
        type:String,
    },
    UMO:{
        type:String,
    },
    Manufacturer:{
        type:String
    },
    Description:{
        type:String
    },
    Categories:{
        type:String
    },
    ActivityLog:{
        type:Array
    },
    Atributes:{
        type:Array
    },
    Ecom_sale:{
        type:String
    },
    Expiry_date:{
        type:String
    },
    Manufacture_Date:{
        type:String
    }

},{timestamps:true})

const  Product = mongoose.model(' Products',ProductSchema);

module.exports = Product