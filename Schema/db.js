const mysql = require('mysql2');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

// Maximum number of connection attempts
const MAX_CONNECTION_ATTEMPTS = 10;

// Delay between retry attempts (in milliseconds)
const RETRY_DELAY = 3000; // 3 seconds

// Function to establish database connection with retry logic
function establishConnectionWithRetry() {
  let attempts = 0;
  let connection;

  function tryConnect() {
    attempts++;
    console.log(`Attempting to connect to the database. Attempt ${attempts} of ${MAX_CONNECTION_ATTEMPTS}`);

    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
      if (err) {
        console.error(`Connection attempt failed: ${err.message}`);
        if (attempts < MAX_CONNECTION_ATTEMPTS) {
          // Retry after a delay
          setTimeout(tryConnect, RETRY_DELAY);
        } else {
          console.error('Maximum connection attempts reached. Unable to establish connection.');
          // Exit the process or handle the error appropriately
          process.exit(1);
        }
      } else {
        console.log('Connection established successfully.');
      }
    });
  }

  tryConnect();

  // Return the connection object
  return connection;
}

// Export the connection object
module.exports = establishConnectionWithRetry();
