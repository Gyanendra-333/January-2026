

export const generateResetPassTemplate = (resetToken) => {
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `
        <p>Hello,</p>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `;
    return message;
}
