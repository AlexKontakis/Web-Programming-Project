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
// To load event management
router.get('/event_mng', async (req, res) => {
    try {
      
      const entries = await EventModel.find({});
      let tableRows = '';

      const filter = req.session.filter;
      const search = req.session.search;
      if(search == undefined || search == ""){
        entries.forEach((entry) => {
          tableRows += `<tr><td><a href="/getEventId?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}&date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
          ${entry._id}</a></td><td>${entry.title}</td>
          <td>${entry.state}</td><td>${entry.description}</td><td>${entry.date}</td><td>${entry.location}</td>
          <td style="text-align: center;">${entry.Normal}</td><td style="text-align: center;">${entry.VIP}</td>
          <td style="text-align: center;">${entry.Special}</td><td style="text-align: center;">${entry.Reservation_Cap}</td></tr>`;
        
        });
      } else{
        if(filter == "Title"){
          entries.forEach((entry) => {
            if(entry.title == search){
              tableRows += `<tr><td><a href="/getEventId?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}&date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry._id}</a></td><td>${entry.title}</td>
              <td>${entry.state}</td><td>${entry.description}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td style="text-align: center;">${entry.Normal}</td><td style="text-align: center;">${entry.VIP}</td>
              <td style="text-align: center;">${entry.Special}</td><td style="text-align: center;">${entry.Reservation_Cap}</td></tr>`;
            }
          });
        }
        else if(filter == "Date"){
          entries.forEach((entry) => {
            if(entry.date == search){
              tableRows += `<tr><td><a href="/getEventId?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}&date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry._id}</a></td><td>${entry.title}</td>
              <td>${entry.state}</td><td>${entry.description}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td style="text-align: center;">${entry.Normal}</td><td style="text-align: center;">${entry.VIP}</td>
              <td style="text-align: center;">${entry.Special}</td><td style="text-align: center;">${entry.Reservation_Cap}</td></tr>`;
            }
          });
        }
        else if(filter == "Location"){
          entries.forEach((entry) => {
            if(entry.location == search){
              tableRows += `<tr><td><a href="/getEventId?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}&date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry._id}</a></td><td>${entry.title}</td>
              <td>${entry.state}</td><td>${entry.description}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td style="text-align: center;">${entry.Normal}</td><td style="text-align: center;">${entry.VIP}</td>
              <td style="text-align: center;">${entry.Special}</td><td style="text-align: center;">${entry.Reservation_Cap}</td></tr>`;
            }
          });
        }
        else if(filter == "Reservation Cap"){
          entries.forEach((entry) => {
            if(entry.Reservation_Cap == search){
              tableRows += `<tr><td><a href="/getEventId?eventId=${entry._id}&title=${entry.title}&state=${entry.state}&desc=${entry.description}&date=${entry.date}&location=${entry.location}&Normal=${entry.Normal}&Vip=${entry.VIP}&Special=${entry.Special}&ResCap=${entry.Reservation_Cap}">
              ${entry._id}</a></td><td>${entry.title}</td>
              <td>${entry.state}</td><td>${entry.description}</td><td>${entry.date}</td><td>${entry.location}</td>
              <td style="text-align: center;">${entry.Normal}</td><td style="text-align: center;">${entry.VIP}</td>
              <td style="text-align: center;">${entry.Special}</td><td style="text-align: center;">${entry.Reservation_Cap}</td></tr>`;
            }
          });
        }
      }  
     
      
      const filePath = path.join(__dirname, '../../app/templates/Event_Management_Page.html');
      
      
     
      
      const ID = req.session.selectedID ;
      const Title = req.session.selectedTitle ;
      const State = req.session.selectedState ;
      const Desc = req.session.selectedDesc ;
      const Date = req.session.selectedDate ;
      const Location = req.session.selectedLocation ;
      const Normal = req.session.selectedNormal ;
      const Vip = req.session.selectedVip ;
      const Special = req.session.selectedSpecial ;
      const ResCap = req.session.selectedResCap ;
      
      
      const htmlTemplate = fs.readFileSync(filePath,'utf-8');
      
      
      
      
      const html = htmlTemplate
      .replace('{{tableRows}}', tableRows)
      .replace('{{sessionId}}', ID)
      .replace('{{sessionT}}', Title)
      .replace('{{sessionSt}}', State)
      .replace('{{sessionDe}}', Desc)
      .replace('{{sessionDa}}',Date)
      .replace('{{sessionL}}', Location)
      .replace('{{sessionNP}}', Normal)
      .replace('{{sessionVP}}', Vip)
      .replace('{{sessionSP}}', Special)
      .replace('{{sessionRC}}', ResCap);
      //
      
      
      if(req.session.role == "admin"){
        res.send(html);
      }
      else{
        res.redirect('/');
      }

    
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching entries from the database.');
    }
  });


  module.exports = router;

  