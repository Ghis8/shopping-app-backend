import { NextFunction, Request, Response } from "express";
import Customer from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateEmail } from "../utils";


export const createCustomer=async(req:Request,res:Response)=>{
    const {first_name,last_name,email,password,role}=req.body
    try {
        const profile=await Customer.findOne({email})
        if(profile){
            return res.status(200).json({message:"Email address provided already exist!"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        if(validateEmail(email)){
            const newCustomer=await Customer.create({
                first_name,
                last_name,
                email,
                password:hashedPassword,
                role
            })
            newCustomer.save()
            return res.status(201).json({message:"New Customer created",customer:newCustomer})
        }
        return res.status(400).json({messge:"Invalid email format"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

//get user by email address
export const getUserByEmail=async(req:Request,res:Response,next:NextFunction)=>{
    const {email}=req.body
    try {
        const profile=await Customer.findOne({email})
            .populate('products')
            .populate('favorites')
            .populate('cart')
            .select("-__v")
        if(!profile){
            return res.status(200).json({message:"Email provided does not exist"})
        }
        return res.status(200).json({message:"User Found",user:profile})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// sign In a User
export const signIn=async(req:Request,res:Response)=>{
    const {email,password}=req.body
    try {
        const profile=await Customer.findOne({email}).populate('favorites').populate('cart')
        if(profile){
            // @ts-ignore
            const validatePassword=await bcrypt.compare(password,profile.password)
            if(validatePassword){
                const token=jwt.sign({
                    userId:profile._id,
                    first_name:profile.first_name,
                    last_name:profile.last_name,
                    email:profile.email,
                    role:profile.role,
                },`${process.env.TOKEN_SECRET}`,{
                    expiresIn:'7d'
                })
                profile.token=token
                profile.save()
                return res.cookie("user",profile.first_name + ' '+profile.last_name,{maxAge:360000+ Date.now()}).status(200).json({message:"User log in successfully",user:profile})
            }
            return res.status(400).json({message:"Wrong Password"})
        }
        return res.status(404).json({message:"User with the provided email address not Found"})
    } catch (error) {
        
    }
}

// Edit profile
export const EditProfile=async(req:Request,res:Response)=>{
    const {id}=req.params
    const{first_name,last_name,email,password,role}=req.body

    //@ts-ignore
    const token=req.token
    try {
        // const profile=await Customer.findById(token.userId)
        //@ts-ignore
        if(id == token.userId || token.role=='Admin'){
            const result=await Customer.findByIdAndUpdate(id,{
                first_name,last_name,email,password,role
            })
            result?.save()
            return res.status(200).json({message:"User Profile updated successfully!"})
        }
        
        return res.status(404).json({message:"User not found"})

    } catch (error) {
        
    }
}

//delete user by id

export const deleteUser=async(req:Request,res:Response)=>{
    const {id}=req.params
    //@ts-ignore
    const token=req.token
    try {
        const profile=await Customer.findById(token.userId)
        //@ts-ignore
        if(profile.role === 'Admin'){
            const user=await Customer.findByIdAndDelete(id)
            return res.status(200).json({message:`User ${user?.first_name} deleted successfully`})
        }
        return res.status(401).json({message:"You are not Authorized to perform this action"})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

export const Logout=async(req:Request,res:Response)=>{
    //@ts-ignore
    const token=req.token
    
}