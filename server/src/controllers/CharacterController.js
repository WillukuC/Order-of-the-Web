import Character from '../models/Character.js';

// Get all characters
export const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find().populate('groupAffiliations issueData.appearances');
        res.status(200).json(characters);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Add other controller methods (getCharacter, createCharacter, updateCharacter, deleteCharacter)...