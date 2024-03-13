import mongoose, { Schema } from "mongoose";
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Customer"] = 1] = "Customer";
    Role[Role["Seller"] = 2] = "Seller";
})(Role || (Role = {}));
const CustomerSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true, min: 6 },
    token: String,
    role: {
        type: String,
        enum: Role,
        default: "Customer"
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
}, {
    timestamps: true
});
CustomerSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password'];
        delete ret['__v'];
        return ret;
    }
});
export default mongoose.model('user', CustomerSchema);
