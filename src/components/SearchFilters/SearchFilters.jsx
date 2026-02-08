"use client";

import { useState } from 'react';

const SearchFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        source: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        tripType: 'one-way',
        passengers: 1,
        priceRange: 50000,
        stops: [],
        departureTime: 'any'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        if (onFilterChange) onFilterChange(newFilters);
    };

    const handleStopChange = (stopValue) => {
        const currentStops = [...filters.stops];
        if (currentStops.includes(stopValue)) {
            const index = currentStops.indexOf(stopValue);
            currentStops.splice(index, 1);
        } else {
            currentStops.push(stopValue);
        }
        const newFilters = { ...filters, stops: currentStops };
        setFilters(newFilters);
        if (onFilterChange) onFilterChange(newFilters);
    };

    return (
        <div className="glass p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <span className="p-2 bg-blue-100 rounded-lg text-blue-600">🔍</span> Search Filters
            </h2>

            {/* Trip Type */}
            <div className="flex p-1 bg-gray-100 rounded-xl w-full mb-6">
                <button
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${filters.tripType === 'one-way' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => {
                        const newFilters = { ...filters, tripType: 'one-way' };
                        setFilters(newFilters);
                        if (onFilterChange) onFilterChange(newFilters);
                    }}
                >
                    One-way
                </button>
                <button
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${filters.tripType === 'round-trip' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => {
                        const newFilters = { ...filters, tripType: 'round-trip' };
                        setFilters(newFilters);
                        if (onFilterChange) onFilterChange(newFilters);
                    }}
                >
                    Round-trip
                </button>
            </div>

            <div className="space-y-6">
                {/* Source & Destination */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">From</label>
                        <div className="relative transform transition-all group-hover:scale-[1.02]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🛫</span>
                            <input
                                type="text"
                                name="source"
                                value={filters.source}
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none font-semibold text-gray-700 placeholder-gray-400 shadow-sm"
                                placeholder="Origin City"
                            />
                        </div>
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">To</label>
                        <div className="relative transform transition-all group-hover:scale-[1.02]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🛬</span>
                            <input
                                type="text"
                                name="destination"
                                value={filters.destination}
                                onChange={handleInputChange}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all outline-none font-semibold text-gray-700 placeholder-gray-400 shadow-sm"
                                placeholder="Destination City"
                            />
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Depart</label>
                        <input
                            type="date"
                            name="departureDate"
                            value={filters.departureDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-semibold text-gray-700 shadow-sm"
                        />
                    </div>
                    {filters.tripType === 'round-trip' && (
                        <div className="animate-fade-in">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Return</label>
                            <input
                                type="date"
                                name="returnDate"
                                value={filters.returnDate}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-semibold text-gray-700 shadow-sm"
                            />
                        </div>
                    )}
                </div>

                {/* Passengers */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Travelers</label>
                    <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                        <span className="text-sm font-medium text-gray-500 ml-2">Passengers</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    const newVal = Math.max(1, filters.passengers - 1);
                                    const newFilters = { ...filters, passengers: newVal };
                                    setFilters(newFilters);
                                    if (onFilterChange) onFilterChange(newFilters);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                -
                            </button>
                            <span className="font-bold text-gray-800 w-4 text-center">{filters.passengers}</span>
                            <button
                                onClick={() => {
                                    const newVal = filters.passengers + 1;
                                    const newFilters = { ...filters, passengers: newVal };
                                    setFilters(newFilters);
                                    if (onFilterChange) onFilterChange(newFilters);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">Max Price</label>
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">₹{filters.priceRange}</span>
                    </div>
                    <input
                        type="range"
                        name="priceRange"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.priceRange}
                        onChange={handleInputChange}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-600"
                    />
                </div>

                {/* Stops */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Stops</label>
                    <div className="flex flex-wrap gap-2">
                        {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                            <label key={stop} className={`flex-1 min-w-[80px] cursor-pointer group relative`}>
                                <input
                                    type="checkbox"
                                    checked={filters.stops.includes(stop)}
                                    onChange={() => handleStopChange(stop)}
                                    className="peer sr-only"
                                />
                                <div className="p-2 text-center text-xs font-medium rounded-lg border border-gray-200 text-gray-500 peer-checked:bg-blue-50 peer-checked:border-blue-200 peer-checked:text-blue-600 transition-all hover:bg-gray-50">
                                    {stop}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Time Range */}
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Time</label>
                    <div className="relative">
                        <select
                            name="departureTime"
                            value={filters.departureTime}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-10 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none text-sm font-semibold text-gray-700 appearance-none cursor-pointer shadow-sm"
                        >
                            <option value="any">Any Time</option>
                            <option value="morning">Morning (6AM - 12PM)</option>
                            <option value="afternoon">Afternoon (12PM - 6PM)</option>
                            <option value="evening">Evening (6PM - 12AM)</option>
                            <option value="night">Night (12AM - 6AM)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            ▼
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SearchFilters;
