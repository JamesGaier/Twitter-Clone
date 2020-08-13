import { Schema, Document, Model, model } from 'mongoose';
import { IUser } from './user';

export interface IPost extends Document {
    dateCreated: Date,
    postBody: string,
    likes: number,
    shares: number,
    owner: IUser["_id"]
}

const postSchema: Schema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    postBody: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});



export default model<IPost>("Post", postSchema);