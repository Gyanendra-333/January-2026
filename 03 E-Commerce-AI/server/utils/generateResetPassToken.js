import crypto from 'crypto';

export const generateResetPassToken = () => {
    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Hash the token and set to resetPasswordToken field
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Set token expiration time (e.g., 15 minutes)
    const expireTime = Date.now() + 15 * 60 * 1000;
    return { resetToken, hashedToken, expireTime };
}