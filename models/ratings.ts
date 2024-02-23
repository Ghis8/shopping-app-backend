import mongoose, { Document, Schema, mongo } from "mongoose";

interface IRatings extends Document{
    author:string
    rate:number
    product:string
    comment?:string
}

const RatingSchema:Schema=new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"product"
    },
    rate:Number,
    comment:String
},{timestamps:true})

export default mongoose.model('rating',RatingSchema)