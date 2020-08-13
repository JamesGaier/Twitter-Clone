"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var handlers_1 = require("../handlers");
exports.router = express_1.default.Router();
exports.router.post('/register', handlers_1.register);
exports.router.post('/login', handlers_1.login);
