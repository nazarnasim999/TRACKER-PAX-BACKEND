const connection = require('./Schema/db');

const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users from database: ', err);
      return res.status(500).json({ error: 'Error fetching users from database' });
    }
    res.json(results);
  });
};

const createUser = (req, res) => {
  const { name, email, email_verified, picture, sub } = req.body;

  if (!name || !email || !picture || !sub) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  connection.query('INSERT INTO users (name, email, email_verified, picture, sub) VALUES (?, ?, ?, ?, ?)',
    [name, email, email_verified || false, picture, sub],
    (err, result) => {
      if (err) {
        console.error('Error creating user: ', err);
        return res.status(500).json({ error: 'Error creating user' });
      }
      console.log('User created successfully');
      res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
    });
};

const getuserdetails = (req, res) => {
  const sub = req.query.id;
  const sql = 'SELECT * FROM users WHERE sub = ?';

  connection.query(sql, [sub], (err, results) => {
    if (err) {
      console.error('Error retrieving records:', err);
      return res.status(500).json({ error: 'Error retrieving records' });
    }
    res.json(results);
    console.log(results, "Matched Records");
  });
};

const trackpackage = (req, res) => {
  const { tracking_number } = req.body;

  if (!tracking_number) {
    return res.status(400).json({ error: 'Tracking number is required' });
  }

  const query = 'SELECT * FROM newpackage WHERE tracking_number = ?';

  connection.query(query, [tracking_number], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(results[0]); // Assuming tracking_number is unique, returning only the first result
    console.log(results[0], "trackpackage");
  });
};

module.exports = { getAllUsers, createUser, getuserdetails, trackpackage };
