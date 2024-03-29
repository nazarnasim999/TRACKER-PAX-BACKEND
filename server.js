// // Import required modules
// const express = require('express');
// const mysql = require('mysql');

// // Create Express app
// const app = express();

// const cors = require('cors');
// const bodyParser = require('body-parser');
// const PORT = process.env.PORT || 3000;

// app.use(cors)

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'trackpaxdb'
// });

// // Connect to MySQL
// connection.connect(err => {
//   if (err) {
//     console.error('Error connecting to MySQL database: ', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Define routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the backend server!');
// });

// // Example route to fetch data from MySQL
// app.get('/users', (req, res) => {
//   connection.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error fetching users from database: ', err);
//       res.status(500).json({ error: 'Error fetching users from database' });
//       return;
//     }
//     res.json(results);
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const Routes = require('./routes');
const TrackPaxSchema = require('./Schema/Schema');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Use cors middleware to enable CORS
app.use(cors());



setInterval(() => {
  TrackPaxSchema();

}, 5000);

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Link user routes
app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
