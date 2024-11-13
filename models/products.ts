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
    Phones="phones",
    Computers="computers",
    Accessories="accessories",
    Furniture="furniture",
    Clothes="clothes",
    Shoes="shoes",
    Automobile="automobile"
}



const ProductSchema:Schema=new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    desc:String,
    category:{
        type:String,
        enum:categories,
        default:"phones"
    },
    price:{
        type:Number,
        required:true
    },
    numStock:{
        type:Number,
        default:1
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