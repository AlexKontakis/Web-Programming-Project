const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    review: String,
    eventId: ObjectId,
    userId: ObjectId,
    username: String
    
});
const ReviewModel = mongoose.model('Reviews', reviewSchema);



module.exports = ReviewModel;