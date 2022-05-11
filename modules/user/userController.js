import * as userService from './userService.js';

export const getUser = async (req, res) => {
    const id = req.params.id ;

    const user = await userService.getUser(id);
    res.status(200).send(user);
};

export const getUsers = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber
    } = req.query;

    const users = await userService.getUsers({firstName, lastName, email, phoneNumber});
    res.status(200).send(users);
};

export const createUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber
    } = req.query;

    const newUser = await userService.createUser(firstName, lastName, email, phoneNumber);
    res.status(200).send(newUser);
}

export const updateUser = async (req, res) => {
    const id = req.params.id ;
    const {
        firstName,
        lastName,
        email,
        phoneNumber
    } = req.query;

    const updatedUser = await userService.updateUser(id, firstName, lastName, email, phoneNumber);
    res.status(200).send(updatedUser);
}