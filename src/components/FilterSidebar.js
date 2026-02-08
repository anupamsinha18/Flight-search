
import React from 'react';
import { useSearch } from '../context/SearchContext';
import { formatCurrency } from '../utils/flightUtils';

const FilterSidebar = () => {
    const { filters, updateFilters, flights } = useSearch();

    // Extract unique airlines from flights for the filter options
    const uniqueAirlines = React.useMemo(() => {
        const map = new Map();
        flights.forEach(f => {
            if (!map.has(f.airline.code)) {
                map.set(f.airline.code, f.airline.name);
            }
        });
        return Array.from(map.entries());
    }, [flights]);

    // Handlers
    const handleStopChange = (stopCount) => {
        const currentStops = filters.stops;
        let newStops;
        if (currentStops.includes(stopCount)) {
            newStops = currentStops.filter(s => s !== stopCount);
        } else {
            newStops = [...currentStops, stopCount];
        }
        updateFilters('stops', newStops);
    };

    const handleAirlineChange = (code) => {
        const currentAirlines = filters.airlines;
        let newAirlines;
        if (currentAirlines.includes(code)) {
            newAirlines = currentAirlines.filter(c => c !== code);
        } else {
            newAirlines = [...currentAirlines, code];
        }
        updateFilters('airlines', newAirlines);
    };

    const handleTimeChange = (bucket) => {
        const currentTimes = filters.departureTime;
        let newTimes;
        if (currentTimes.includes(bucket)) {
            newTimes = currentTimes.filter(t => t !== bucket);
        } else {
            newTimes = [...currentTimes, bucket];
        }
        updateFilters('departureTime', newTimes);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Filters</h2>

            {/* Stops */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Stops</h3>
                <div className="space-y-2">
                    {[0, 1, 2].map(stop => (
                        <label key={stop} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                checked={filters.stops.includes(stop)}
                                onChange={() => handleStopChange(stop)}
                            />
                            <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
                                {stop === 0 ? 'Non-stop' : `${stop} Stop${stop > 1 ? 's' : ''}`}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Slider */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-slate-700">Price</h3>
                    <span className="text-xs font-bold text-indigo-600">
                        Up to {formatCurrency(filters.maxPrice)}
                    </span>
                </div>
                <input
                    type="range"
                    min="0"
                    max={Math.max(...flights.map(f => f.price), 50000) || 50000}
                    step="500"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilters('maxPrice', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
            </div>

            {/* Departure Time */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Departure Time</h3>
                <div className="grid grid-cols-2 gap-2">
                    {['Before 6 AM', '6 AM - 12 PM', '12 PM - 6 PM', 'After 6 PM'].map(bucket => (
                        <button
                            key={bucket}
                            onClick={() => handleTimeChange(bucket)}
                            className={`text-xs py-2 px-1 rounded-lg border text-center transition-all ${filters.departureTime.includes(bucket)
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                                    : 'bg-white border-gray-200 text-slate-600 hover:border-gray-300'
                                }`}
                        >
                            {bucket}
                        </button>
                    ))}
                </div>
            </div>

            {/* Airlines */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Airlines</h3>
                <div className="space-y-2">
                    {uniqueAirlines.map(([code, name]) => (
                        <label key={code} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                checked={filters.airlines.includes(code)}
                                onChange={() => handleAirlineChange(code)}
                            />
                            <span className="text-sm text-slate-600 group-hover:text-indigo-600 transition-colors">
                                {name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
