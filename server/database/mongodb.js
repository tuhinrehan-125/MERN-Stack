import mongoose from "mongoose";

async function connect() {
    await mongoose.connect(
        "mongodb+srv://tuhinrehan125:rehan-125@cluster0.cj31chg.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB connection is successfull");
}

export default connect;
