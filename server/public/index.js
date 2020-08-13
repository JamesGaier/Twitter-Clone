"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
// my dependencies
var routes_1 = require("./routes");
var error_1 = require("./handlers/error");
var mongoose_1 = __importDefault(require("mongoose"));
var assert_1 = __importDefault(require("assert"));
var app = express_1.default();
console.log(process.env.MONGOURI);
var PORT = '8080' || process.env.PORT;
mongoose_1.default.set('debug', true);
var MONGOURI = process.env.MONGOURI ? process.env.MONGOURI : '';
assert_1.default(MONGOURI !== '', error_1.MONGOURI_NOT_FOUND);
mongoose_1.default.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
// reading the body of requests and cors
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use('/api/auth', routes_1.auth.router);
app.use('/api', routes_1.posts.router);
app.get('/', function (req, res) {
    res.json({ msg: 'Express + Typescript + Node.js server' });
});
app.listen(PORT, function () {
    console.log("Server running on port http://localhost:" + PORT);
});
