import User from '../database/models/User.js';
import bcrypt from 'bcrypt';
import validator from 'email-validator'

const saltRounds = 10;

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get user by username
const getUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Create a new user
const createUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {

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