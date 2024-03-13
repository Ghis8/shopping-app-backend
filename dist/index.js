var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import { connect } from './database';
import customerRouter from './routes/customer';
import productRouter from './routes/product';
import rateRouter from './routes/rate';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './strategies/google-strategy';
dotEnv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// connect the database
connect(`${process.env.MONGO_URI}`);
//app events
// Auth02
app.post('/customer/auth', passport.authenticate('google'), (req, res) => {
    try {
    }
    catch (error) {
    }
});
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/rate', rateRouter);
app.get('/', (req, res) => {
    return res.status(200).json({ msg: "Welcome to shopping app customer server" });
});
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "E-Commerce Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple E-Commerce API application made with Express and documented with Swagger",
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
                url: "http://localhost:8000",
            },
        ],
    },
    apis: [path.resolve(__dirname, "./routes/*.ts")],
};
//@ts-ignore
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(404).json({ message: "Page not Found" });
}));
export const server = app.listen(PORT, () => {
    console.log(`Customer Server running on http://localhost:${PORT}`);
});
