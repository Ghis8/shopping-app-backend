var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import amqplib from 'amqplib';
// message broker
//create channel
export const CreateSchannel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib.connect(`${process.env.MESSAGE_BOKER_URL}`);
        const channel = yield connection.createChannel();
        yield channel.assertExchange(`${process.env.EXCHANGE_NAME}`, 'direct', { durable: false });
        return channel;
    }
    catch (error) {
        throw error;
    }
});
export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
export const sum = (a, b) => {
    return a + b;
};
