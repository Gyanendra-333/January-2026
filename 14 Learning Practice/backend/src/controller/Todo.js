// create a basic todo controller with express and mongoose
import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();
// get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// create a todo

export default router;