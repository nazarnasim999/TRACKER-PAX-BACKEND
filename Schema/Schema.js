const connection = require('./db');

// Function to create schema and tables
function TrackPaxSchema() {
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL database: ', err);
      return;
    }
    console.log('Connected to MySQL database');
    
    // Execute SQL commands to create schema and tables
    const SchemaQueries = [
      'CREATE SCHEMA IF NOT EXISTS sql6695334;',
      'USE sql6695334;',
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sub VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        email_verified BOOLEAN,
        picture VARCHAR(255),
        company_name VARCHAR(255),
        company_category VARCHAR(255),
        is_user_subscribed INT,
        number_of_inbount_list_created INT,
        number_of_outbound_list_created INT,
        total_number_of_packages_tracked INT,
        is_deactivated INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS guestusers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        guest_id INT,
        name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        company_category VARCHAR(255),
        is_user_subscribed INT,
        number_of_inbount_list_created INT,
        number_of_outbound_list_created INT,
        total_number_of_packages_tracked INT,
        is_deactivated INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS newpackage (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sub VARCHAR(255),
        guest_id INT,
        destination_country VARCHAR(255),
        tracking_number VARCHAR(255) NOT NULL,
        package_title VARCHAR(255),
        selectlist VARCHAR(255),
        status VARCHAR(255),
        uuid VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS newlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sub VARCHAR(255),
        guest_id INT,
        listname VARCHAR(255),
        selectlist VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP
      );`
    ];

    // Execute each query
    SchemaQueries.forEach(query => {
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          return;
        }
        console.log('Query executed successfully');
      });
    });
  });
}

module.exports = TrackPaxSchema;
