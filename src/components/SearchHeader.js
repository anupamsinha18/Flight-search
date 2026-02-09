
import React from 'react';
import { Plane, Calendar, User, ArrowRight } from 'lucide-react';

const SearchHeader = () => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    {/* Use strict mode for layout/alignment */}
                    <div className="flex items-center gap-4 bg-gray-50 rounded-full px-6 py-3 border border-gray-100 shadow-inner w-full md:w-auto">

                        {/* Source - Dest */}
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">From</span>
                                <span className="text-lg font-bold text-slate-800">DEL</span>
                                <span className="text-xs text-gray-400 truncate max-w-[80px]">Delhi</span>
                            </div>

                            <div className="flex items-center justify-center p-2">
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">To</span>
                                <span className="text-lg font-bold text-slate-800">BLR</span>
                                <span className="text-xs text-gray-400 truncate max-w-[80px]">Bangalore</span>
                            </div>
                        </div>

                        {/* Mobile Divider & Compact Info */}
                        <div className="h-8 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>
                        <div className="md:hidden w-full h-[1px] bg-gray-100 my-2"></div>

                        {/* Date & Passengers - Responsive */}
                        <div className="flex flex-row md:flex-col justify-between md:justify-start w-full md:w-auto items-center md:items-start gap-4 md:gap-0">
                            {/* Date */}
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider hidden md:block">Departure</span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    <span className="text-sm font-semibold text-slate-700">31 Jan 2026</span>
                                </div>
                            </div>

                            <div className="h-8 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>

                            {/* Passengers */}
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider hidden md:block">Travelers</span>
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-indigo-500" />
                                    <span className="text-sm font-semibold text-slate-700">1 Adult, Economy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                        <Plane className="w-4 h-4 fill-current" />
                        <span>Modify Search</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
