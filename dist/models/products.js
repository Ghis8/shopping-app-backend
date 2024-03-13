import mongoose, { Schema } from "mongoose";
var categories;
(function (categories) {
    categories[categories["Phones"] = 0] = "Phones";
    categories[categories["Computers"] = 1] = "Computers";
    categories[categories["Accessories"] = 2] = "Accessories";
    categories[categories["Furniture"] = 3] = "Furniture";
    categories[categories["Clothes"] = 4] = "Clothes";
    categories[categories["Shoes"] = 5] = "Shoes";
    categories[categories["Automobile"] = 6] = "Automobile";
})(categories || (categories = {}));
const ProductSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    name: {
        type: String,
        required: true
    },
    desc: String,
    category: {
        type: String,
        enum: categories,
        default: "Phones"
    },
    price: {
        type: Number,
        required: true
    },
    images: Array,
    ratings: [
        {
            type: Schema.Types.ObjectId,
            ref: "rating"
        }
    ]
}, { timestamps: true });
export default mongoose.model('product', ProductSchema);
