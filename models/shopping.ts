import mongoose, { Document, Schema } from "mongoose";

interface IShopping extends Document{
    buyer:string
    product:string
}

const ShoppingSchema:Schema= new Schema({
    buyer:{
        type:Schema.Types.ObjectId,
        ref:"user"
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product'
    }
})

export default mongoose.model('shopping',ShoppingSchema)