// const mysql = require('mysql');
const { getparceltrackingstatus } = require('./parcelcontrollers');


const mysql = require('mysql2');

// Create MySQL connection
const connection = mysql.createConnection({
  host:'srv1140.hstgr.io',
  user: 'u976218528_trackpaxnew',
  password:'Explore@999',
  database: 'u976218528_trackpaxnew'
  

});


const createnewpackagelist = (req, res) => {

    const { tracking_number, package_title, selectlist, sub,destination_country } = req.body;
    console.log(req.body)
  
    // Ensure required fields are provided
    if (!tracking_number || !package_title || !selectlist) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    const newUser = {
        tracking_number,
      package_title,
      selectlist, 
        sub,
        destination_country
    };  
    connection.query('INSERT INTO newpackage SET ?', newUser, (err, result) => {
      if (err) {
        console.error('Error creating list: ', err);
        res.status(500).json({ error: 'Error creating list' });
        return;
      }
      console.log('New List created successfully');
      res.status(201).json({ message: 'New List created successfully' });
    });
  };
  


//   const getuserdetails = (req,res) =>{




// console.log(req.query.id,"userID")
// const sub = req.query.id


//   // Query to retrieve records based on user ID
//   const sql = `SELECT * FROM users WHERE sub = ${sub}`;

//   // Execute the query with the user ID parameter
//   connection.query(sql, [sub], (err, results) => {
//     if (err) {
//       console.error('Error retrieving records:', err);
//       res.status(500).json({ error: 'Error retrieving records' });
//       return;
//     }
//     // Send the retrieved records as a JSON response
//     res.json(results);
//     console.log(results,"Matched Records")
//   });

// }





const createlist = (req, res) => {

    const {  listname,selectlist, sub, guest_id } = req.body;
    console.log(req.body)
  
    // Ensure required fields are provided
    if (!listname  || !selectlist) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
  
    const newUser = {
        listname,
    
      selectlist, 
        sub,
        guest_id
    };
  
    connection.query('INSERT INTO newlist SET ?', newUser, (err, result) => {
      if (err) {
        console.error('Error creating list: ', err);
        res.status(500).json({ error: 'Error creating list' });
        return;
      }
      console.log('New List created successfully');
      res.status(201).json({ message: 'New List created successfully' });
    });
  };
  






  const getuserdetailsandparcel = (req, res) => {
    console.log(req.query.id, "userID");
    const sub = req.query.id;

    // Query to retrieve records based on user ID
    const sql = `SELECT uuid FROM newpackage WHERE sub = ${sub}`;

    // Execute the query with the user ID parameter
    connection.query(sql, [sub], (err, results) => {
        if (err) {
            console.error('Error retrieving records:', err);
            res.status(500).json({ error: 'Error retrieving records' });
            return;
        }

        // Log the retrieved records
        console.log('Matched Records:', results);

        // Extract UUIDs from the retrieved results
        const uuids = results.map(row => row.uuid);
        console.log('UUIDs for each record:', uuids);

        uuids.forEach(uuid => {
                console.log(uuid,"121")

               const trackingStatus=  getparceltrackingstatus(uuid)
               console.log(trackingStatus,"TrackingStatus")





        });

        // Send the retrieved records as a JSON response
        res.json(results);
    });
};














const getuserpackagedetails = (req, res) => {
    console.log(req.query.id, "userID");
    const sub = req.query.id;

    // Query to retrieve records based on user ID
    const sql = `SELECT * FROM newpackage WHERE sub = ${sub}`;

    // Execute the query with the user ID parameter
    connection.query(sql, [sub], (err, results) => {
        if (err) {
            console.error('Error retrieving records:', err);
            res.status(500).json({ error: 'Error retrieving records' });
            return;
        }

       

        // Send the retrieved records as a JSON response
        res.json(results);
    });
};











module.exports={ createnewpackagelist , createlist,getuserdetailsandparcel,getuserpackagedetails}