import express,{Express,Request,Response} from 'express'
import dotEnv from 'dotenv'
import cors from 'cors'
import { connect } from './database'
import customerRouter from './routes/customer'
import productRouter from './routes/product'
import rateRouter from './routes/rate'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport, { authenticate } from 'passport'
import './strategies/google-strategy'
import RedisStore from 'connect-redis'


dotEnv.config()
const app:Express=express()
const PORT=process.env.PORT

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }), // Set up Redis client
//     secret: 'your-secret',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())

// connect the database
connect(`${process.env.MONGO_URI}`)

//app events


// Auth02
app.post('/customer/auth',passport.authenticate('google'),(req:Request,res:Response)=>{
  try {
    
  } catch (error) {
    
  }
})


app.use('/api/v1/customer',customerRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/rate',rateRouter)



app.get('/',(req:Request,res:Response)=>{
    return res.send("Welcome to shopping app customer server")
})

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "E-Commerce Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple E-Commerce API application made with Express and documented with Swagger",
        license: {},
        contact: {
          name: "Developer",
          url: "",
          email: "ghislainkongolo0@gmail.com",
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    apis: [path.resolve(__dirname,"./routes/*.ts")],
  };
  
  //@ts-ignore
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
  app.use('*',async(req:Request,res:Response)=>{
    return res.send("Page not Found")
})

export const server=app.listen(PORT,()=>{
    console.log(`Customer Server running on http://localhost:${PORT}`)
})