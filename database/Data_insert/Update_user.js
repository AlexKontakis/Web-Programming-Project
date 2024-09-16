// Import the required modules
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');

//model
const model = require('../../app/Models/user_model');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/updateUser', async(req,res) => {
    
   
    const documentId = req.session.selectedID;
    
    try{
        
        const document = await model.findOneAndUpdate(
            {_id: documentId},
            {
                
                username: req.body.Username2,
                email: req.body.Email2,
                password: req.body.Password2,
                role: "user"

            },
            {new: true }
           
        );
        
        if(req.session.role == "admin"){
            
            req.session.user = req.body.Username2;
            req.session.email = req.body.Email2;
            req.session.password = req.body.Password2;
            req.session.role = "admin"
            
            
            req.session.selectedUsername = req.body.Username2;
            req.session.selectedEmail = req.body.Email2;
            req.session.selectedPassword = req.body.Password2;
            
            
            res.redirect('/user_mng');
        }else{
            
            req.session.user = req.body.Username2;
            req.session.email = req.body.Email2;
            req.session.password = req.body.Password2;
            req.session.role = "user"
            
            
            req.session.selectedUsername = req.body.Username2;
            req.session.selectedEmail = req.body.Email2;
            req.session.selectedPassword = req.body.Password2;
            
            res.redirect('/profile');
        }
        req.session.save();
       
    }catch(error){
        
        
        res.send(error);
    }
});



module.exports = router;