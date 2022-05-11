import mongoose from 'mongoose';

import * as userDal from './userDal.js';

export const getUsers = async (searchParams) => {
    const filter = {}

    Object.entries(searchParams).forEach(param => {
        const [key, value] = param
        if (value) {
            filter[key] = value;
        }
    });

    const users = await userDal.get(filter);

    if (!users.length) {
        throw new Error('No users found.');
    }

    return users;
}

export const getUser = async (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('No valid id provided');
    }

    const user = await userDal.get({ _id: id });

    if (!user.length) {
        throw new Error('No user found.');
    }

    return user;
}

export const createUser = async (firstName, lastName, email, phoneNumber) => {
    const user = await userDal.getOne({ email });

    if (user) {
        throw new Error('A user with that email already exists.');
    }

    const userData = {
        firstName,
        lastName,
        email,
        phoneNumber
    };

    return await userDal.create(userData);
}

export const updateUser = async (id, firstName, lastName, email, phoneNumber) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new Error('No valid id provided');
    }

    const user = await userDal.get({ _id: id });

    if (!user.length) {
        throw new Error('No user found for update.');
    }

    const userData = {
        _id: id,
        firstName,
        lastName,
        email,
        phoneNumber
    };

    return await userDal.update(userData);
}