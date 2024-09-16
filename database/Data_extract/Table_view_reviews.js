const express = require('express');
const fs = require('fs');
const ReviewModel = require('../../app/Models/reviews_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');



router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/reviews', async(req, res) => {
    try {
     
      
      
      const entries = await ReviewModel.find({});
      let tableRows = '';
      const SessionUsername = req.session.user;
      
      
      
      entries.forEach((entry) => {
        if(entry.eventId == req.session.eventID){
            tableRows += `<tr><td>${entry.username}</td><td>${entry.review}</td></tr>`;
        }
      });
      
      
      const filePath = path.join(__dirname, '../../app/templates/Reviews.html');
    
      
     
      const htmlTemplate = fs.readFileSync(filePath,'utf-8');
      
      const html = htmlTemplate
      .replace('{{tableRows}}', tableRows)
      .replace('{{sessionEvent}}', req.session.eventTitle)
      .replace('{{sessionValue}}', SessionUsername);
      
      //
      res.send(html);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching entries from the database.');
    }
  });


  module.exports = router;

  