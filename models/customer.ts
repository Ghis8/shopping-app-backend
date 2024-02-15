import mongoose, { Schema,Document } from "mongoose";

interface IUser extends Document{
    first_name?:string
    last_name?:string
    email:string
    password:string
    token:string
    role:string 
    favorites:[]
    cart:[]
}

enum Role{
    Admin,
    Customer,
    Seller
}


const CustomerSchema:Schema=new Schema<IUser>({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{type:String,required:true},
    token:String,
    role:{
        type:String,
        enum:Role,
        default:"Customer"
    },
    favorites:[
        {
            _id:{
                type:String,
                required:true
            },
            name:String,
            category:String,
            desc:String,
            isAvailable:Boolean
        }
    ],
    cart:[
        {
            _id:{
                type:String,
                required:true
            },
            name:String,
            category:String,
            desc:String,
            price:Number
        }
    ]
},{
    timestamps:true
})

export default mongoose.model('customer',CustomerSchema)