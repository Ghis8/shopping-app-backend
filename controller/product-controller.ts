import { Request, Response } from "express";
import Product from '../models/products'
import User from '../models/user'




// create product
export const createProduct=async(req:Request,res:Response)=>{
    const {name,desc,price,images}=req.body
    //@ts-ignore
    const token=req.token
    try {
        if(token.role === 'Seller'){
            const user=await User.findById({_id:token.userId}).populate('products')
            // console.log(user)
            //@ts-ignore
            if(user.products.length > 0){
                //@ts-ignore
                let existingProduct= user.products.filter(product=> product.name=== name)
                // console.log("exist",existingProduct)
                if (existingProduct.length > 0){
                    
                    // TODO: UPDATE EXISTING PRODUCT
                }
                
            }
            const newProduct=await Product.create({
                owner:token.userId,
                name,
                desc,
                price,
                images
            })
            const profile=await User.findByIdAndUpdate({id:token.userId},{
                $push:{
                    products:{
                        _id:newProduct._id
                    }
                }
            })
            //@ts-ignore
            profile.save()
            newProduct.save()
            return res.status(201).json({message:`Product "${name}" created Successfully!`,product:newProduct})
        }
        return res.status(401).json({message:"You are unauthorized to perform this action"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

//get all products 
export const getAllProducts=async(req:Request,res:Response)=>{
    //@ts-ignore
    const token=req.token
    try {
        if(token.role == 'Customer' || token.role == 'Admin'){
            const products=await Product.find()
                .populate('owner')
            return res.status(200).json({products})
        }
        else if(token.role == 'Seller')
            return res.status(401).json({message:"You are unauthorized to perform this action"})
        else{
            return res.status(400).json({message:"something went wrong!"})
        }
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// update product
export const updateProduct=async(req:Request,res:Response)=>{
    const {userId,id}=req.params
        const {
            name,
            desc,
            category,
            price,
            images
        }=req.body
        //@ts-ignore
        const token=req.token
    try {
        const profile=await User.findById({_id:userId})
        if(token.userId == profile?._id){
            const product=await Product.findByIdAndUpdate({_id:id},{
                name,
                desc,
                category,
                price
            })
            product?.save()
            return res.status(200).json({message:`${product?.name} updated Successfully`})
        }
        return res.status(401).json({message:"You are unauthorized to perform this action"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// add product to favorite
export const addToFavorite=async(req:Request,res:Response)=>{
    const {productId,userId}=req.params
    //@ts-ignore
    const token=req.token
    try {
        const profile=await User.findById({_id:userId})
        if(profile){
            if(profile?._id == token.userId){
                if(profile?.role == "Customer" || token.role== "Customer"){
                    const updateProfile=await User.findByIdAndUpdate({_id:userId},{
                        $push:{
                            favorites:{
                                _id:productId
                            }
                        }
                    })
                    updateProfile?.save()
                    return res.status(200).json({message:`Product added to favorites`})
                }
                return res.status(401).json({message:"You are not authorized to perform this action"})
                
            }  
        }
        return res.status(400).json({message:"something went wrong"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

//add to cart
export const addToCart=async(req:Request,res:Response)=>{
    const {userId,productId}=req.params
    //@ts-ignore
    const token=req.token
    try {
        const profile=await User.findById({_id:userId})
        if(profile){
            if(profile?._id == token.userId && token.role == "Customer" || profile.role == "Customer"){
                const updateProfile=await User.findByIdAndUpdate({_id:userId},{
                    $push:{
                        cart:{
                            _id:productId
                        }
                    }
                })
                updateProfile?.save()
                return res.status(200).json({message:"Product Added to cart!"})
            }
            return res.status(400).json({message:""})
        }
        return res.status(404).json({message:"User not found!"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}


// get Product by name only by Customers
export const getProductById=async(req:Request,res:Response)=>{
    const {id}=req.params 
    try {
        const product=await Product.findById(id).populate('owner').populate('ratings')
        return res.status(200).json({message:"Product Found",product})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

