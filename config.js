import dotenv from 'dotenv';

dotenv.config();

export default {
    IS_DEV: process.env.NODE_ENV === 'dev',
    IS_PROD: process.env.NODE_ENV === 'prod',
    IS_TEST: process.env.NODE_ENV === 'test',
    PORT: process.env.PORT,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};

export const validateEnvironmentVariables = () => {
    const environmentVariables = [
        'NODE_ENV',
        'PORT',
        'MONGO_DB_URI',
        'MONGO_DB_NAME'
    ];
    const missingEnvironmentVariables = [];

    environmentVariables.forEach((environmentVariable) => {
        if (!process.env[environmentVariable]) {
            missingEnvironmentVariables.push(environmentVariable);
        }
    });

    if (missingEnvironmentVariables.length) {
        throw new Error(`❗ Missing environment variables:\n${missingEnvironmentVariables.join('\n')}`);
    }

    console.log('Environment properly configured 👍');
};
