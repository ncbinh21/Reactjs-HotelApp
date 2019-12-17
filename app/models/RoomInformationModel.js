const mongoose = require('mongoose');

const RoomInformationSchema = mongoose.Schema({
    title: String,
    content: String,
    url: String,
    price: Number,
    type: String,
    size: String,
    userId: String,
    status: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RoomInformation', RoomInformationSchema);