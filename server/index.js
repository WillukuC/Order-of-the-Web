const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Health OK' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});