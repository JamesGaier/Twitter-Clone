import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const auth = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({msg: 'No token, authorization denied.'});
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET ? process.env.SECRET: '');
        req.user = decoded;
        next();
    } catch(err) {

        res.status(400).json({msg: 'Token is not found'});
    }
};