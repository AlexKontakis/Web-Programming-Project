const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/Check', (req,res)=>{
    try{
        // Extract data from the form submission
        const { Password1 } = req.body;
        // Extract password from session
        const sessionPassword = req.session.password;
        if(sessionPassword == Password1){
            
        }
    }
    catch (error){
        console.error('Error saving document:', error);
        res.status(500).send('Error adding document to the collection');
      }
});


module.exports = router;