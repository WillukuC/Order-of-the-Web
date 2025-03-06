import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import db from './database/models/index.js';
import { isMatch } from './services/authentication.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Log in route
app.use('/login', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        let user;

        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        if (username) {
            user = await db.User.findOne({ where: { username: username } });
        } else if (email) {
            user = await db.User.findOne({ where: { email: email } });
        } else {
            return res.status(400).json({ message: 'Username or email is required.' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        if (await isMatch(password, user.password)) {
            const accessToken = jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )
            return res.status(200).json({ message: 'Login successful.', accessToken: accessToken });
        } else {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        req.user = user;
        next();
    })
}


/*
 * API Routes
 */
// User routes
app.use('/api/users', authenticateToken, userRoutes);

// Health Check
app.use('/api', authenticateToken, (req, res) => res.json({ message: 'API is running' }));

// Catch 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

export default app;