const Trip = require("../models/TripModel");
const functions = require("../utils/functions");

module.exports.get = async (req, res) => {
    try {
        const { start_gte, start_lte, distance_gte, limit, offset } =
            functions.normalizeParams(req.query);

        const filters = {};

        if (start_gte) {
            filters['start.time'] = { $gte: start_gte };
        }

        if (start_lte) {
            filters['start.time'] = { $lte: start_lte };
        }

        if (distance_gte) {
            filters.distance = { $gte: distance_gte };
        }

        const trips = await Trip.find(filters).limit(limit).skip(offset);
        const response = { trips };
        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports.post = async (req, res) => {
    try {
        const { readings } = req.body;

        const tripObject = functions.composeTrip(readings);

        const newTrip = new Trip(tripObject);
        newTrip.save(function (err, obj) {
            if (err) {
                throw "Ocurrió un error durante el registro";
            }
            res.json(obj);
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
