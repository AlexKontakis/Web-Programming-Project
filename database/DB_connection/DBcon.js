const mongoose = require('mongoose');

const URL = 'mongodb+srv://alex:1234@cluster0.byx9lnn.mongodb.net/Furniture?retryWrites=true&w=majority';

const connectToMongoDB = () => {
  return mongoose.connect(URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

// Export the function
module.exports = connectToMongoDB;