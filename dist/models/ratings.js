import mongoose, { Schema } from "mongoose";
const RatingSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    rate: Number,
    comment: String
}, { timestamps: true });
export default mongoose.model('rating', RatingSchema);
