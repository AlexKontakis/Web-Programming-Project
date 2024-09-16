const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const UserModel = require('../../app/Models/user_model');

const InfoModel = require('../../app/Models/info_model');








router.post('/SignUpUser', async(req, res) => {
  try{
    
    // Extract data from the form submission
    const { Username0, Email0, Password0 } = req.body;//χρησιμοποιω τα name attributes απο το html για να παρω τις τιμες των input που θελω
  
    // φτιαχνω καινουριο entry στο example collection της test db με βαση το model ExampleModel βλ γραμμη 8-14
    const user = new UserModel({
      username: Username0,
      email: Email0,
      password: Password0,
      role: "user"
    });
    ///ελεγχοι για την καταχωρηση
    
    await user.save();
    if(req.session.role == "admin"){
      res.redirect('/user_mng');
      
    }
    else{
      res.redirect('/login');
      
    }

  }
  catch (error){
    console.error('Error saving document:', error);
    res.status(500).send('Error adding document to the collection');
  }
});

module.exports = router;

