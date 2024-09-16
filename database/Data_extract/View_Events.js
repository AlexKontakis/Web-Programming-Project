const express = require('express');
const fs = require('fs');
const EventModel = require('../../app/Models/event_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/events', async (req, res) => {
  const sessionUsername = req.session.user;
  if(sessionUsername != undefined){
    try {
      const sessionUsername = req.session.user;
      
      const entries = await EventModel.find({});
      let tableRows = '';

      const filter = req.session.filter;
      const search = req.session.search;
      if(search == undefined || search == ""){
        entries.forEach((entry) => {
          tableRows += `<tr><td><a href="/event_template?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}
          &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
          ${entry.title}</a></td><td>${entry.state}</td><td>${entry.date}</td><td>${entry.location}</td>
          <td><a href="/getReviews?eventId=${entry._id}&title=${entry.title} &state=${entry.state}&desc=${entry.description}
          &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">Reviews</a></td></tr>`;
        
        });
      } else{
        if(filter == "Title"){
          entries.forEach((entry) => {
            if(entry.title == search){
              tableRows += `<tr><td><a href="/event_template?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry.title}</a></td><td>${entry.state}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td><a href="/getReviews?eventId=${entry._id}&title=${entry.title} &state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">Reviews</a></td></tr>`;
            }
          });
        }
        else if(filter == "Date"){
          entries.forEach((entry) => {
            if(entry.date == search){
              tableRows += `<tr><td><a href="/event_template?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry.title}</a></td><td>${entry.state}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td><a href="/getReviews?eventId=${entry._id}&title=${entry.title} &state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">Reviews</a></td></tr>`;
            }
          });
        }
        else if(filter == "Location"){
          entries.forEach((entry) => {
            if(entry.location == search){
              tableRows += `<tr><td><a href="/event_template?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry.title}</a></td><td>${entry.state}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td><a href="/getReviews?eventId=${entry._id}&title=${entry.title} &state=${entry.state}&desc=${entry.description}
              &date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">Reviews</a></td></tr>`;
                }
          });
        }
        
      }  
     
      
      const filePath = path.join(__dirname, '../../app/templates/Events.html');
      
      
     
      
      
      
      
      const htmlTemplate = fs.readFileSync(filePath,'utf-8');
      
      
      
      
      const html = htmlTemplate
      .replace('{{tableRows}}', tableRows)
      .replace('{{sessionValue}}',sessionUsername)
      
      res.send(html);

    
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching entries from the database.');
    }
  }
  else{
    const filePath = path.join(__dirname, '../../app/templates/Login_Page.html');
    res.sendFile(filePath);

  } 
  });


  module.exports = router;

  