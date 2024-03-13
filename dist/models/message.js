import { Schema } from 'mongoose';
const messageSchema = new Schema({
    name: String,
    message: String,
    image: String
});
