import jwt from 'jsonwebtoken';
import database from '../database/db.js';
import ErrorHandler from './errorMidleware.js';
import { catchAsyncError } from './catchAsyncError.js';

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await database.query("SELECT * FROM users WHERE id = ?", [decodedData.id]);
    req.user = user[0];
    next();
});

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
}
