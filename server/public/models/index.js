"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var assert_1 = __importDefault(require("assert"));
var error_1 = require("../handlers/error");
mongoose_1.default.set('debug', true);
var MONGOURI = (_a = '') !== null && _a !== void 0 ? _a : process.env.MONGOURI;
assert_1.default(MONGOURI !== '', error_1.MONGOURI_NOT_FOUND);
mongoose_1.default.connect(MONGOURI);
__exportStar(require("./user"), exports);
__exportStar(require("./post"), exports);
__exportStar(require("./posts"), exports);
