const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  eventId: ObjectId,
  eventTitle: String,
  userId: ObjectId,
  totalAmount: Number,
  email: String,
  creditCardType: String, 
  participants: Number
    
});




const ReservationModel= mongoose.model('Reservations', reservationSchema);



module.exports = ReservationModel;