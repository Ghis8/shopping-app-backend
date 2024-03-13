var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user";
import Product from "../models/products";
export const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    const { rate, comment } = req.body;
    //@ts-ignore
    const token = req.token;
    try {
        const profile = yield User.findById({ _id: userId });
        if (profile) {
            if (profile._id == token.userId && token.role == 'Customer' || profile.role == 'Customer') {
                const rateProduct = yield Product.findByIdAndUpdate({ _id: productId }, {
                    rate,
                    comment
                });
                rateProduct === null || rateProduct === void 0 ? void 0 : rateProduct.save();
                return res.status(200).json({ message: ` You Rated ${rateProduct === null || rateProduct === void 0 ? void 0 : rateProduct.name} Product` });
            }
            return res.status(401).json({ message: "You are not authorized to do this action" });
        }
        return res.status(404).json({ message: "User not found" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
