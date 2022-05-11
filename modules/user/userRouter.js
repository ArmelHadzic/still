import express from 'express';

import wrapRoute from '../../helpers/routeHelper.js';
import * as userController from './userController.js';
import validate from '../../middlewares/validationMiddleware.js';
import { createUserValidator, updateUserValidator } from './userValidators.js';

export default () => {
    const userRouter = new express.Router();
    userRouter.get('/:id',  wrapRoute(userController.getUser));
    userRouter.get('/', wrapRoute(userController.getUsers));
    userRouter.post('/', createUserValidator, validate,  wrapRoute(userController.createUser));
    userRouter.put('/:id', updateUserValidator, validate,  wrapRoute(userController.updateUser));
    return userRouter;
};
