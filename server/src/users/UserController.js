import User from './UserModel.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('username');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get a single user by ID
export const getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('username');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.find(username).populate('username');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Update an user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// Delete an user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};