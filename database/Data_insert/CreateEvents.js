const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const EventModel = require('../../app/Models/event_model');








router.post('/CreateEvent', async(req, res) => {
  try{
    
    // Extract data from the form submission
    const { Title0, State0, Description0, Date0, Location0, NormalPrice0,VIPPrice0,SpecialPrice0, ReservationCap0 } = req.body;//χρησιμοποιω τα name attributes απο το html για να παρω τις τιμες των input που θελω
  
    // φτιαχνω καινουριο entry στο example collection της test db με βαση το model ExampleModel βλ γραμμη 8-14
    const event = new EventModel({
        title: Title0,
        state: false,
        description: Description0,
        date: Date0,
        location: Location0,
        Normal: NormalPrice0,
        VIP: VIPPrice0,
        Special: SpecialPrice0,
        Reservation_Cap: ReservationCap0
    });
    ///ελεγχοι για την καταχωρηση
    
    ///
    await event.save();
    if(req.session.role == "admin"){
      res.redirect('/event_mng');
      
    }
    else{
      res.redirect('/');
      
    }

  }
  catch (error){
    console.error('Error saving document:', error);
    res.status(500).send('Error adding document to the collection');
  }
});

module.exports = router;

