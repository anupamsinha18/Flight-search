"use client";

import FlightCard from './FlightCard';

const FlightResults = ({ flights }) => {
    // flights is expected to be an array of flight objects (values of sectors)

    if (!flights || flights.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 glass rounded-3xl border border-dashed border-gray-300/50">
                <div className="text-6xl mb-4 opacity-50">✈️</div>
                <h3 className="text-xl font-bold text-gray-700">No flights found</h3>
                <p className="text-gray-500">Try adjusting your search filters to find available flights.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-2 px-2">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    Available Flights
                    <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{flights.length}</span>
                </h2>
                <div className="flex gap-3 items-center">
                    <span className="text-sm font-semibold text-gray-400">Sort:</span>
                    <div className="relative">
                        <select className="appearance-none bg-white border border-gray-200 text-sm font-bold text-gray-700 rounded-xl pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm hover:border-blue-200 transition-colors">
                            <option>Cheapest First</option>
                            <option>Fastest First</option>
                            <option>Earliest Departure</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {flights.map((flight) => (
                    <FlightCard key={flight.flUnqiueId} flight={flight} />
                ))}
            </div>
        </div>
    );
};

export default FlightResults;
