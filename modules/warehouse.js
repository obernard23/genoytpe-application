const mongoose = require('mongoose');
const { isEmail} = require('validator');
var id = new mongoose.Types.ObjectId;

const toReciveSchema = new mongoose.Schema()

const WHSchema = new  mongoose.Schema({
    WHName:{
        type : String,
        required:true,
        lowercase:true
    },
    toRecive:{
        type:Array,
        stock: {
            type:Object,
            item:{
                type:Array,
                products:{
                type:Object,
                productId: mongoose.SchemaTypes.ObjectId,
                quantity: Number,
                scale: String,
                id :()=> new mongoose.Types.ObjectId()
                    }
            },
        status:{
            type:String,
            default:'Pending'
                },
        date:{
            type:Date,
            immutable:true,
            default:()=>Date.now()
            },
        driver:String,
        DVN:String,
        driverTel:String,
        id :()=> new mongoose.Types.ObjectId()
                }
    },
    Bills:[],
    Storage:[],
    Notification:{
        type:Array,
    },
    expense:{
        type:Array,
    },
    Tel:{
        type:Number,
        unique:true,
    },
    Email:{
        type:String,
        required:[true,'please entert an Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please eneter a valid Email']
    },
    Status:{
        type:String,
    },
    state:{
        type:String,
    },
    InvoiceNo:{
        type:String,
        required:true
    },
    others:{
        type:String,
    },
    Documents:{
        type:Array,
    },
    WHIDS:{
        type: String,
    },
    Note:{
        type:Array,
    },
    Manager:{
        type:String
    },
    Scrap:{
        type:Array,
    }
},{timestamps:true});

const  WHouse = mongoose.model(' WHouse',WHSchema);

module.exports = WHouse;