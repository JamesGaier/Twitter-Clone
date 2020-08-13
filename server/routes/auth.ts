import express from 'express';
import {register, login } from '../handlers';

export const router: express.Router = express.Router();

router.post('/register', register);
router.post('/login', login);

