const express = require('express');
const fs = require('fs');
const UserModel = require('../../app/Models/user_model');
const router = express.Router();
const path = require('path');
const session = require('express-session');
//
const bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.get('/getId', (req,res) => {
    
        const filePath = path.join(__dirname, './app/templates/User_Management_Page.html');
        //selected user
        req.session.selectedID = req.query.User_id;
        req.session.selectedUsername = req.query.Username;
        req.session.selectedEmail = req.query.Email;
        req.session.selectedPassword = req.query.Pass;
       
        //is in session
        req.session.user = req.session.user;
        req.session.email = req.session.email;
        req.session.password = req.session.password;
        req.session.role = "admin";
       
        req.session.save();
        

        res.redirect('/user_mng');
    

});

module.exports = router;