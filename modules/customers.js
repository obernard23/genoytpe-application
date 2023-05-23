const mongoose = require('mongoose');
const { isEmail} = require('validator');

const CustomerSchema = new  mongoose.Schema({
    Username:{
        type : String,
        required:[true,'This field cannot be empty'],
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
    phone:{
        type:Number,
        required:[true,'please provide us Your phone Number'],
        unique:true,
    },
    Email:{
        type:String,
        required:[true,'please entert an Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please eneter a valid Email']
    },
    DOB:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    street:{
        type:String,
        required:false
    },
    Land_mark:{
        type:String,
        required:false
    },
    HouseNumber:{
        type:String,
        required:false
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Question1:{
        type:String,
        required:false
    },
    Question1Ans:{
        type:String,
        required:false 
    },
    Question2:{
        type:String,
        required:false
    },
    Question2Ans:{
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
    }

},{timestamps:true});

// save hashed password before updating to db
// CustomerSchema.pre('save', async function(doc,next){
//     const salt = await bcrypt.genSalt();
//     this.Password =  await bcrypt.hash(this.Password,salt)
//     next();
// })

const  Customer = mongoose.model(' Customer',CustomerSchema);

module.exports= Customer
