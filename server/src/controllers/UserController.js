import db from '../database/models/index.js';
import { hashPassword, isMatch } from '../services/authentication.js';

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get user by username
const getUser = async (req, res) => {
    try {
        const username = req.params['username'];
        const user = await db.User.findOne(
            {
                where: {
                    username: username
                }
            });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a new user
const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const password = await hashPassword(req.body.password);
        const user = await db.User.create(
            {
                username: username,
                email: email,
                password: password,
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        const username = req.params['username'];
        const { newUsername, email, password } = req.body;
        await db.User.update(
            { 
                username: newUsername, 
                email: email, 
                password: password,
            },
            {
                where: {
                    username: username
                },
            },
        );
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const username = req.params['username'];
        await db.User.destroy({
            where: {
                username: username,
            }
        })
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}