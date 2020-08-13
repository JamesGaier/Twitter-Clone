"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authError = exports.SECRET_NOT_FOUND = exports.MONGOURI_NOT_FOUND = void 0;
exports.MONGOURI_NOT_FOUND = 'Error cannot find Mongo uri';
exports.SECRET_NOT_FOUND = 'Error cannot find secret';
// export const FAILED_TO_CREATE_USER = 'Error failed to create user';
exports.authError = function () {
    throw new Error('User already exists');
};
