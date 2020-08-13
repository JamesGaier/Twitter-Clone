"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.default = mongoose_1.model("Post", postSchema);
