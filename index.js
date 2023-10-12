const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors'); // Import the cors middleware

const userDetails = require('./data.json');

app.use(cors()); // Use the cors middleware to enable CORS for all routes

app.get('/', (req, res) => {
  // Send the userDetails data as a JSON response
  res.json(userDetails.Details);
});

app.get('/aboutus', (req, res) => {
    // Send the userDetails data as a JSON response
    res.json(userDetails.AboutUs);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
