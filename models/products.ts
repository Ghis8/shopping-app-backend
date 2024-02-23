import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document{
    name:string
    owner:string
    desc?:string
    price:number
    category:string
    images?:[]
    ratings:[]
}

enum categories{
    Phones,
    Computers,
    Accessories,
    Furniture,
    Clothes,
    Shoes,
    Automobile
}



const ProductSchema:Schema=new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String,
        required:true
    },
    desc:String,
    category:{
        type:String,
        enum:categories,
        default:"Phones"
    },
    price:{
        type:Number,
        required:true
    },
    images:Array,
    ratings:[
        {
            type:Schema.Types.ObjectId,
            ref:"rating"
        }
    ]
},{timestamps:true})

export default mongoose.model('product',ProductSchema)