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
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }
    // Check if user exists
    const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    generateToken(user[0], "Login Successful", res, 200);

});

// Get user details
export const getUser = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});

// Logout
export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

});

// forgot Password 
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    // Implementation for forgot password
    const { email } = req.body;
    const { frontendUrl } = req.query;

    // Check if user exists
    const [user] = await database.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
        return next(new ErrorHandler("User not found with this email", 404));
    }

    // Generate reset token and send email logic goes here
    res.status(200).json({
        success: true,
        message: `Password reset link sent to ${email} (frontend URL: ${frontendUrl})`
    });
});

// reset password
export const resetPassword = catchAsyncError(async (req, res, next) => {
    // Implementation for reset password
    const { token } = req.params;
    const { password } = req.body;
    // Find user by reset token logic goes here
    const resetpasswordToken = token; // Placeholder
    // Update user's password logic goes here
    const hashedPassword = await bcrypt.hash(password, 10);
    await database.query("UPDATE users SET password = ? WHERE resetpasswordToken = ?", [hashedPassword, resetpasswordToken]);

    res.status(200).json({
        success: true,
        message: "Password has been reset successfully"
    });
});

// Update password
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    // Get user from database
    const [user] = await database.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (user.length === 0) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Compare old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user[0].password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Old password is incorrect", 401));
    }
    // Hash new password and update
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await database.query("UPDATE users SET password = ? WHERE id = ?", [hashedNewPassword, userId]);
    res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });
});
