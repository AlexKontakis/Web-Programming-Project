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


router.get('/user_mng', async(req, res) => {
    try {
      
      
      const entries = await UserModel.find({});
      let tableRows = '';
      const filter = req.session.filter;
      const search = req.session.search;
      if(search == undefined || search == ""){
        entries.forEach((entry) => {
          
          tableRows += `<tr><td><a id="Id_link" href="/getId?User_id=${entry._id}&Username=${entry.username}&Email=${entry.email}&Pass=${entry.password}">${entry._id}</a>
          </td><td>${entry.username}</td><td>${entry.email}</td><td>${entry.password}</td></tr>`;
        });
      }
      else{
        if(filter == "Username Id"){
          entries.forEach((entry) => {
          
            if(entry._id == search){
              tableRows += `<tr><td><a id="Id_link" href="/getId?User_id=${entry._id}&Username=${entry.username}&Email=${entry.email}&Pass=${entry.password}">${entry._id}</a>
              </td><td>${entry.username}</td><td>${entry.email}</td><td>${entry.password}</td></tr>`;
            }
          });
        }
        else if(filter == "Email"){
          entries.forEach((entry) => {
          
            if(entry.email == search){
              tableRows += `<tr><td><a id="Id_link" href="/getId?User_id=${entry._id}&Username=${entry.username}&Email=${entry.email}&Pass=${entry.password}">${entry._id}</a>
              </td><td>${entry.username}</td><td>${entry.email}</td><td>${entry.password}</td></tr>`;
            }
          });
        }
        else if(filter == "Display Username"){
          entries.forEach((entry) => {
          
            if(entry.username == search){
              tableRows += `<tr><td><a id="Id_link" href="/getId?User_id=${entry._id}&Username=${entry.username}&Email=${entry.email}&Pass=${entry.password}">${entry._id}</a>
              </td><td>${entry.username}</td><td>${entry.email}</td><td>${entry.password}</td></tr>`;
            }
          });
        }
        else if(filter == "Password"){
          entries.forEach((entry) => {
          
            if(entry.password == search){
              tableRows += `<tr><td><a id="Id_link" href="/getId?User_id=${entry._id}&Username=${entry.username}&Email=${entry.email}&Pass=${entry.password}">${entry._id}</a></td><td>${entry.username}</td><td>${entry.email}</td><td>${entry.password}</td></tr>`;
            }
          });
        }
      }
      
      
      
      const filePath = path.join(__dirname, '../../app/templates/User_Management_Page.html');
    
      const ID = req.session.selectedID;
      const User = req.session.selectedUsername;
      const Email = req.session.selectedEmail;
      const Pass = req.session.selectedPassword;
     
      const htmlTemplate = fs.readFileSync(filePath,'utf-8');
      
      const html = htmlTemplate
      .replace('{{tableRows}}', tableRows)
      .replace('{{sessionId}}',ID)
      .replace('{{sessionU}}',User)
      .replace('{{sessionE}}',Email)
      .replace('{{sessionP}}',Pass);
      //
      if(req.session.role == "admin"){
        res.send(html);
      }else{
        res.redirect('/');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching entries from the database.');
    }
  });


  module.exports = router;

  