module.exports.composeTrip = (readings) => {
    const firstReading = readings[0];
    const lastReading = readings[readings.length - 1];

    //pendiente la busqueda del nombre segun coordenadas
    const start = {
        time: firstReading.time,
        lat: firstReading.location?.lat,
        lon: firstReading.location?.lon,
    };

    const end = {
        time: lastReading.time,
        lat: lastReading.location?.lat,
        lon: lastReading.location?.lon,
    };

    const duration = getDuration(firstReading.time, lastReading.time);

    const distance = getDistance(readings);

    const overspeedsCount = getOverspeedsCount(readings);

    const boundingBox = getBoundingBox(readings);

    const trip = {
        start,
        end,
        duration,
        distance,
        overspeedsCount,
        boundingBox,
    };

    return trip;
};

const getDuration = (startTime, endTime) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const duration = endDate.getTime() - startDate.getTime();

    return duration;
};

const getOverspeedsCount = (readings) => {
    let count = 0;
    let consecutiveActive = false;
    readings.forEach((reading) => {
        if (reading.speed > reading.speedLimit) {
            if (!consecutiveActive) {
                count++;
                consecutiveActive = true;
            }
        } else {
            consecutiveActive = false;
        }
    });

    return count;
};

const getBoundingBox = (readings) => {
    const boundingBox = readings.slice(1, readings.length - 1);

    return boundingBox.map((reading) => {
        return {
            lat: reading.location?.lat,
            lon: reading.location?.lon,
        };
    });
};

const getDistance = (readings) => {
    let distance = 0;

    for (let i = 0; i < readings.length; i++) {
        if (i < readings.length - 1) {
            distance += getDistanceOfPoints(
                readings[i].location,
                readings[i + 1].location
            );
        }
    }

    return Math.round(distance * 10) / 10;
}

const getDistanceOfPoints = (location1, location2) => {
    const { lat: lat1, lon: lon1 } = location1;
    const { lat: lat2, lon: lon2 } = location2;

    // Calculo de distancia basado en fórmula de Haversine
    rad = function (x) {
        return (x * Math.PI) / 180;
    };
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c; //calculo de distancia en km

    return d;
}

module.exports.normalizeParams = (params) =>{

    const {start_gte, start_lte, distance_gte, limit: limitQuery, offset: offsetQuery } = params;

    const limit = limitQuery? +limitQuery : 20;
    const offset = offsetQuery? (+offsetQuery)*limit : 0;

    return {
        start_gte,
        start_lte,
        distance_gte,
        limit,
        offset
    };
}