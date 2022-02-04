var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LocationSchema = mongoose.Schema({
     lat: Number, lon: Number 
}, { _id : false });

var TripSchema = new Schema(
    {
        start: {
            time: Number,
            lat: Number,
            lon: Number,
            address: String,
        },
        end: {
            time: Number,
            lat: Number,
            lon: Number,
            address: String,
        },
        distance: Number,
        duration: Number,
        overspeedsCount: Number,
        boundingBox: [LocationSchema],
    },
    { timestamps: false }
);

module.exports = mongoose.model("Trip", TripSchema);
