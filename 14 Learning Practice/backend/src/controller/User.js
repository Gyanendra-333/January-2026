// create a login and registration system with express and mongoose 
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// register a user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        // create new user
        user = new User({
            username,
            email,
            password
        });
        // hash password  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // save user   
        await user.save();
        // create and return jwt token
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // create and return jwt token
        const payload = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    //forgot password
    router.post('/forgot-password', async (req, res) => {
        const { email } = req.body;

        try {
            // check if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist' });
            }
            // create and return jwt token
            const payload = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            // send email with token
            // Implementation for sending email with reset token goes here
            res.json({ msg: 'Password reset link has been sent to your email' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });





});

export default router;
