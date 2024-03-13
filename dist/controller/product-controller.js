var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from '../models/products';
import User from '../models/user';
// create product
export const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, desc, price, images } = req.body;
    //@ts-ignore
    const token = req.token;
    try {
        if (token.role === 'Seller') {
            const user = yield User.findById({ _id: token.userId }).populate('products');
            // console.log(user)
            //@ts-ignore
            if (user.products.length > 0) {
                //@ts-ignore
                let existingProduct = user.products.filter(product => product.name === name);
                // console.log("exist",existingProduct)
                if (existingProduct.length > 0) {
                    // TODO: UPDATE EXISTING PRODUCT
                }
            }
            const newProduct = yield Product.create({
                owner: token.userId,
                name,
                desc,
                price,
                images
            });
            const profile = yield User.findByIdAndUpdate({ id: token.userId }, {
                $push: {
                    products: {
                        _id: newProduct._id
                    }
                }
            });
            //@ts-ignore
            profile.save();
            newProduct.save();
            return res.status(201).json({ message: `Product "${name}" created Successfully!`, product: newProduct });
        }
        return res.status(401).json({ message: "You are unauthorized to perform this action" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
//get all products 
export const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const token = req.token;
    try {
        if (token.role == 'Customer' || token.role == 'Admin') {
            const products = yield Product.find()
                .populate('owner');
            return res.status(200).json({ products });
        }
        else if (token.role == 'Seller')
            return res.status(401).json({ message: "You are unauthorized to perform this action" });
        else {
            return res.status(400).json({ message: "something went wrong!" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
// update product
export const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, id } = req.params;
    const { name, desc, category, price, images } = req.body;
    //@ts-ignore
    const token = req.token;
    try {
        const profile = yield User.findById({ _id: userId });
        if (token.userId == (profile === null || profile === void 0 ? void 0 : profile._id)) {
            const product = yield Product.findByIdAndUpdate({ _id: id }, {
                name,
                desc,
                category,
                price
            });
            product === null || product === void 0 ? void 0 : product.save();
            return res.status(200).json({ message: `${product === null || product === void 0 ? void 0 : product.name} updated Successfully` });
        }
        return res.status(401).json({ message: "You are unauthorized to perform this action" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
// add product to favorite
export const addToFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId } = req.params;
    //@ts-ignore
    const token = req.token;
    try {
        const profile = yield User.findById({ _id: userId });
        if (profile) {
            if ((profile === null || profile === void 0 ? void 0 : profile._id) == token.userId) {
                if ((profile === null || profile === void 0 ? void 0 : profile.role) == "Customer" || token.role == "Customer") {
                    const updateProfile = yield User.findByIdAndUpdate({ _id: userId }, {
                        $push: {
                            favorites: {
                                _id: productId
                            }
                        }
                    });
                    updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.save();
                    return res.status(200).json({ message: `Product added to favorites` });
                }
                return res.status(401).json({ message: "You are not authorized to perform this action" });
            }
        }
        return res.status(400).json({ message: "something went wrong" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
//add to cart
export const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    //@ts-ignore
    const token = req.token;
    try {
        const profile = yield User.findById({ _id: userId });
        if (profile) {
            if ((profile === null || profile === void 0 ? void 0 : profile._id) == token.userId && token.role == "Customer" || profile.role == "Customer") {
                const updateProfile = yield User.findByIdAndUpdate({ _id: userId }, {
                    $push: {
                        cart: {
                            _id: productId
                        }
                    }
                });
                updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.save();
                return res.status(200).json({ message: "Product Added to cart!" });
            }
            return res.status(400).json({ message: "" });
        }
        return res.status(404).json({ message: "User not found!" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
// get Product by name only by Customers
export const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product.findById(id).populate('owner').populate('ratings');
        return res.status(200).json({ message: "Product Found", product });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
