import mongoose from 'mongoose';

import config from './config.js';

export default () => {
    mongoose.connect(`${config.MONGO_DB_URI}/${config.MONGO_DB_NAME}`);
};
