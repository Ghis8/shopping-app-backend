import mongoose from "mongoose";

export const connect=async(db:string)=>{
    try {
        mongoose.connect(db)
        console.log('Database connected successfully')
    } catch (error) {
        console.log("Unable to connect the database")
    }
}