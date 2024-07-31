import mongoose from "mongoose";

function connectToMongoDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("MongoDB is connected")
    })
    .catch(() => {
        console.log("Error connecting to mongodb")
    })
}

export default connectToMongoDB;