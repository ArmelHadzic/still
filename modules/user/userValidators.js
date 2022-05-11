import {
    header, body, query, param,
} from 'express-validator';

export const createUserValidator = [
    query('firstName').notEmpty().isString(),
    query('lastName').optional().isString(),
    query('email').notEmpty().isEmail(),
    query('phoneNumber').optional().isString(),
];

export const updateUserValidator = [
    param('id').notEmpty().bail().isString(),
    query('firstName').optional().isString(),
    query('lastName').optional().isString(),
    query('email').optional().isEmail(),
    query('phoneNumber').optional().isString(),
];