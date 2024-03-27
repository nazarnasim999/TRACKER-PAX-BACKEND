const express = require('express');
const { getAllUsers, createUser, getuserdetails, trackpackage } = require('./googlecontrollers');
const { parcel, getparceltrackingid, getparceltrackingstatus, getparceltrackingstatus1 } = require('./parcelcontrollers');
const { createnewpackagelist, createlist, getuserdetailsandparcel, getuserpackagedetails } = require('./createnewpackagecontrollers');
const router = express.Router();


// Route to get all users
router.get('/ts', getAllUsers);

router.post('/createuser',createUser);

router.get('/getuserdetails',getuserdetails);


router.post('/api/track-shipment',getparceltrackingid)


router.get('/api/check-shipment/:uuid',getparceltrackingstatus1)


router.post('/createnewpackagelist',createnewpackagelist)

router.post('/createnewlist',createlist)


router.get('/getpackagedetails',getuserdetailsandparcel);

router.get('/getuserpackagedetails',getuserpackagedetails);



router.post('/trackpackage',trackpackage)





module.exports = router;
