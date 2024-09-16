const express = require('express');
const fs = require('fs');
const UserModel = require('../../app/Models/event_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/getEventId', (req,res) => {
    
        const filePath = path.join(__dirname, './app/templates/Event_Management_Page.html');
        //selected event
        req.session.selectedID = req.query.eventId;
        req.session.selectedTitle = req.query.title;
        req.session.selectedState = req.query.state;
        req.session.selectedDesc = req.query.desc;
        req.session.selectedDate = req.query.date;
        req.session.selectedLocation = req.query.location;
        req.session.selectedNormal = req.query.Normal;
        req.session.selectedVip = req.query.Vip;
        req.session.selectedSpecial = req.query.Special;
        req.session.selectedResCap = req.query.ResCap;
        
       
        //is in session
        req.session.user = req.session.user;
        req.session.email = req.session.email;
        req.session.password = req.session.password;
        req.session.role = "admin";
        
        req.session.save();
        

        res.redirect('/event_mng');
    

});

module.exports = router;