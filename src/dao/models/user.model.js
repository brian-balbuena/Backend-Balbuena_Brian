import mongoose from "mongoose";

const userCollection = 'user'; 

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type : String,
        default: "usuario",
        required: true
    }

});

export const userModel = mongoose.model(userCollection, userSchema);