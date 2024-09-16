const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    
    title: String,
    state: String,
    description: String,
    date: String,
    location: String,
    Normal: Number,
    VIP: Number,
    Special: Number,
    Reservation_Cap: Number
  
    
});
const EventModel = mongoose.model('Events', eventSchema);



module.exports = EventModel;