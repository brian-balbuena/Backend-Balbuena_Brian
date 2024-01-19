import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = mongoose.Schema({
    user: {
        type: String, 
        require: true, 
        unique: false
    },
    message: {
        type: String, 
        require: true, 
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

export const messageModel = mongoose.model(messageCollection, messageSchema);