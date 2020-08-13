import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IPost } from './post';
import { NextFunction } from 'express-serve-static-core';
export interface IUser extends Document{
    name: string,
    phone?: number,
    email?: string,
    password: string,
    birthday: Date,
    avatar?: string,
    posts: Array<IPost['_id']>,
    comparePasswords(attempt: string | null): Promise<boolean>
}
const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    birthday: {
        type: Date,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    posts: [{type: Schema.Types.ObjectId,ref:'Post'}]
});


// mongoose methods
userSchema.pre<IUser>("save", async function(next) {
    try {
        if(this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
            return next();
        }
    } catch(err) {
        err.status = 400;
        return next(err);
    }
});
userSchema.methods.comparePasswords =  async function(attempt: string, next: NextFunction): Promise<boolean> {
    if(attempt != null) {
        return await bcrypt.compare(attempt, this.password);
    }
    return false;
};

export default model<IUser>("User", userSchema);