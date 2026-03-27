import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import User from "../model/User.js";

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// REGISTER
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = generateOTP();

        user = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000
        });

        await user.save();

        await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);

        res.json({ msg: "OTP sent to email" });

    } catch (err) {
        res.status(500).json(err.message);
    }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User not found" });

        if (user.otp !== otp || user.otpExpire < Date.now()) {
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;

        await user.save();

        res.json({ msg: "Account verified successfully" });

    } catch (err) {
        res.status(500).json(err.message);
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ msg: "User not found" });

        if (!user.isVerified) {
            return res.status(400).json({ msg: "Please verify OTP first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.json({ token, user });

    } catch (err) {
        res.status(500).json(err.message);
    }
};