module.exports.validateReadings = (req, res, next) => {
    try {
        const { readings } = req.body;

        if (!readings) {
            throw { message: "Readings is required.", status: 400 };
        }

        if (!Array.isArray(readings)) {
            throw {
                message: "Readings is not have de format correct.",
                status: 400,
            };
        }

        if (readings.length < 5) {
            throw { message: "At least 5 readings are required.", status: 400 };
        }

        if (
            readings.filter((reading) => reading.time === undefined).length > 0
        ) {
            throw {
                message: "All readings must have the time property.",
                status: 400,
            };
        }

        next();
        
    } catch (error) {
        res.status(error.status).json({
            message: error.message,
        });
    }
};
