import mongoose from "mongoose";
import 'dotenv/config'

try {
    let url
    if (process.env.NODE_ENV=='development') {
        url = 'mongodb://localhost:27017/ecommerceLocal'
        console.log('Local MongoDB database -- Development environment')
    } else {
        url=process.env.MONGO_ATLAS
        console.log('MongoDB ATLAS database in the cloud -- Production environment')
    }
    await mongoose.connect(url)
    console.log('MongoDB Database connected!!')
} catch (error) {
    throw error
}