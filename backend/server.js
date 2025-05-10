// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// backend/server.js
app.use(cors({
  origin: ['https://soss.site', 'http://soss.site', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'services.json');

// backend/server.js
app.get('/api/services', (req, res) => {
  try {
    // Check if file exists, if not create it with empty array
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
    }
    
    const data = fs.readFileSync(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading services:', err);
    res.status(500).json({ error: 'Error reading services data' });
  }
});

app.post('/api/services', (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    res.json({ message: 'Services data updated successfully' });
  } catch (err) {
    console.error('Error writing services:', err);
    res.status(500).json({ error: 'Error writing services data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});