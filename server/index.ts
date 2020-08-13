import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
// my dependencies
import { auth, posts } from './routes';
import { MONGOURI_NOT_FOUND } from './handlers/error';
import mongoose from 'mongoose';
import assert from 'assert';

const app = express();
console.log(process.env.MONGOURI);

const PORT = '8080' || process.env.PORT;



mongoose.set('debug', true);

const MONGOURI:string =  process.env.MONGOURI ? process.env.MONGOURI:'';
assert(MONGOURI !== '', MONGOURI_NOT_FOUND);
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });




// reading the body of requests and cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api/auth', auth.router);
app.use('/api', posts.router);

app.get('/', (req: express.Request, res: express.Response): void => {
    res.json({msg: 'Express + Typescript + Node.js server'});
});

app.listen(PORT, (): void => {
    console.log(`Server running on port http://localhost:${PORT}`);
});