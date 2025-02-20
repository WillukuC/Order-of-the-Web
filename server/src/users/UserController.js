import User from './UserModel.js';
import bcrypt from 'bcrypt';
import validator from 'email-validator'

const saltRounds = 10;

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('username');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a single user by Username
const getUser = async (req, res) => {
    const username = req.params;
    try {
        const user = await User.find(username).populate('username');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const userData = req.body;
    try {
        checkPassword(userData.password);
        if (!validateEmail(userData.email)) {
            throw new Error('Invalid email address');
        }


        userData.password = hashPassword(userData.password);
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an user
const updateUser = async (req, res) => {
    const username = req.params;
    const userData = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(username, userData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete an user
const deleteUser = async (req, res) => {
    const username = req.params;
    try {
        const deletedUser = await User.findOneAndDelete(username);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

function checkPassword(password) {
    let passwordMessage = []
    if (password.length < 8) {
        passwordMessage.push('at least 8 characters');
    }
    if (!password.match(/[a-z]/)) {
        passwordMessage.push('at least one lowercase letter');
    }
    if (!password.match(/[A-Z]/)) {
        passwordMessage.push('at least one uppercase letter');
    }
    if (!password.match(/[0-9]/)) {
        passwordMessage.push('at least one number');
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
        passwordMessage.push('at least one special character');
    }
    if (passwordMessage.length > 1) {
        throw new Error("Your password must contain: " + passwordMessage.join(', '));
    }
}

// Hash password before saving
function hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

// Compare password with hashed password
function validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

// Validate email before saving
function validateEmail(email) {
    return validator.validate(email);
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    hashPassword,
    validatePassword,
}