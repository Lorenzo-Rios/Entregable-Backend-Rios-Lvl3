import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const configObjet = {
    port: process.env.SERVER_PORT || 8080,
    private_key: process.env.PRIVATE_KEY
}

const db = async () => {
    console.log('Base de datos conectada');
    return await connect(process.env.MONGO_URL)
    
}

export default db