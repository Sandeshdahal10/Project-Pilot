import mongoose from "mongoose";

export const connectDB = async() => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"finalforge",
    }).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log("Database Connection Failed", err);
    });
};

export default connectDB;