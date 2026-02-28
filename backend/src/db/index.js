import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        )
        console.log(`\n MONGODB connected !! DB HOST:  ${connectionInstance.connection.host}`)
        //console.log("CONNECTION INSTANCE ",connectionInstance)
    } catch (error) {
        console.log("MONGODB connection failed : ", error)
        process.exit(1);
    }
}

export { connectDB }