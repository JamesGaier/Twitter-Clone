"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.auth = function (req, res, next) {
    var token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET ? process.env.SECRET : '');
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ msg: 'Token is not found' });
    }
};
