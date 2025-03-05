import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

/*
 * API Routes
 */

// User routes
app.use('/api/users', userRoutes);

// Health Check
app.use('/api', (req, res) => res.json({ message: 'API is running' }));

// Catch 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

export default app;