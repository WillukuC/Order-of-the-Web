import express from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/UserController.js';

const router = express.Router();

// Routes for Users
router.get('/', getUsers);
router.get('/:username', getUser);
router.post('/', createUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;