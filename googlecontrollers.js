const mysql = require('mysql');


// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'trackpax_schema'
});

// Function to get all users from the database
getAllUsers = (req, res) => {

    
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users from database: ', err);
      res.status(500).json({ error: 'Error fetching users from database' });
      return;
    }
    res.json(results);
  });
};





// const createUser = (req, res) => {
//     const { name, email, email_verified, picture, sub } = req.body;
//     console.log(req.body)
  
//     // Ensure required fields are provided
//     if (!name || !email || !picture || !sub) {
//       res.status(400).json({ error: 'Missing required fields' });
//       return;
//     }
  
//     const newUser = {
//       name,
//       email,
//       email_verified: email_verified || false, // Default to false if not provided
//       picture,
//       sub
//     };
  
//     connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
//       if (err) {
//         console.error('Error creating user: ', err);
//         res.status(500).json({ error: 'Error creating user' });
//         return;
//       }
//       console.log('User created successfully');
//       res.status(201).json({ message: 'User created successfully', user_id: result.insertId });
//     });
//   };
  

const createUser = (req, res) => {
    const { name, email, email_verified, picture, sub } = req.body;
    console.log(req.body);
  
    // Ensure required fields are provided
    if (!name || !email || !picture || !sub) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    // Check if user with the same sub already exists in the database
    connection.query('SELECT * FROM users WHERE sub = ?', [sub], (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error checking user existence:', selectErr);
        res.status(500).json({ error: 'Error checking user existence' });
        return;
      }
  
      if (selectResult.length > 0) {
        // User with the same sub already exists, return their details
        console.log('User already exists');
        res.status(200).json({ message: 'User already exists', user: selectResult[0] });
      } else {
        // User does not exist, insert the new user into the database
        const newUser = {
          name,
          email,
          email_verified: email_verified || false, // Default to false if not provided
          picture,
          sub
        };
  
        connection.query('INSERT INTO users SET ?', newUser, (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error creating user: ', insertErr);
            res.status(500).json({ error: 'Error creating user' });
            return;
          }
          console.log('User created successfully');
          res.status(201).json({ message: 'User created successfully', user_id: insertResult.insertId, user: newUser });
        });
      }
    });
  };
  




  const getuserdetails = (req,res) =>{




console.log(req.query.id,"userID")
const sub = req.query.id


  // Query to retrieve records based on user ID
  const sql = `SELECT * FROM users WHERE sub = ${sub}`;

  // Execute the query with the user ID parameter
  connection.query(sql, [sub], (err, results) => {
    if (err) {
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Error retrieving records' });
      return;
    }
    // Send the retrieved records as a JSON response
    res.json(results);
    console.log(results,"Matched Records")
  });

}




const trackpackage = async (req,res)=>{


    const { tracking_number } = req.body;
    console.log(req.body,"tracking_number")

    if (!tracking_number) {
      return res.status(400).json({ error: 'ID is required' });
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
  
      res.json(results[0]);
      console.log(results[0],"trackpackage") // Assuming ID is unique, returning only the first result
    });



}








module.exports={ getAllUsers , createUser,getuserdetails,trackpackage }