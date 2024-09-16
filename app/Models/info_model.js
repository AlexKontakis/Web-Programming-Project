const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({ 
    info: String,
});

const InfoModel = mongoose.model('infos',InfoSchema);


module.exports = InfoModel;