import { CustomError } from '../core/errors.js';

const authMiddleware = (req, res, next) => {
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return next(new CustomError('Unauthorized', 401));
    }
    req.userId = userId;
    next();
}

export default authMiddleware;