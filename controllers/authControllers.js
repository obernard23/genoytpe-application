const customer = require('../modules/customers');
const Lead = require('../modules/Leads');
const Product = require('../modules/Product');
const Vendor =require('../modules/Vendors')
const WHouse =require('../modules/warehouse')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ObjectId} = require('mongodb');
const {requireAuth,checkUser} = require('../middleware/authmidddleware')
const mongoose = require('mongoose');
var id = new mongoose.Types.ObjectId();



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '',phone:'' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'That email is already registered';
      errors.phone = 'This Phone number is already registered' 
      return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
    });
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id)=>{
    return jwt.sign({id},'BigBern',{
        expiresIn: maxAge
    })
}


module.exports.signup_get = (req,res)=>{
    res.render('signup',{title:'Ecommerce',name:'BigBern'});
}

module.exports.signin_get = (req,res)=>{
    res.render('SignIn',{title:'Ecommerce',name:'BigBern'});
}                                      

module.exports.cart_get = (req,res)=>{
    res.render('Cart',{title:'Ecommerce',name:'BigBern'});
}

module.exports.FAQ_get = (req,res)=>{
    res.render('FAQ',{title:'Ecommerce',name:'BigBern'});
}

module.exports.index_get = (req,res)=>{
    res.render('index',{title:'Ecommerce',name:'BigBern'});
};

module.exports.About_get = (req,res)=>{
    res.render('About',{title:'Ecommerce',name:'BigBern'});
}

module.exports.Notification_get = (req,res)=>{
    res.render('Notification',{title:'Ecommerce',name:'BigBern'});
}
module.exports.Register_get = (req,res)=>{
    res.render('register',{title:'Ecommerce',name:'BigBern'});
}

module.exports.Reset_get = (req,res)=>{
    res.render('Reset',{title:'Ecommerce',name:'BigBern'});
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/SignIn')
}

module.exports.edith_get =  async (req,res)=>{
    res.render('Edit',{title:'Ecommerce',name:'BigBern'});
}

// reset user page with user details
module.exports.ResetId_get = async (req,res)=>{
    if (ObjectId.isValid(req.params.id)) {
    await customer.findOne({_id : ObjectId(req.params.id)})
    .limit(1)
    .then(doc=>{
        res.render('id',{doc,title:'Ecommerce',name:'BigBern'})
    })
    .catch(err=>{
        res.status(500).json({Error:'could not fetch user'});
    })
    }else{
    res.status(500).json({Error:'not a valid ID'});
   }
}

// register 
module.exports.Register_post = async (req,res)=>{
    const  {
        Username,
        Email ,
        phone, 
        Password ,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const handelPassword  = await bcrypt.hash(Password,salt);

    try{
        const Newcustomer = await customer.create({
            Username,
            Email ,
            phone, 
            Password :handelPassword,});
            const token = createToken(Newcustomer._id)
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000})
            res.status(201).json({Newcustomer : Newcustomer._id})
            
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

//login
module.exports.signin_post = async (req,res)=>{
    const {email,password} = req.body;
    try{
         await customer.findOne({Email:email})
        .limit(1)
        .then(async (data)=>{
            if (data){
                const auth = await bcrypt.compare( password,data.Password)
                if (auth){
                    const token = createToken(data._id)
                    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge * 1000})
                    res.status(200).json({Newcustomer : data._id})
                }else{
                    res.status(400).json({errorPassword:'Wrong Password'})
                }
            }else{
                res.status(400).json({errorMessage:'Not a registered Email'})
            }
        })
    }catch(e){
        res.status(500).json({serverError:'Something went wrong'})
    } 
}

//for password reset
module.exports.Reset_post = async (req,res)=>{
    const {EmailTOreset} = req.body;
    try{
        await customer.findOne({Email:EmailTOreset})
        .limit(1)
        .then(async (data)=>{
            if (!data){
                const errorMessage = 'No user account Found'
                res.status(400).json({errorMessage})
            }else{
                res.status(201).json({reset : data})
            }
        })
    }catch(err){res.status(400).json({err})}
}

//make patch request to update  an item
module.exports.ResetId_patch = async (req,res)=>{
    const update = req.body
    // const salt = await bcrypt.genSalt();
    // const handelPassword  = await bcrypt.hash(update,salt).toString() 
    if (ObjectId.isValid(req.params.id)) {
        customer.updateOne({_id : ObjectId(req.params.id)},{$set : update})
        .then(result=>{
            res.status(200).json({result:'Updated'})
        })
        .catch(err=>{
            res.status(500).json({error:'could not update document'})
        })
    }else{
        res.status(500).json({error:'Not a valid doc ID'})
    }
}

// for Lead creation from footer
module.exports.Lead_post = async (req, res)=>{
    const {Email} = req.body
    try{
        await Lead.create({Email})
        res.status(201).json({Message : "registered"})
    }catch(err){
        res.status(500).json({ERROR: 'Bad request'})
    }
}


// for sales module. please copy  when done

module.exports.ProductCreate_get = async (req,res)=>{
    res.render('Create',{title:'Ecommerce',name:'BigBern'})
}

//get and dispaly all vendor
module.exports.Vendors_get = async (req,res)=>{
    const vendor = await Vendor.find()
    res.render('Vendors',{vendor,title:'Vendors',name:'BigBern'})
}

module.exports.VendorCreate_get = async(req,res)=>{
    res.render('Vendor-create',{title:'Vendors',name:'BigBern'})
}


module.exports.VendorCreate_post = async(req,res)=>{
   const {Name,
    Categories,
    image,
    contact,
    vendor_tel,
    mobile_tel,
    email,
    Address,
    Manufacturer,
    w_Location,
    status,
    block_vendor,
    Account_num,
    Account_name,
    Bank_name} = req.body
    try{
        await Vendor.create({Name,
            Categories,
            image,
            contact,
            vendor_tel,
            mobile_tel,
            email,
            Address,
            Manufacturer,
            w_Location,
            status,
            block_vendor,
            Account_num,
            Account_name,
            Bank_name})
            res.status(200).json({Message:'New Vendor Registered'})
    }catch(e){
        res.status(500).json({error:'Something went Wrong'})
    } 

}

// get all products
module.exports.Product_get = async (req,res)=>{
    const Products = await Product.find()
    res.render('Products',{Products,title:'Sales',name:'BigBern'})
}

//get all ecomerce customers  
module.exports.Customer_get = async (req,res)=>{
    const Cusomers = await customer.find();
    res.render('Customers',{Cusomers,title:'Sales',name:'BigBern'})
}

module.exports.ProductCreate_post = async (req,res)=>{
const  {Name,
    category,
    image,
    selling_Price,
    vendor_Price,
    Vendor,
    UMO,
    color,
    Description,
    ReplenishQty,
    Sellable,
    Ecom_sale,
    Manufacturer,
    Expiry_date,
    Manufacture_Date,
    product_code} = req.body

try{
    await Product.create({Name,
        category,
        image,
        selling_Price,
        vendor_Price,
        Vendor,
        UMO,
        color,
        Description,
        ReplenishQty,
        Sellable,
        Ecom_sale,
        Manufacturer,
        Expiry_date,
        Manufacture_Date,
        product_code})
        res.status(200).json({Message:'New Product Created'})
    }  catch(err){console.log(err)}
}

// get product from invoice
module.exports.productFind_get = async (req,res)=>{
    if (ObjectId.isValid(req.params.id)) {
        await Product.findOne({_id : ObjectId(req.params.id)})
        .limit(1)
        .then(item=>{
            res.status(200).json({item})
        })
    }
}

//get customer
module.exports.CustomerFind_get = async (req,res)=>{
    if (ObjectId.isValid(req.params.id)) {
        await customer.findOne({_id : ObjectId(req.params.id)})
        .limit(1)
        .then(item=>{
            res.status(200).json({item})
        })
    }
}

//for warehouse ops
module.exports.warehouse_get = async (req,res)=>{
    const WHouses = await WHouse.find()
    res.render('warehouse',{title:'Warehouse',WHouses})
}

//post request for warehouse
module.exports.wareHouse_post= async (req,res)=>{
    const {WHName,
        Manager,
        WHIDS,
        Location,
        Tel,
        Email,
        state,
        InvoiceNo,
        others,Status} = req.body
        try{
            WHouse.create({WHName,
                Manager,
                WHIDS,
                Location,
                Tel,
                Email,
                state,
                InvoiceNo,
                others,Status})
        }catch(e){}
}

//edit ware house
module.exports.warehouseById_get = async (req,res)=>{
   
    if (ObjectId.isValid(req.params.id)) {
        const Products = await Product.find()
        await WHouse.findOne({_id : ObjectId(req.params.id)})
        .limit(1)
        .then(item=>{
            res.render('warehouseops',{result:item,Products})
        })
    }
}

// create invoice page
module.exports.Invoice_get = async (req,res)=>{
    const Products = await Product.find()
    const Cusomers = await customer.find();
    if (ObjectId.isValid(req.params.id)) {
        await WHouse.findOne({_id : ObjectId(req.params.id)})
        .limit(1)
        .then(item=>{
            res.render('createInvoice',{wareHouse:item,Products,Cusomers,title:'Vendors',name:'BigBern'})
        })
    }
}

//Edit_patch request to update  an item
module.exports.Edit_patch = async (req,res)=>{
    const update = req.body
    console.log(update)
    // const salt = await bcrypt.genSalt();
    // const handelPassword  = await bcrypt.hash(update,salt).toString() 
    if (ObjectId.isValid(req.params.id)) {
        WHouse.updateOne({_id : ObjectId(req.params.id)},{$set : update})
        .then(result=>{
            res.status(200).json({result:'Updated'})
        })
        .catch(err=>{
            res.status(500).json({error:'could not update document'})
        })
    }else{
        res.status(500).json({error:'Not a valid doc ID'})
    }
}

module.exports.stock_get = async (req, res)=>{
    const Products = await Product.find()
    const wareHouse = await WHouse.find()
    res.render('stockMove',{Products,wareHouse,name:'BigBern'})
}

//get ware house from to recive
module.exports.WareHouseStoreage_post = async(req,res)=>{
    //warehouse id, batch id,prooduct
    const {batch_Id,productid,WhId,performQTY} = req.body
    console.log(req.body)
    if (ObjectId.isValid(req.body.WhId)) {
        WHouse.findById({_id : req.body.WhId})//check ware house 
        .then(async(warehouse)=>{
            let batchId = warehouse.toRecive.map(batches=>{
                return batches;
            }).filter(batch=>{
                return batch._id == req.body.batch_Id 
            })
            let item = await batchId.map(prod =>{ 
               return prod.item.filter(id=>
                {return id._id === '640d0aab6c76fdf1e877bc4b'}
                )
            })
            console.log( item)
                
        })
    }
}

//add product to ware house to recive array
module.exports.WareHouseStock_post = async(req,res)=>{
    //find warehouse from request body
    const {WHName,stock} =  req.body
        try{
            await WHouse.findOne({WHName : req.body.WHName})
            .limit(1)
            .then(item=>{
                const Notification = {body:`New batch of ${req.body.stock.item.length} product was sent to your ware house on ${req.body.stock.Date}`,_id:id}
                item.toRecive.unshift(req.body.stock)
                item.Notification.unshift(Notification)
                item.save()
            }).then(result=>{
                res.status(200).json({result:`Product has been sent to ${WHName} for the manager to validate`})
            })
        }catch(e){res.status(400).json({error:e})}
}