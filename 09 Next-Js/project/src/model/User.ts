import { time } from "console";
import mongoose, { Document } from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

// Message Schema 
export const MessageSchema = new mongoose.Schema<Message>({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verfiyCode: string;
    verifyCodeExpires: Date;
    isAccepted: boolean;
    messages: Message[];
}

// User Schma 
export const UserSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verfiyCode: {
        type: String,
        required: true
    },
    verifyCodeExpires: {
        type: Date,
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
});