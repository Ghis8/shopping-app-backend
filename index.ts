import express,{Express,Request,Response} from 'express'
import dotEnv from 'dotenv'
import cors from 'cors'
import { connect } from './database'
import customerRouter from './routes/customer'
import productRouter from './routes/product'
import rateRouter from './routes/rate'


dotEnv.config()
const app:Express=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())

// connect the database
connect(`${process.env.MONGO_URI}`)

//app events



app.use('/customer',customerRouter)
app.use('/product',productRouter)
app.use('/rate',rateRouter)

app.use('*',async(req:Request,res:Response)=>{
    return res.status(404).json({message:"Page not Found"})
})

app.get('/',(req:Request,res:Response)=>{
    return res.status(200).json({msg:"Welcome to shopping app customer server"})
})

export const server=app.listen(PORT,()=>{
    console.log(`Customer Server running on http://localhost:${PORT}`)
})