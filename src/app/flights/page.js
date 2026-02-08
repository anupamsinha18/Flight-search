
'use client';

import React from 'react';
import { SearchProvider } from '../../context/SearchContext';
import SearchHeader from '../../components/SearchHeader';
import FilterSidebar from '../../components/FilterSidebar';
import FlightList from '../../components/FlightList';

export default function FlightSearchPage() {
    return (
        <SearchProvider>
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
                <SearchHeader />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">

                        {/* Sidebar */}
                        <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block sticky top-24">
                            <FilterSidebar />
                        </aside>

                        {/* Mobile Filter Toggle (Visible only on mobile) */}
                        <div className="lg:hidden w-full mb-4">
                            <details className="group">
                                <summary className="list-none flex justify-between items-center font-medium cursor-pointer bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <span>Show Filters</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                        </svg>
                                    </span>
                                </summary>
                                <div className="text-gray-500 mt-2 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                    <FilterSidebar />
                                </div>
                            </details>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 w-full min-w-0">
                            <FlightList />
                        </div>
                    </div>
                </main>
            </div>
        </SearchProvider>
    );
}
