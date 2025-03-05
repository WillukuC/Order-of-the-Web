import express from 'express';
import { getCharacters } from './CharacterController.js';

const router = express.Router();

router.get('/', getCharacters);

export default router;