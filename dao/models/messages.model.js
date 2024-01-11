import mongoose from "mongoose";

const messageCollection = 'messages';

const messageSchema = mongoose.Schema({
    //falta definir modelo
});

export const messageModel = mongoose.model(messageCollection, messageSchema);