
import React from 'react';
import { BadgeCheck, Clock, ShieldCheck, ShoppingBag, Plane } from 'lucide-react';
import { formatCurrency, formatTime, formatDuration } from '../utils/flightUtils';

const AirlineLogo = ({ code, name }) => {
    // Simple color mapping for common airlines
    const colors = {
        AI: 'bg-orange-100 text-orange-600',
        '6E': 'bg-blue-100 text-blue-600',
        QP: 'bg-purple-100 text-purple-600',
        UK: 'bg-indigo-100 text-indigo-600',
        SG: 'bg-red-100 text-red-600',
        default: 'bg-gray-100 text-gray-600',
    };

    const style = colors[code] || colors.default;

    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${style} font-bold text-sm shrink-0`}>
            {code}
        </div>
    );
};

const FlightCard = ({ flight }) => {
    const { airline, flightNumber, departure, arrival, duration, stops, price, segments } = flight;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 mb-4 group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Left: Airline Info & Flight Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                        <AirlineLogo code={airline.code} name={airline.name} />
                        <div>
                            <h3 className="font-bold text-slate-800 text-base">{airline.name}</h3>
                            <p className="text-xs text-slate-500 font-medium">{flightNumber}</p>
                        </div>
                        {flight.isCheapest && ( // Example of conditional badge if implemented
                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-2">Cheapest</span>
                        )}
                    </div>

                    <div className="flex items-center gap-8 md:gap-12">
                        {/* Departure */}
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-800">{formatTime(departure.time)}</span>
                            <span className="text-sm text-slate-500 font-medium">{departure.code}</span>
                        </div>

                        {/* Duration / Stops Visual */}
                        <div className="flex flex-col items-center flex-1 max-w-[120px]">
                            <span className="text-xs text-slate-500 font-medium mb-1">{formatDuration(duration)}</span>
                            <div className="relative w-full flex items-center">
                                <div className="h-[2px] w-full bg-slate-200 rounded-full"></div>
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1">
                                    {stops === 0 ? (
                                        <Plane className="w-3 h-3 text-slate-300 rotate-90" />
                                    ) : (
                                        <div className="flex gap-1">
                                            {[...Array(stops)].map((_, i) => (
                                                <div key={i} className="w-2 h-2 rounded-full border-2 border-slate-300 bg-white" title={`Stop ${i + 1}`}></div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium mt-1">
                                {stops === 0 ? 'Non-stop' : `${stops} Stop${stops > 1 ? 's' : ''}`}
                            </span>
                        </div>

                        {/* Arrival */}
                        <div className="flex flex-col text-right">
                            <span className="text-xl font-bold text-slate-800">{formatTime(arrival.time)}</span>
                            <span className="text-sm text-slate-500 font-medium">{arrival.code}</span>
                        </div>
                    </div>
                </div>

                {/* Divider on mobile */}
                <div className="h-[1px] w-full bg-slate-100 md:hidden my-2"></div>

                {/* Right: Price & CTA */}
                <div className="w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-3 md:gap-1 min-w-[140px]">
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-slate-900">{formatCurrency(price)}</span>
                        <span className="text-xs text-slate-500 font-medium">per adult</span>
                    </div>

                    <button className="w-full md:w-auto mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-transform active:scale-95 group-hover:bg-indigo-700">
                        Select
                    </button>
                </div>
            </div>

            {/* Optional: Expanded details or badges */}
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" />
                    <span>Cabin: 7 kg</span>
                </div>
                <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Check-in: 15 kg</span>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
