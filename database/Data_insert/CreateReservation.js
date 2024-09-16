const express = require('express');
const fs = require('fs');
const participantModel = require('../../app/Models/participant_model');
const reservationModel = require('../../app/Models/reservation_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//fewfewfwefwefwefwefwe fwefwe//
    
router.post('/GetParticipants', async(req,res) => {
        try{
                
                const { Input_name0, Input_lastname0, Input_phone0, Input_mail0} = req.body;
                const { Input_name1, Input_lastname1, Input_phone1, Input_mail1} = req.body;
                const { Input_name2, Input_lastname2, Input_phone2, Input_mail2} = req.body;
                const { Input_name3, Input_lastname3, Input_phone3, Input_mail3} = req.body;
                
        
                const participant = new participantModel({
                        name: Input_name0,
                        lastName: Input_lastname0,
                        phone: Input_phone0,
                        email: Input_mail0,
                        eventid: req.session.eventID
                });
                
                
                await participant.save();
                
                if(Input_name1 != undefined){
                        const participant1 = new participantModel({
                                name: Input_name1,
                                lastName: Input_lastname1,
                                phone: Input_phone1,
                                email: Input_mail1,
                                eventid: req.session.eventID
                        });
                        
                        
                        await participant1.save();
                }
                if(Input_name2 != undefined){
                        const participant2 = new participantModel({
                                name: Input_name2,
                                lastName: Input_lastname2,
                                phone: Input_phone2,
                                email: Input_mail2,
                                eventid: req.session.eventID
                                
                        });
                        
                        
                        await participant2.save();
                }
                if(Input_name3 != undefined){
                        const participant3 = new participantModel({
                                name: Input_name3,
                                lastName: Input_lastname3,
                                phone: Input_phone3,
                                email: Input_mail3,
                                eventid: req.session.eventID
                        });
                        
                        
                        await participant3.save();
                }
                
                
                
                
        }catch(err){

        }
        
        
       

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/CreateReservation', async(req,res) => {
        try{
                
                const { payment_email, cardType } = req.body;
               
                
        
                const reservation = new reservationModel({
                        eventId: req.session.eventID,
                        eventTitle: req.session.eventTitle,
                        userId: req.session.selectedID,
                        totalAmount: 0,
                        email: payment_email,
                        creditCardType:  cardType, 
                       
                });
                
                
                await reservation.save();
                res.redirect('/events');
                
                
        }catch(err){
                console.log(err);
        }
        
        
       

});

module.exports = router;