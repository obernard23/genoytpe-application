const mongoose = require('mongoose');
const { isEmail} = require('validator');

const CRMSchema = new  mongoose.Schema({
    Name:{
        type : String,
        required:false,
        lowercase:true
    },
    cart:{
        type:Array,
        required:false
    },
    Notification:{
        type:Array,
        required:false
    },
    purchased:{
        type:Array,
        required:false
    },
    Tel:{
        type:Number,
        required:false,
        unique:true,
    },
    Email:{
        type:String,
        required:[true,'please entert an Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please eneter a valid Email']
    },
    country:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    Land_mark:{
        type:String,
        required:false
    },
    Address:{
        type:String,
        required:false
    },
    NewsFeedSubscription:{
        type: Boolean,
        default: false
    },
    Image:{
        type:String,
        required:false
    },
    Activation:{
        type: Boolean,
        default: false
    },
    blocked:{
        type: Boolean,
        default: false
    },
    Note:{
        type:Array,
        default:false
    },
    status:{
        type:String
    }
});

const  CRMLEADS = mongoose.model(' CRMLEADS',CRMSchema);

module.exports = CRMLEADS;