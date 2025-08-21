const mongoose=require('mongoose')

const add_product=new mongoose.Schema({
    product_code:{type:String},
    product_category:{type:String},
    product_type:{type:String},
    product_name:{type:String},
    product_sku:{type:String},
    product_price:{type:String},
    product_quantity:{type:String},
    product_image:{type:Array},
    product_description:{type:String},
    product_benefits:{type:Array},
    product_quantity1:{type:Number},
    product_hsn_code:{type:Number},
    product_lbh_unit:{type:String},
    product_weight_unit:{type:String},
    product_length:{type:Number},
    product_breadth:{type:Number},
    product_height:{type:Number},
    product_weight:{type:Number}
   
    
    },{timestamps:true})

const addproduct=mongoose.model('add_product',add_product)
module.exports=addproduct