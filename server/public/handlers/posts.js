"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.removePost = exports.addPost = exports.getPosts = void 0;
var user_1 = __importDefault(require("../models/user"));
var post_1 = __importDefault(require("../models/post"));
exports.getPosts = function (req, res, next) {
    var _a;
    var _id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    user_1.default.findById(_id)
        .populate('posts')
        .then(function (user) {
        res.status(200).json(user.posts);
    });
};
exports.addPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postBody, userId, user, _id;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                postBody = req.body;
                userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, post_1.default.create(postBody)];
            case 2:
                _id = (_b.sent())._id;
                user === null || user === void 0 ? void 0 : user.posts.push(_id);
                user === null || user === void 0 ? void 0 : user.markModified('posts');
                user === null || user === void 0 ? void 0 : user.save().then(function (user) {
                    res.status(200).json({ post: postBody });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.removePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, postId, user;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.user_id;
                postId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.post_id;
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 1:
                user = _c.sent();
                user.posts = user.posts.filter(function (post) {
                    console.log('pass', post._id != postId);
                    return post._id != postId;
                });
                user.markModified('posts');
                user.save();
                post_1.default.findOneAndDelete({ _id: postId })
                    .exec()
                    .then(function (post) {
                    res.status(200).json(post);
                })
                    .catch(function (err) {
                    next(err.message);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.likePost = function (req, res, next) {
    var _a, _b;
    var _id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    var likeAmt = (_b = req.params) === null || _b === void 0 ? void 0 : _b.is_liked;
    post_1.default.findOne({ _id: _id })
        .then(function (post) {
        post.likes += parseInt(likeAmt);
        post.save().then(function (post) {
            res.status(200).json(post);
        })
            .catch(function (err) {
            next(err.message);
        });
    })
        .catch(function (err) {
        next(err.message);
    });
};
// export const sharePost = (req: Request, res: Response, next: NextFunction): void => {
// };
