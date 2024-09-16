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
const filter = "";
const searchBar = "";


router.post('/searchUsers', (req, res) =>{
    try{
        const filter = req.body.filter;
        const searchBar = req.body.search_bar;
      
         req.session.search = searchBar;
         req.session.filter = filter;
         req.session.save();
         
        res.redirect('/user_mng');
       
    }catch(err){
        
    }
});

router.post('/searchEvents', (req, res) =>{
    try{
        const filter = req.body.filter;
        const searchBar = req.body.search_bar;
      
         req.session.search = searchBar;
         req.session.filter = filter;
         
         req.session.save();
         res.redirect('/event_mng');
       
       
    }catch(err){
        
    }
});

router.post('/searchUserEvents', (req, res) =>{
    try{
        const filter = req.body.filter;
        const searchBar = req.body.search_bar;
      
         req.session.search = searchBar;
         req.session.filter = filter;
         
         req.session.save();
         
         res.redirect('/events');
       
    }catch(err){
        
    }
});

module.exports = router;