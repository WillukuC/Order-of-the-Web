import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './services/connectDB.js';
dotenv.config();

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

const startServer = () => {
    connectDB();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();