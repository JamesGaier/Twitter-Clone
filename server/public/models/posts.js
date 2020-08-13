"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var postsSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }]
});
exports.default = mongoose_1.model("Posts", postsSchema);
