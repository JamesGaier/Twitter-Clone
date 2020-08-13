import expess from 'express';
import { assert } from 'console';

export const MONGOURI_NOT_FOUND = 'Error cannot find Mongo uri';
export const SECRET_NOT_FOUND = 'Error cannot find secret';
// export const FAILED_TO_CREATE_USER = 'Error failed to create user';

export const authError = () => {
    throw new Error('User already exists');
};