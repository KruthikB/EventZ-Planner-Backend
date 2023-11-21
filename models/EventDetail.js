// // models/EventDetail.js
// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//     name: String,
//     fromDate: Date,
//     toDate: Date,
//     location: String,
//     cost: Number,
//     imageUrl: String,
//     totalEntries: String,
//     description: String,
//     totalBudget: Number
// });

// module.exports = mongoose.model('EventDetail', eventSchema);


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    fromDate: Date,
    toDate: Date,
    location: String,
    cost: Number,
    imageUrl: String,
    totalEntries: String,
    description: String,
    totalBudget: Number,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // or the name of your User model
    },
    availableSeats: Number
});

module.exports = mongoose.model('EventDetail', eventSchema);
