import mongoose from 'mongoose';

import User from '../modules/user/userModel.js';
import { usersMainData, usersAdditionalData } from './data.js';

const usersData = usersMainData.map(
    (item, i) => ({
        ...item,
        // Since the order is the same, the simplest solution would be to do something like this.
        // phoneNumber: usersAdditionalData[i].phoneNumbers[0].value,
        // However, if we would have a lot of data, we can't guarantee that order is the same, therefore we need to use a more complex solution
        phoneNumber: usersAdditionalData.find(item => item.email === usersMainData[i].email).phoneNumbers[0].value
    })
);

try {
    mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`);
    await User.insertMany(usersData);
    mongoose.connection.close();
    console.log('Data successfully inserted into DB.');
} catch (error) {
    console.log(error);
}