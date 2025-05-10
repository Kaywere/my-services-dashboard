// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'data', 'services.json');

// Read the JSON file
app.get('/api/services', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading services data');
    }
    res.json(JSON.parse(data));
  });
});

// Write to the JSON file
app.post('/api/services', (req, res) => {
  const newData = req.body;
  fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send('Error writing services data');
    }
    res.send('Services data updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});