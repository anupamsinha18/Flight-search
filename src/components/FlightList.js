
import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import FlightCard from './FlightCard';
import { ArrowDownAZ, ArrowUpAZ, Loader2, Frown } from 'lucide-react';

const FlightList = () => {
    const { filteredFlights, loading, sortBy, setSortBy } = useSearch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFlights.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredFlights.length / itemsPerPage);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Searching for best flights...</p>
            </div>
        );
    }

    if (filteredFlights.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center min-h-[300px]">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Frown className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">No flights found</h3>
                <p className="text-slate-500 max-w-md">
                    Adjust your filters to see more results. Try clearing the price or time filters.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Header: Count & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4">
                <h2 className="text-lg font-bold text-slate-800">
                    Showing {filteredFlights.length} Flight{filteredFlights.length !== 1 && 's'}
                </h2>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">Sort by:</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-200 text-slate-700 py-2 pl-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium cursor-pointer"
                        >
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="duration_asc">Duration: Shortest</option>
                            <option value="duration_desc">Duration: Longest</option>
                            <option value="departure_asc">Departure: Earliest</option>
                            <option value="departure_desc">Departure: Latest</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ArrowDownAZ className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {currentItems.map((flight, index) => (
                    <FlightCard key={flight.id} flight={flight} index={index} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:text-indigo-600'
                            }`}
                    >
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                            const page = index + 1;
                            // Simple pagination logic to limit visible pages
                            if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            }
                            if (
                                page === currentPage - 2 ||
                                page === currentPage + 2
                            ) {
                                return <span key={page} className="text-gray-400 px-1">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:text-indigo-600'
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default FlightList;
