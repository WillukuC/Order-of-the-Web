import express from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from './UserController.js';

const router = express.Router();

// Routes for Users
router.get('/', getUsers); // Get all Users
router.get('/:username', getUser); // Get a single User by Username
router.post('/', createUser); // Create a new User
router.put('/:username', updateUser); // Update an User
router.delete('/:username', deleteUser); // Delete an User

export default router;