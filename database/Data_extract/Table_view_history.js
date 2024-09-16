const express = require('express');
const fs = require('fs');
const EventModel = require('../../app/Models/event_model');
const ReservationModel = require('../../app/Models/reservation_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
// To load history page
router.get('/history', async (req, res) => {
  const sessionUsername = req.session.user;
  if(sessionUsername != undefined){
    try {
      const sessionUsername = req.session.user;
      
      const entriesH = await EventModel.find({});
      let tableRowsHistory = ''; 

      const entriesR = await ReservationModel.find({});
      let tableRowsReservation = '';

      
      entriesR.forEach((reservation) =>{
        if(reservation.userId.equals(req.session.selectedID)){
            
            entriesH.forEach((event)=>{
                
            
                if(event._id.equals(reservation.eventId)){
                    
                    tableRowsHistory += `<tr><td><a href="/event_template?eventId=${event._id}&title=${event.title}&state=${event.state}&desc=${event.description}&date=${event.date}&location=${event.location}&Normal=${event.Normal}&Vip=${event.VIP}&Special=${event.Special}&ResCap=${event.Reservation_Cap}">
                    ${event._id}</a></td><td>${event.title}</td>
                    <td>${event.state}</td><td>${event.description}</td><td>${event.date}</td><td>${event.location}</td>
                    <td><a href="/getReviews?eventId=${event._id}&title=${event.title} &state=${event.state}&desc=${event.description}
                    &date=${event.date}&location=${event.location}&Normal=${event.Normal}&Vip=${event.VIP}&Special=${event.Special}&ResCap=${event.Reservation_Cap}">Reviews</a></td></tr>`;
                }
                else{
                    
                }
            })
        }
      });

      entriesR.forEach((reservation) =>{
        if(reservation.userId.equals(req.session.selectedID)){
            tableRowsReservation += `<tr>
            <td>${reservation._id}</td>
            <td>${reservation.eventTitle}</td>
            <td>${reservation.email}</td>
            <td>${reservation.creditCardType}</td></tr>`;
        }
      })
 
     
      
      const filePath = path.join(__dirname, '../../app/templates/History.html');
      
      
     
      
     
      
      
      const htmlTemplate = fs.readFileSync(filePath,'utf-8');
      
      
      
      
      const html = htmlTemplate
      .replace('{{tableRowsHistory}}', tableRowsHistory)
      .replace('{{tableRowsReservations}}', tableRowsReservation)
      .replace('{{sessionValue}}',sessionUsername)
      //
      
      
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

  