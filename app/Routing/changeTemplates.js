// Import the required modules
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const fs = require('fs');
const UserModel = require('../../app/Models/user_model');
const InfoModel = require('../../app/Models/info_model');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//parameters: document = value that i want to search, check_by = field inside the model, Model = the model i want to update
async function checkDocumentExists(document, Model){
  try{
    

    if(document == "admin"){
      const existingAdmin = await Model.findOne({ username: document });
      if(existingAdmin){
        console.log("Admin already exists");
      }
      else{
         // φτιαχνω καινουριο entry στο example collection της test db με βαση το model ExampleModel βλ γραμμη 8-14
         const user = new UserModel({
          username: "admin",
          email: "admin@admin.com",
          password: "admin",
          role: "admin"
        });
  
  
        await user.save();
        
      }
    }
    else{
      const count = await Model.countDocuments();
      if(count > 0){
        console.log("Info already exists");
      }
      else{
         // φτιαχνω καινουριο entry στο example collection της test db με βαση το model ExampleModel βλ γραμμη 8-14
        const info = new InfoModel({
          info: "Info not added yet"
        });
  
        
        await info.save();
        
        
      }
    }
  }catch(error){
    console.error('Error occurred:', error);
  }
}


//Routing for Home Page
router.get('/', (req, res) => {
  //
  
  
  checkDocumentExists('admin', UserModel);
  checkDocumentExists('', InfoModel);
  
  InfoModel.find({})  
  .then(data => {
    
   
    if(data.length > 0){
      req.session.info = data[0].info;
      
      const sessionUsername = req.session.user;
      
      const filePath = path.join(__dirname, '../templates/Home_Page.html');
      
      fs.readFile(filePath, 'utf8', (err, htmlContent) =>{
        if(sessionUsername != undefined){
          const modifiedHtml = htmlContent.replace('{{sessionValue}}', sessionUsername);
          res.send(modifiedHtml);
        }
        else{
          res.sendFile(filePath);
        }
      });
    }else{
      res.redirect('/');
    }
    
    
  }) 
  .catch(error => {
    
    res.status(500).send(error);
  });   
  //
  
});
//Routing for login
router.get('/login', (req, res) => {
  const filePath = path.join(__dirname, '../templates/Login_Page.html');
  res.sendFile(filePath);
});



//Routing for info
router.get('/info', (req, res) => {
  const filePath = path.join(__dirname, '../../app/templates/Info.html');
  const sessionUsername = req.session.user;
  const htmlContent = fs.readFileSync(filePath,'utf-8');
  if(sessionUsername != undefined){
    const modifiedHtml = htmlContent
    .replace('{{CampaignInfo}}', req.session.info)
    .replace('{{sessionValue}}', sessionUsername);
    res.send(modifiedHtml);
  }
  else{
    const filePath = path.join(__dirname, '../../app/templates/Login_Page.html');
    res.sendFile(filePath);
  }
  
      
   
    
  
});

/* /history is in Table_view_history */

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
  const sessionUsername = req.session.user
  const sessionEmail = req.session.email;
  const sessionPass = req.session.password;
  const filePath = path.join(__dirname, '../templates/Profile_Page.html');
  
  fs.readFile(filePath, 'utf8', (err, htmlContent) =>{
    if(sessionUsername != undefined){
      const modifiedHtml = htmlContent
      .replace('{{sessionValue}}',sessionUsername)
      .replace('{{sessionEmail}}' ,sessionEmail)
      .replace('{{sessionPass}}', sessionPass);
      res.send(modifiedHtml);
    }
    else{
      const filePath = path.join(__dirname, '../../app/templates/Login_Page.html');
      res.sendFile(filePath);
    }
  })
  
  
});



router.get('/event_template', (req, res) => {
  //
  const eventTitle = req.query.title;
  const eventDesc = req.query.desc;
  const NormalPrice = req.query.Normal;
  const VipPrice = req.query.Vip;
  const SpecialPrice = req.query.Special;
  const eventDate = req.query.date;
  req.session.eventID = req.query.eventId;
  req.session.eventTitle = eventTitle;

 
  
  //
  const sessionUsername = req.session.user;
  const filePath = path.join(__dirname, '../templates/Event_Template.html');
  fs.readFile(filePath, 'utf8', (err, htmlContent) =>{
    const modifiedHtml = htmlContent
    .replace('{{sessionValue}}', sessionUsername)
    .replace('{{sessionTitle}}', eventTitle)
    .replace('{{sessionDescription}}', eventDesc)
    .replace('{{sessionNormalPrice}}', NormalPrice)
    .replace('{{session VipPrice}}', VipPrice)
    .replace('{{sessionSpecialPrice}}', SpecialPrice)
    .replace('{{sessionDate}}', eventDate);
    //Need to add for the description of the event
    res.send(modifiedHtml);
  })
});

//Admin Templates
router.get('/admin',  (req, res) => {
  const role = req.session.role;
 
  if(role == 'admin'){
    const filePath = path.join(__dirname, '../templates/Admin_Home.html');
    res.sendFile(filePath);
  }else{
    const filePath = path.join(__dirname, '../templates/Home_Page.html');
    res.redirect('/')
  }
});





router.get('/info_mng',  (req, res) => {
  const role = req.session.role;
  
 
  if(role == 'admin'){
    const filePath = path.join(__dirname, '../templates/Info_Management_Page.html');
    fs.readFile(filePath, 'utf8', (err, htmlContent) =>{
      const modifiedHtml = htmlContent
      .replace('{{CampaignInfo}}', req.session.info);
      //Need to add for the description of the event
      res.send(modifiedHtml);
    });
  }else{
    const filePath = path.join(__dirname, '../templates/Home_Page.html');
    res.redirect('/')
  }
});

// Export the router
module.exports = router;
