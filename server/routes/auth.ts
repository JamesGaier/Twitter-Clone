import express from 'express';

import {register, login, getUser } from '../handlers';
import { auth } from '../middleware/auth';

export const router: express.Router = express.Router();

router.get('/',auth, getUser);
router.post('/register', register);
router.post('/login', login);

