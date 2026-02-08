
import flightData from '../data/flights.json';

// Airline Code Map (Since API only provides codes)
const AIRLINES = {
    AI: 'Air India',
    '6E': 'IndiGo',
    QP: 'Akasa Air',
    UK: 'Vistara',
    SG: 'SpiceJet',
    G8: 'Go First',
};

/**
 * Normalizes the raw flight data into a flat array of flight objects.
 * @returns {Array} Array of normalized flight objects.
 */
export const getAllFlights = () => {
    const sectors = flightData?.result?.sectors;
    if (!sectors) return [];

    let allFlights = [];

    // Iterate over each sector (e.g., DEL-BLR on a specific date)
    Object.values(sectors).forEach((sectorData) => {
        // Iterate over each flight option in the sector
        Object.values(sectorData).forEach((flightOption) => {
            const { flights, otherDetails, fares, flUnqiueId } = flightOption;

            // We assume the first fare option is the one to display for the listing price
            const price = fares?.[0]?.price?.pricePerAdult
                ? parseFloat(fares[0].price.pricePerAdult)
                : 0;

            // Extract segment details
            const segments = flights.map(f => ({
                airlineCode: f.airlineCode,
                airlineName: AIRLINES[f.airlineCode] || f.airlineCode,
                flightNumber: f.fltNo,
                departure: {
                    code: f.departureAirport.code,
                    time: f.departureAirport.time,
                    city: f.departureAirport.city || f.departureAirport.code // API might not have city name directly in segment
                },
                arrival: {
                    code: f.arrivalAirport.code,
                    time: f.arrivalAirport.time,
                    city: f.arrivalAirport.city || f.arrivalAirport.code
                },
                duration: f.durationInMin,
                stops: f.stops ? 1 : 0 // If "stops" is an object, it's a stop. If false, it's non-stop.
            }));

            // Calculate total duration across all segments + layovers
            // The API provides `otherDetails.duration` sometimes, but let's sum it up if needed.
            // However, usually `otherDetails` has summary info. Let's check `otherDetails` fields.
            // The sample JSON `otherDetails` has `totalStops`, not total duration explicitly.
            // But let's look at the segment durations.

            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];

            const startTime = new Date(firstSegment.departure.time);
            const endTime = new Date(lastSegment.arrival.time);
            const totalDurationMin = (endTime - startTime) / (1000 * 60);

            const flight = {
                id: flUnqiueId,
                airline: {
                    name: AIRLINES[firstSegment.airlineCode] || firstSegment.airlineCode,
                    code: firstSegment.airlineCode,
                    logo: `/logos/${firstSegment.airlineCode}.png` // Fallback logic in UI
                },
                flightNumber: `${firstSegment.airlineCode}-${firstSegment.flightNumber}`,
                departure: {
                    code: firstSegment.departure.code,
                    time: firstSegment.departure.time,
                },
                arrival: {
                    code: lastSegment.arrival.code,
                    time: lastSegment.arrival.time,
                },
                duration: totalDurationMin,
                stops: otherDetails.totalStops || 0,
                price: price,
                segments: segments,
            };

            allFlights.push(flight);
        });
    });

    return allFlights;
};

/**
 * Format duration in minutes to "2h 45m"
 */
export const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
};

/**
 * Format timestamp to "HH:MM"
 */
export const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};
