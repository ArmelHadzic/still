import User from './userModel.js';

export const create = (user) => User.create(user);

export const get = (filter) => User.find(filter);

export const getOne = (filter) => User.findOne(filter);

export const update = (user) => User.findOneAndUpdate(
    { _id: user._id },
    { $set: user },
    { new: true },
);

