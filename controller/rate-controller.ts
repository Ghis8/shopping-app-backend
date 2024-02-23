import { Request, Response } from "express";
import User from "../models/user";
import Product from "../models/products";

export const rateProduct=async(req:Request,res:Response)=>{
    const {userId,productId}=req.params
    const{rate,comment}=req.body
    //@ts-ignore
    const token=req.token
    try {
        const profile=await User.findById({_id:userId})
        if(profile){
            if(profile._id == token.userId && token.role =='Customer' || profile.role =='Customer'){
                const rateProduct=await Product.findByIdAndUpdate({_id:productId},{
                    rate,
                    comment
                })
                rateProduct?.save()
                return res.status(200).json({message:` You Rated ${rateProduct?.name} Product`})
            }
            return res.status(401).json({message:"You are not authorized to do this action"})
        }
        return res.status(404).json({message:"User not found"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}