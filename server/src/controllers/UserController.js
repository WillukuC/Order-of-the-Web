import db from '../database/models/index.js';
import { hashPassword, isMatch } from '../services/authentication.js';

// Get all users
const getUsers = async (req, res) => {
    try {
        // Tries to get all users from the database
        const users = await db.User.findAll();

        // If no users are found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }
        
        // Returns all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by username
const getUser = async (req, res) => {
    try {
        // Tries to get user by username
        const username = req.params['username'];
        const user = await db.User.findOne({where: { username: username }});

        // If user is not found
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Returns the user
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new user
const createUser = async (req, res) => {
    try {
        // Check if username or email are already in use.
        const errors = [];
        if (await db.User.findOne({ where: { username: req.body.username } })) {
            errors.push({ field: 'username', message: 'Username already in use.' });
        }
        if (await db.User.findOne({ where: { email: req.body.email } })) {
            errors.push({ field: 'email', message: 'Email already in use.' });
        }
        if (errors.length > 0) {
            return res.status(409).json({ errors });
        }

        // Save the new user to the database.
        const { username, email } = req.body;
        const password = await hashPassword(req.body.password);
        const user = await db.User.create(
            {
                username: username,
                email: email,
                password: password,
            }
        );

        // Return the newly created user
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        const oldUsername = req.params['username'];

        // User not found path
        if (!await db.User.findOne({ where: { username: oldUsername}})) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const { username, email, password } = req.body;
        
        // Check if username and email are already in use
        const errors = [];
        if (username) {
            if (await db.User.findOne({ where: { username: username } })) {
                errors.push({ field: 'username', message: 'Username already in use.' });
            }
        }
        if (email) {
            if (await db.User.findOne({ where: { email: email } })) {
                errors.push({ field: 'email', message: 'Email already in use.' });
            }
        }
        if (errors.length > 0) {
            return res.status(409).json({ errors });
        }

        // Hash the password if provided
        if (password) {
            const hashedPassword = await hashPassword(password);
            req.body.password = hashedPassword;
        }

        // Update the user with the provided data
        await db.User.update(
            { 
                username: username, 
                email: email, 
                password: password,
            },
            { where: {username: oldUsername} },
        );

        // Return success message
        res.status(200).json({ message: 'User updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const username = req.params['username'];

        // User not found
        if (!await db.User.findOne({ where: { username: username}})) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Delete the user from the database
        await db.User.destroy({ where: {username: username} });

        // Return success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}