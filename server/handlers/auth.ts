import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { assert } from 'console';

import { SECRET_NOT_FOUND } from '../handlers/error';
import User, { IUser } from '../models/user';
import { NextFunction } from 'express-serve-static-core';

export interface IJwt {
    email?: string | undefined | null,
    phone?: number | undefined | null,
    _id: string | undefined | null
}
export const getUser = (req: any, res: Response, next: NextFunction): void => {
    const { email, phone} = req.user;

    User.findOne({email, phone})
            .then((user: IUser | null) => {
                res.status(200).json(user);
            })
            .catch(err => {
                next(err.message);
                res.status(400).json({msg: err.message});
            })
};
export const register = (req: Request, res: Response, next: NextFunction): void => {

    const user: IUser = req.body;
    User.create(user)
            .then((toRet: IUser) => {
                const secret = process.env.SECRET != null ? process.env.SECRET:'';

                const {email, phone, _id}: IJwt  = toRet;
                const token:string = jwt.sign({email,phone,_id}, secret);
                res.status(200).json({
                    email,
                    phone,
                    _id,
                    token
                });
            })
            .catch(err => {
                //next(err.message);
                next(err.message);
            })
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body: IUser = req.body;
        const {email, password: attempt}:{email?: string, password: string} = body;
        const user = await User.findOne({email});
        const valid: boolean | undefined = await user?.comparePasswords(attempt);

        if(user != null && valid) {
            const secret = process.env.SECRET != null ? process.env.SECRET:'';
            // assert(secret !== '', SECRET_NOT_FOUND);

            const {email, phone, _id} = user || {};
            const token = jwt.sign({email, phone, _id}, secret);

            res.status(200).json({
                email,
                phone,
                _id,
                token
            });
        }
        else {
            throw Error('User not found');
        }
    } catch(err) {
        next(err.message);
    }
};