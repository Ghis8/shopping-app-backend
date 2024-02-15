import axios from 'axios'
import amqplib,{Channel,Message,} from 'amqplib'
// message broker


//create channel
export const CreateSchannel=async()=>{
    try {
        const connection=await amqplib.connect(`${process.env.MESSAGE_BOKER_URL}`)
        const channel=await connection.createChannel()
        await channel.assertExchange(`${process.env.EXCHANGE_NAME}`,'direct',{durable:false})
        return channel
        
    } catch (error) {
        throw  error
    }
}


