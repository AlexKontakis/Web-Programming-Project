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

router.post('/DeleteUser', (req,res) => {
    const documentId = req.session.selectedID;
    model.findByIdAndDelete(documentId)
        .then((deletedUser) => {
            if(req.session.role == "admin"){
                
                req.session.user = req.session.user;
                req.session.email = req.session.email;
                req.session.password = req.body.password;
                req.session.role = "admin"
                
                req.session.selectedID = " ";
                req.session.selectedUsername = " ";
                req.session.selectedEmail = " ";
                req.session.selectedPassword = " ";
                
                
                res.redirect('/user_mng');
            }else{
                
                req.session.user = req.body.Username2;
                req.session.email = req.body.Email2;
                req.session.password = req.body.Password2;
                req.session.role = "user"
                
                req.session.selectedID = " ";
                req.session.selectedUsername = " ";
                req.session.selectedEmail = " ";
                req.session.selectedPassword = " ";
                
                res.redirect('/');
            }
            req.session.save();
          // The document was deleted successfully
          
        })
        .catch((err) => {
            console.error(err);
            if(req.session.role == "admin"){
                res.redirect('/user_mng');
            }else{
                res.redirect('/profile');
            }
            // Handle the error
        });
       
    
});



module.exports = router;