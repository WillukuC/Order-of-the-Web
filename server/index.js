const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectToMongo = require('./database');

const app = express();

connectToMongo();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Health OK' })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});