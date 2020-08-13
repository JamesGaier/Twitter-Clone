"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var posts_1 = require("../handlers/posts");
exports.router = express_1.Router();
exports.router
    .route('/post/:id')
    .get(posts_1.getPosts)
    .post(posts_1.addPost);
exports.router.delete('/post/:user_id/:post_id', posts_1.removePost);
exports.router.put('/post/like/:id/:is_liked', posts_1.likePost);
// router.put('/post/share/:id', sharePost);
exports.default = exports.router;
