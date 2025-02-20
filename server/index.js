import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectToMongo from './database.js';
import issueRoutes from './src/issues/issueRoutes.js';
import userRoutes from './src/users/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/issues', issueRoutes);
app.use('/api/users', userRoutes)

// Health check
app.get('/api', (req, res) => {
    res.json({ message: 'Health OK' })
})

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});