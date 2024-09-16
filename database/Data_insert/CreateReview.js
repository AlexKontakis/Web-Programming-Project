const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const ReviewModel = require('../../app/Models/reviews_model');








router.post('/CreateReview', async(req, res) => {
  try{
    
    
    // Extract data from the form submission
    const { input_review } = req.body;
    
    // φτιαχνω καινουριο entry στο example collection της test db με βαση το model ExampleModel βλ γραμμη 8-14
    const reviews = new ReviewModel({
        review: input_review,
        eventId: req.session.eventID,
        userId: req.session._id,
        username: req.session.selectedUsername
    });
    ///ελεγχοι για την καταχωρηση
    
    ///
    
    await reviews.save();
    res.redirect('/reviews');

  }
  catch (error){
    console.error('Error saving document:', error);
    res.status(500).send('Error adding document to the collection');
  }
});

module.exports = router;

