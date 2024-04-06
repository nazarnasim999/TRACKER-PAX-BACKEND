// const express = require('express');
// const axios = require('axios');
// const { connect } = require('./routes');
// const app = express();
// app.use(express.json());



// const KEY= process.env.api_key;
// require('dotenv').config();
// const mysql = require('mysql');

// // Create MySQL connection
// const connection = mysql.createConnection({
//     host:process.env.host,
//     user:process.env.user,
//     password:process.env.password,
//     database:process.env.database
    
  
//   });




//   // Database connection configuration
// const dbConfig = {
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database
//   };
  
//   // Maximum number of connection attempts
//   const MAX_CONNECTION_ATTEMPTS = 100000000;
  
//   // Delay between retry attempts (in milliseconds)
//   const RETRY_DELAY = 3000; // 3 seconds
  
//   // Function to establish database connection with retry logic
//   function establishConnectionWithRetry() {
//     let attempts = 0;
  
//     function tryConnect() {
//       attempts++;
//       console.log(`Attempting to connect to the database. Attempt ${attempts} of ${MAX_CONNECTION_ATTEMPTS}`);
  
//       const connection = mysql.createConnection(dbConfig);
  
//       connection.connect((err) => {
//         if (err) {
//           console.error(`Connection attempt failed: ${err.message}`);
//           if (attempts < MAX_CONNECTION_ATTEMPTS) {
//             // Retry after a delay
//             setTimeout(tryConnect, RETRY_DELAY);
//           } else {
//             console.error('Maximum connection attempts reached. Unable to establish connection.');
//           }
//         } else {
//           console.log('Connection established successfully.');
//           // Perform database operations with the established connection
//           // For example: executeQueries(connection);
//         }
//       });
//     }
  
//     tryConnect();
//   }
  
//   // Call the function to start the connection process
//   establishConnectionWithRetry();
  
  

const connection = require('./Schema/db');
  
  
  

// const getparceltrackingid = async (req,res)=>{



//     try {
//         const { shipments,
//             sub,
//             tracking_number,
//             package_title,
//             selectlist, 
//             destination_country,
        
//         } = req.body;
    
//         const data = {
//             sub,
//           shipments,
//           language:'en',
//           apiKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDMyMGM1MC0xNGZlLTExZWUtYjBkMS00MzM5YzEzOTUzNDIiLCJzdWJJZCI6IjY0OWFmZTgzN2M4MzE3MWVkNGViMTY2ZCIsImlhdCI6MTY4Nzg3OTI5OX0.P8ZSGB2_mh_FUoR9w_mYXcRt7riD-tqj0ZWlPE9kzqE"
//         };
//         // console.log(req.body)
//         console.log(data,"data")
    
//         const config = {
//           method: 'post',
//           url: 'https://parcelsapp.com/api/v3/shipments/tracking',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           data
//         };
    
//         const response = await axios(config);
//         res.json(response.data);
//         console.log(response.data)
       
//        const  uuid = response.data.uuid
//         console.log(uuid)


//         const newUser = {
//             tracking_number,
//           package_title,
//           selectlist, 
//             sub,
//             destination_country,
//             uuid
//         };  

//         connection.query('INSERT INTO newpackage SET ?', newUser, (err, result) => {
//             if (err) {
//                 console.error('Error creating list: ', err);
//                 res.status(500).json({ error: 'Error creating list' });
//                 return;
//             }
//             console.log('New List created successfully');
//             res.status(201).json({ message: 'New List created successfully' });
//         });

      






//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred while processing your request.' });
//       }
    

// }





const getparceltrackingid = async (req, res) => {
    try {
        const {
            shipments,
            sub,
            tracking_number,
            package_title,
            selectlist,
            destination_country,
        } = req.body;

        const data = {
            sub,
            shipments,
            language: 'en',
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDMyMGM1MC0xNGZlLTExZWUtYjBkMS00MzM5YzEzOTUzNDIiLCJzdWJJZCI6IjY0OWFmZTgzN2M4MzE3MWVkNGViMTY2ZCIsImlhdCI6MTY4Nzg3OTI5OX0.P8ZSGB2_mh_FUoR9w_mYXcRt7riD-tqj0ZWlPE9kzqE"
        };

        console.log(data, "data");

        const config = {
            method: 'post',
            url: 'https://parcelsapp.com/api/v3/shipments/tracking',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        };

        const response = await axios(config);
        const uuid = response.data.uuid;
        console.log(uuid);

        const newUser = {
            tracking_number,
            package_title,
            selectlist,
            sub,
            destination_country,
            uuid
        };

        // Execute the database query synchronously after receiving the response
        connection.query('INSERT INTO newpackage SET ?', newUser, (err, result) => {
            if (err) {
                console.error('Error creating list: ', err);
                res.status(500).json({ error: 'Error creating list' });
                return;
            }
            console.log('New List created successfully');
            // Only send the response after the database query has completed
            res.status(201).json({ message: 'New List created successfully' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}







const getparceltrackingstatus1 = async (req,res)=>{


    try {
        const { uuid } = req.params;
        const  apiKey  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDMyMGM1MC0xNGZlLTExZWUtYjBkMS00MzM5YzEzOTUzNDIiLCJzdWJJZCI6IjY0OWFmZTgzN2M4MzE3MWVkNGViMTY2ZCIsImlhdCI6MTY4Nzg3OTI5OX0.P8ZSGB2_mh_FUoR9w_mYXcRt7riD-tqj0ZWlPE9kzqE";

        console.log(uuid,apiKey)

        const config = {
            method: 'get',
            url: `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDMyMGM1MC0xNGZlLTExZWUtYjBkMS00MzM5YzEzOTUzNDIiLCJzdWJJZCI6IjY0OWFmZTgzN2M4MzE3MWVkNGViMTY2ZCIsImlhdCI6MTY4Nzg3OTI5OX0.P8ZSGB2_mh_FUoR9w_mYXcRt7riD-tqj0ZWlPE9kzqE`,
            headers: { 
                'Accept': 'application/json'
            }
        };

        const response = await axios(config);
        res.json(response.data);

        console.log(response.data,"API DATA")


                                connection.connect();

                        // Define your update query
                        
                        const updateQuery = `UPDATE your_table_name SET your_field_name = '${newValue}' WHERE id = '${idToUpdate}'`;

                        // Execute the update query
                        connection.query(updateQuery, function(error, results, fields) {
                        if (error) {
                            console.error('Error updating field:', error);
                        } else {
                            console.log('Field updated successfully');
                        }
                        });

                        // Close the connection
                        connection.end();






    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking shipment status.' });
    }





}



  

async function getparceltrackingstatus (uuid,req,res){


    try {
        // const { uuid } = uuid;
        
    

        const config = {
            method: 'get',
            url: `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1MDMyMGM1MC0xNGZlLTExZWUtYjBkMS00MzM5YzEzOTUzNDIiLCJzdWJJZCI6IjY0OWFmZTgzN2M4MzE3MWVkNGViMTY2ZCIsImlhdCI6MTY4Nzg3OTI5OX0.P8ZSGB2_mh_FUoR9w_mYXcRt7riD-tqj0ZWlPE9kzqE`,
            headers: { 
                'Accept': 'application/json'
            }
        };

        const response = await axios(config);
        // res.json(response.data);
        console.log("API RESPONSE TRACKING DATA",response.data)
        
        
        try {
            const status = response.data.shipments[0].status;
            console.log(status, "STATUS");


                const updateQuery = `UPDATE newpackage SET status = '${status}' WHERE uuid = '${uuid}'`;

                // Execute the update query
                connection.query(updateQuery, function(error, results, fields) {
                if (error) {
                    console.error('Error updating field:', error);
                } else {
                    console.log('Field updated successfully');
                }
                });








        } catch (error) {
            console.error("Error accessing status:", error);
        }
        
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking shipment status.' });
    }





}








module.exports={getparceltrackingid,getparceltrackingstatus1,getparceltrackingstatus}





