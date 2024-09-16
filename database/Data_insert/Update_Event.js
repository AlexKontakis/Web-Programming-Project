// Import the required modules
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');

//model
const model = require('../../app/Models/event_model');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/updateEvent', async(req,res) => {
    
   
    const documentId = req.session.selectedID;
    
    try{
        
        const document = await model.findOneAndUpdate(
            {_id: documentId},
            {
                
                title: req.body.Title2,
                
                description: req.body.Description2,
                date: req.body.Date2,
                location: req.body.Location2,
                Normal: req.body.NormalPrice2,
                VIP: req.body.VIPPrice2,
                Special: req.body.SpecialPrice2,
                Reservation_Cap: req.body.ReservationCap2

            },
            {new: true }
           
        );
        
        req.session.save();
        if(req.session.role == "admin"){
            
            req.session.selectedID = documentId;
            req.session.selectedTitle =  req.body.Title2;
            req.session.selectedState =  "false";
            req.session.selectedDesc = req.body.Description2;
            req.session.selectedDate = req.body.Date;
            req.session.selectedLocation = req.body.Location2;
            req.session.selectedNormal = req.body.NormalPrice2;
            req.session.selectedVip = req.body.VIPPrice2;
            req.session.selectedSpecial = req.body.SpecialPrice2;
            req.session.selectedResCap = req.body.ReservationCap2;
            
            
            req.session.role = "admin";
            res.redirect('/event_mng')
            
            
        }else{
            
            
            req.session.role = "user"
            
            
            res.redirect('/events');
            
        }
        
       
    }catch(error){
        
        
        res.send(error);
    }
});



module.exports = router;