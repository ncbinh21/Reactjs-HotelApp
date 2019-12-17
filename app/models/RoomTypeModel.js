const mongoose = require('mongoose');

const RoomTypeSchema = mongoose.Schema({
    type: String
});

module.exports = mongoose.model('RoomType', RoomTypeSchema);