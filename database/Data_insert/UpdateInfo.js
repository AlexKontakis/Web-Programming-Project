// Import the required modules
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');

const bodyParser = require('body-parser');

//model
const model = require('../../app/Models/info_model');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/updateInfo', async(req,res) => {
    
    
    try{
        
        const document = await model.findOneAndUpdate(
            {info: req.session.info},
            {
                
                info: req.body.input_info

            },
            {new: true }
        );
        req.session.info = document.info
        res.redirect('/info_mng');
       
    }catch(error){
        
        
        res.send(error);
    }
});





module.exports = router;