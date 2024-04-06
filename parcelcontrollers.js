const axios = require('axios');
const connection = require('./Schema/db');

async function getParcelTrackingid(req, res) {
    try {
        const { shipments, sub, tracking_number, package_title, selectlist, destination_country } = req.body;
        const data = {
            sub,
            shipments,
            language: 'en',
            apiKey: process.env.API_KEY // Use environment variable for API key
        };
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
        const newUser = { tracking_number, package_title, selectlist, sub, destination_country, uuid };
        connection.query('INSERT INTO newpackage SET ?', newUser, (err, result) => {
            if (err) {
                console.error('Error creating list: ', err);
                return res.status(500).json({ error: 'Error creating list' });
            }
            console.log('New List created successfully');
            res.status(201).json({ message: 'New List created successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
}

async function getParcelTrackingStatus(uuid, req, res) {
    try {
        const config = {
            method: 'get',
            url: `https://parcelsapp.com/api/v3/shipments/tracking?uuid=${uuid}&apiKey=${process.env.API_KEY}`,
            headers: {
                'Accept': 'application/json'
            }
        };
        const response = await axios(config);
        const status = response.data.shipments[0].status;
        const updateQuery = `UPDATE newpackage SET status = ? WHERE uuid = ?`;
        connection.query(updateQuery, [status, uuid], (error, results, fields) => {
            if (error) {
                console.error('Error updating field:', error);
                return res.status(500).json({ error: 'Error updating field' });
            }
            console.log('Field updated successfully');
            res.status(200).json({ message: 'Field updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking shipment status.' });
    }
}

module.exports = { getParcelTrackingid, getParcelTrackingStatus };
