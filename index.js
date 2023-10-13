const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors'); // Import the cors middleware
const mongoose = require('mongoose'); // Import mongoose

const userDetails = require('./data.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Use the cors middleware to enable CORS for all routes
app.use(cors());

// Connect to your MongoDB database
mongoose.connect('mongodb://admin:password@65.1.148.207:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin', // Replace with the actual authentication database
});


const db = mongoose.connection;
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email:String,
    gender:String
  });
  const Userr = mongoose.model('Userr', personSchema);

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors()); // Use the cors middleware to enable CORS for all routes

app.get('/', async(req, res) => {
    try {
        const users = await Userr.find(); // Retrieve all documents from the Userr collection
        console.log(users,"users");
        res.json(users); // Send the retrieved data as a JSON response
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Could not fetch user data' });
      }
});

app.get('/aboutus', (req, res) => {
    // Send the userDetails data as a JSON response
    res.json(userDetails.AboutUs);
  });


  app.post('/saveUser', (req, res) => {
    const newUser = new Userr({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
    });
  
    newUser.save()
      .then(() => {
        console.log('User saved successfully');
        res.status(200).json({ message: 'User saved successfully' });
      })
      .catch((err) => {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Could not save user' });
      });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
