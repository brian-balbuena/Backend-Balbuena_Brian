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
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        enum: ['usuario', 'admin', 'premium'],
        default: "usuario",
        required: true
    },
    documents: {
        type: [
            {
                name: {
                    type: String,
                    default: "null",
                    required: true

                },
                reference: {
                    type: String,
                    default: "null",
                    required: true

                }
            }
        ],
        default: [
            {
                name: "profiles",
                reference: "null"
            },
            {
                name: "products",
                reference: "null"
            },
            {
                name: "documents",
                reference: "null"
               /*  documents: 
                [
                    {
                        name: "identification",
                        reference: "null"
                    },
                    {
                        name: "proofOfAddress",
                        reference: "null"
                    },
                    {
                        name: "proofOfAccountnts",
                        reference: "null"
                    }
    
                ] */
            },
            {
                name: "documents",
                reference: "null"
            },
            {
                name: "documents",
                reference: "null"
            }

        ]
    },
    last_connection: {
        type: Date,
        default: Date.now
    }

});

export const userModel = mongoose.model(userCollection, userSchema);