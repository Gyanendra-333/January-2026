import ErrorHandler from "../middleware/errorMidleware.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtToken.js";

// Register 
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    // Check if user already exists
    const [existingUser] = await database.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
        return next(new ErrorHandler("User already exists with this email", 400));
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert new user into database
    await database.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

    generateToken(user.rows[0], "User Registered Successfully", res, 201);

});

// Login 
export const login = catchAsyncError(async (req, res, next) => { });

// Get user details
export const getUser = catchAsyncError(async (req, res, next) => { });

// Logout
export const logout = catchAsyncError(async (req, res, next) => { });
