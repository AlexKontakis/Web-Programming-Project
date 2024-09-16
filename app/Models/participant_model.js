const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 
    
    name: String,
    lastName: String,
    phone: String,
    email: String,
    eventid: ObjectId
    
});

const UserModel = mongoose.model('participants',UserSchema);


module.exports = UserModel;