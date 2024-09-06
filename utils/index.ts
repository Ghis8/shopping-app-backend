
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


export const validateEmail=(email:string)=>{
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export const sum=(a:number,b:number):number=>{
    return a+b
}