import mongoose, { Schema } from "mongoose";
const ShoppingSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});
export default mongoose.model('shopping', ShoppingSchema);
