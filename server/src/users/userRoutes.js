import express from 'express';
import {
    getUsers,
    getUserByID,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
} from './UserController.js';

const router = express.Router();

// Routes for Users
router.get('/', getUsers); // Get all Users
router.get('/:id', getUserByID); // Get a single User by ID
router.get('/username/:username', getUserByUsername); // Get a single User by Username
router.post('/', createUser); // Create a new User
router.put('/:id', updateUser); // Update an User
router.delete('/:id', deleteUser); // Delete an User

export default router;