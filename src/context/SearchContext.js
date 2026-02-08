
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getAllFlights } from '../utils/flightUtils';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('price_asc'); // price_asc, price_desc, duration_asc, etc.

    // Filters State
    const [filters, setFilters] = useState({
        maxPrice: 50000,
        stops: [], // [0, 1, 2]
        airlines: [], // ['AI', '6E', ...]
        departureTime: [], // ['morning', 'afternoon', ...] 
    });

    // Initial Data Load
    useEffect(() => {
        // Simulate API call
        const loadData = async () => {
            setLoading(true);
            try {
                // Wait, getAllFlights() imports the JSON directly.
                // We can just call the utility.
                const allFlights = getAllFlights();
                setFlights(allFlights);
                setFilteredFlights(allFlights);

                // Set max price for slider dynamically
                const max = Math.max(...allFlights.map(f => f.price));
                setFilters(prev => ({ ...prev, maxPrice: max }));
            } catch (error) {
                console.error("Failed to load flights", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = [...flights];

        // 1. Price Filter
        result = result.filter(f => f.price <= filters.maxPrice);

        // 2. Stops Filter
        if (filters.stops.length > 0) {
            result = result.filter(f => filters.stops.includes(f.stops));
        }

        // 3. Airline Filter
        if (filters.airlines.length > 0) {
            result = result.filter(f => filters.airlines.includes(f.airline.code));
        }

        // 4. Departure Time Filter
        if (filters.departureTime.length > 0) {
            result = result.filter(f => {
                const hour = new Date(f.departure.time).getHours();
                return filters.departureTime.some(t => {
                    if (t === 'Before 6 AM') return hour < 6;
                    if (t === '6 AM - 12 PM') return hour >= 6 && hour < 12;
                    if (t === '12 PM - 6 PM') return hour >= 12 && hour < 18;
                    if (t === 'After 6 PM') return hour >= 18;
                    return false;
                });
            });
        }

        // Sort Logic
        if (sortBy === 'price_asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'duration_asc') {
            result.sort((a, b) => a.duration - b.duration);
        } else if (sortBy === 'duration_desc') {
            result.sort((a, b) => b.duration - a.duration);
        } else if (sortBy === 'departure_asc') {
            result.sort((a, b) => new Date(a.departure.time) - new Date(b.departure.time));
        } else if (sortBy === 'departure_desc') {
            result.sort((a, b) => new Date(b.departure.time) - new Date(a.departure.time));
        }


        setFilteredFlights(result);
    }, [flights, filters, sortBy]);

    const updateFilters = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SearchContext.Provider
            value={{
                flights,
                filteredFlights,
                loading,
                filters,
                updateFilters,
                sortBy,
                setSortBy
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
