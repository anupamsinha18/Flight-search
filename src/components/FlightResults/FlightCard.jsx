"use client";

const FlightCard = ({ flight, index = 0 }) => {
    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        const date = new Date(timeStr);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const calculateDuration = (min) => {
        const h = Math.floor(min / 60);
        const m = min % 60;
        return `${h}h ${m}m`;
    };


    const { flights, otherDetails, fares } = flight || {};

    if (!flights || !otherDetails) return null;

    const firstFlight = flights[0];
    const lastFlight = flights[flights.length - 1];
    const airlineCode = firstFlight.airlineCode;
    const displayPrice = otherDetails.lowestPrice;
    const stopsCount = flights.length - 1;


    const airlineLogoUrl = `https://placehold.co/50x50/2563eb/white?text=${airlineCode}`;

    return (
        <div
            className="glass-card rounded-3xl p-6 mb-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] group border border-white/60 relative overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
        >

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-500/10 transition-colors"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">

                {/* Airline Info */}
                <div className="flex items-center gap-5 min-w-[160px]">
                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:border-blue-100 transition-colors">
                        <img
                            src={airlineLogoUrl}
                            alt={airlineCode}
                            className="w-10 h-10 object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">{otherDetails.airline.join(' + ')}</h3>
                        <p className="text-xs text-gray-400 font-bold tracking-wider mt-1">{firstFlight.fltNo}</p>
                    </div>
                </div>

                {/* Schedule Info */}
                <div className="flex-1 flex items-center justify-center gap-4 md:gap-12 w-full md:w-auto">
                    <div className="text-left min-w-[80px]">
                        <p className="text-2xl font-black text-gray-800">{formatTime(firstFlight.departureAirport.time)}</p>
                        <p className="text-sm text-gray-500 font-semibold">{firstFlight.departureAirport.code}</p>
                    </div>

                    <div className="flex flex-col items-center w-full max-w-[180px] relative">
                        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">{calculateDuration(flights.reduce((acc, f) => acc + f.durationInMin, 0))}</p>
                        <div className="w-full h-1 bg-gray-100 rounded-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-gray-200 via-blue-200 to-gray-200 opacity-30"></div>
                            {/* Dots */}
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-white"></div>
                            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-white"></div>
                        </div>
                        {/* Centered Plane */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] bg-white p-1 rounded-full border border-gray-100 shadow-sm">
                            <svg className="w-4 h-4 text-blue-500 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </div>
                        <p className={`text-xs font-bold mt-2 px-3 py-1 rounded-full ${stopsCount === 0 ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
                            {stopsCount === 0 ? 'Non-stop' : `${stopsCount} Stop${stopsCount > 1 ? 's' : ''}`}
                        </p>
                    </div>

                    <div className="text-right min-w-[80px]">
                        <p className="text-2xl font-black text-gray-800">{formatTime(lastFlight.arrivalAirport.time)}</p>
                        <p className="text-sm text-gray-500 font-semibold">{lastFlight.arrivalAirport.code}</p>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 md:gap-2 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
                    <div className="text-left md:text-right">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Price per adult</p>
                        <p className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                            ₹{Math.round(displayPrice).toLocaleString()}
                        </p>
                    </div>
                    <button className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group/btn">
                        Select Flight
                        <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FlightCard;
