const express = require('express')
const port = 3000;
const router = express();
const mongoose = require('mongoose');
const session = require('express-session');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//public variable for the current session



//checks the existance of the login credentials given
router.post('/LoginUser', (req, res) => {
    
    const { username_L, password_L } = req.body;
  
    // Assuming you have a User model defined in your database.js file
    const User = mongoose.model('users');
    
    
    
  
    User.find({username: username_L, password: password_L })
    
      .then((docs) => {
        
        if (docs.length <= 0) {
          
          
        } else {
          
          //save the info of the logged in user as his session
          req.session.user = docs[0].username;
          req.session.email = docs[0].email;
          req.session.password = docs[0].password; 
          req.session.role = docs[0].role;
          req.session._id = docs[0]._id;
          
          
          
          

          
          if(req.session.role == "admin"){
            res.redirect('/admin');
          }else{
            req.session.selectedID = docs[0]._id;;
            req.session.selectedUsername = docs[0].username;
            req.session.selectedEmail = docs[0].email;
            req.session.selectedPassword = docs[0].password; 
            res.redirect('/');
          }
          
        }
      })
      .catch((err) => {
        
        console.error(err);
        res.redirect('/login');
      });
  });

  module.exports = router;
  