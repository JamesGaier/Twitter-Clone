"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var posts_1 = require("../handlers/posts");
var auth_1 = require("../middleware/auth");
exports.router = express_1.Router();
exports.router
    .route('/post/:id')
    .get(auth_1.auth, posts_1.getPosts)
    .post(auth_1.auth, posts_1.addPost);
exports.router.delete('/post/:user_id/:post_id', auth_1.auth, posts_1.removePost);
exports.router.put('/post/like/:id/:is_liked', auth_1.auth, posts_1.likePost);
// router.put('/post/share/:id', sharePost);
exports.default = exports.router;
