import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    
    console.error(errors);

    return res.status(422).json(errors);
};
