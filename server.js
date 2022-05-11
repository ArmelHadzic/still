import express from 'express';

import config, { validateEnvironmentVariables } from './config.js';
import userRouter from './modules/user/userRouter.js';
import db from './db.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

// Health endpoint
app.get('/', (req, res) => {
    res.send('Ready to fly!');
});

app.use('/users', userRouter());

// Global error handler
app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || err.status || 500;

    if (res.headersSent) {
        return next(err);
    }

    return res.status(statusCode).json({
        status: statusCode,
        error: err.message,
    });
});

// check ENV variables
validateEnvironmentVariables();

//initialize db connection
db();

app.listen(config.PORT, () => console.log(`Listening on http://localhost:${config.PORT}`));

export default app;
