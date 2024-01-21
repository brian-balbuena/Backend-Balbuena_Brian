import mongoose from "mongoose";

const userCollection = 'user'; 

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    ege: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type : String,
        default: "usuario",
        require: true
    }

});

export const userModel = mongoose.model(userCollection, userSchema);