const express = require('express');
const port = 3000;
const app = express();

//require session
const session = require('express-session');

//Set up express-session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
//takes the login credentials and places user in a session
const Sessions = require('./database/Data_insert/sessions');



//connect with Check_password.js file
const Check_Pass = require('./database/Data_insert/Check_password'); 

//searches byfilet
const search = require('./database/Data_extract/Search');


//dynamically displayes data onto the table of Events.html
const generateHtml = require('./database/Data_extract/Table_view_events');



//dynamically displayes data onto the table of User_Management_Page.html
const generateUserTable = require('./database/Data_extract/Table_view_users');

//Changes templates using angular routing
const changeTemplates = require('./app/Routing/changeTemplates');

//Connects to Furniture database using mongoose
const connectToMongoDB = require('./database/DB_connection/DBcon');

//Updates user document while in Profile_Page.html //connect with Update_user.js file
const updateUser = require('./database/Data_insert/Update_user');

//Updates user document while in Event_Management_Page.html //connect with Update_user.js file
const updateEvent = require('./database/Data_insert/Update_Event');

//Delets user document while in Profile_Page.html //connect with Update_user.js file
const deleteUser = require('./database/Data_insert/Delete_user');

//Delets user document while in Profile_Page.html //connect with Update_user.js file
const updateInfo = require('./database/Data_insert/UpdateInfo');

//Delets user document while in Event_Management_Page.html //connect with Update_user.js file
const deleteEvent = require('./database/Data_insert/Delete_event');

//Gets Users by clicking a link
const getUser = require('./database/Data_extract/GetUser');

//Gets Event by clicking a link
const getEvent = require('./database/Data_extract/GetEvent');

//Gets Event by clicking a link
const getReviews = require('./database/Data_extract/GetReviews');


//Gets Event by clicking a link
const getParticipants = require('./database/Data_insert/CreateReservation');

//Creates Events
const createEvents = require('./database/Data_insert/CreateEvents');

//Creates Reviews
const createReviews = require('./database/Data_insert/CreateReview');

// static + scripts files
app.use(express.static("public"));

//To get the values from html
const bodyParser = require('body-parser');

//gets the input values from Login_Page's POST signal with /SignUpUser endpoint and adds it to the database
const userRouter = require('./database/Data_insert/User_signup');




// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
connectToMongoDB()
  .then(() => {
    // Import router from User_signup.js and calls User_signup
    app.use('/', userRouter);

    //calls CreateEvents.js
    app.use('/', createEvents);

     //calls CreateReviews.js
     app.use('/', createReviews);
    
    
    //calls sessions.js
    app.use('/',Sessions);

    //calls search.js
    app.use('/',search);

    // Import router from Table_view_events.js and calls Table_view_events
    const eventsRouter = require('./database/Data_extract/Table_view_events.js');
    app.use('/', eventsRouter);

    // Import router from Table_view_events.js and calls Table_view_events
    const usersRouter = require('./database/Data_extract/Table_view_users.js');
    app.use('/', usersRouter);

    // Import router from Table_view_events.js and calls Table_view_events
    const ReviewsRouter = require('./database/Data_extract/Table_view_reviews.js');
    app.use('/', ReviewsRouter);

    //dynamically displayes data onto the table of Events.html
    const generateHistory = require('./database/Data_extract/Table_view_history');
    app.use('/', generateHistory);

    // Import router from View_events.js and calls ViewEvents
    const VEventsRouter = require('./database/Data_extract/View_Events.js');
    app.use('/', VEventsRouter);

    //Imports the use of GetUser.js
    app.use('/', getUser);

    //Imports the use of GetReviews.js
    app.use('/', getReviews);

    

    //Imports the use of getParticipantsjs
    app.use('/', getParticipants);

    //Imports the use of GetEvent.js
    app.use('/', getEvent);

    // Import router from changeTemplates.js and calls changeTemplates
    app.use('/', changeTemplates);

    //
    app.use('/', Check_Pass);

    //calls Update_User.js
    app.use('/', updateUser);

    //calls Update_Info.js
    app.use('/', updateInfo);

    //calls Update_Event.js
    app.use('/', updateEvent);
    
    //calls Delete_user.js
    app.use('/', deleteUser);

    //calls Delete_event.js
    app.use('/', deleteEvent);

    // Start the server
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

