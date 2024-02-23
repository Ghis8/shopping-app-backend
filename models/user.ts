import mongoose, { Schema,Document } from "mongoose";

interface IUser extends Document{
    first_name?:string
    last_name?:string
    email:string
    password:string
    products:string
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
    password:{type:String,required:true,min:6},
    token:String,
    role:{
        type:String,
        enum:Role,
        default:"Customer"
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    favorites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    ]
},{
    timestamps:true
})

CustomerSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        delete ret['__v']
        return ret
    }
})



export default mongoose.model('user',CustomerSchema)