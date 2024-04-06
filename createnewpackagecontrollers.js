const connection = require('./Schema/db');
const { getparceltrackingstatus } = require('./parcelcontrollers');

const createnewpackagelist = (req, res) => {
    const { tracking_number, package_title, selectlist, sub, destination_country } = req.body;

    if (!tracking_number || !package_title || !selectlist) {
        return res.status(400).json({ error: 'Missing required fields' });
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
            return res.status(500).json({ error: 'Error creating list' });
        }
        console.log('New List created successfully');
        res.status(201).json({ message: 'New List created successfully' });
    });
};

const createlist = (req, res) => {
    const { listname, selectlist, sub, guest_id } = req.body;

    if (!listname || !selectlist) {
        return res.status(400).json({ error: 'Missing required fields' });
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
            return res.status(500).json({ error: 'Error creating list' });
        }
        console.log('New List created successfully');
        res.status(201).json({ message: 'New List created successfully' });
    });
};

const getuserdetailsandparcel = async (req, res) => {
    try {
        const sub = req.query.id;
        const sql = `SELECT uuid FROM newpackage WHERE sub = ${sub}`;
        const results = await connection.query(sql, [sub]);

        const uuids = results.map(row => row.uuid);
        console.log('UUIDs for each record:', uuids);

        for (const uuid of uuids) {
            console.log(uuid, "121")
            const trackingStatus = await getparceltrackingstatus(uuid);
            console.log(trackingStatus, "TrackingStatus");
        }

        res.json(results);
    } catch (error) {
        console.error('Error retrieving records:', error);
        res.status(500).json({ error: 'Error retrieving records' });
    }
};

const getuserpackagedetails = (req, res) => {
    const sub = req.query.id;
    const sql = `SELECT * FROM newpackage WHERE sub = ${sub}`;

    connection.query(sql, [sub], (err, results) => {
        if (err) {
            console.error('Error retrieving records:', err);
            return res.status(500).json({ error: 'Error retrieving records' });
        }
        res.json(results);
    });
};

module.exports = { createnewpackagelist, createlist, getuserdetailsandparcel, getuserpackagedetails };
