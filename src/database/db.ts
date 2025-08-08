import mongoose from "mongoose";

export const dbConnection = (uri: string) => {
    try {
        mongoose.connect(uri)
        console.log("Database connected successfully...👍")
    } catch (error) {
        console.log("Database not connected!...🤷‍♂️")
    }
};