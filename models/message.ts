import mongoose, { Document, Schema } from 'mongoose'

interface IMessage extends Document{
    name:string,
    message:string,
    image:string
}

const messageSchema:Schema=new Schema<IMessage>({
    name:String,
    message:String,
    image:String
})