import express from 'express';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/UserController.js';

const router = express.Router();

// User Routes
router.get('/', getUsers);
router.get('/:username', getUser);
router.post('/', createUser);
router.put('/:username', updateUser);
router.delete('/:username', deleteUser);

export default router;