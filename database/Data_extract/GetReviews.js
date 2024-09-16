const express = require('express');
const fs = require('fs');
const UserModel = require('../../app/Models/reviews_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/getReviews', (req,res) => {
    
        const filePath = path.join(__dirname, './app/templates/Reviews.html');
       
        req.session.eventID = req.query.eventId;
        req.session.eventTitle = req.query.title;
        

        res.redirect('/reviews');
    

});

module.exports = router;