# Flight Search Module

A Next.js application that implements a robust Flight Search and Listing module. It features a responsive UI, complex filtering logic, and state management using React Context.

## Features

- **Search Results**: Display flights parsed from a normalized JSON structure.
- **Filtering**:
  - Stops: Non-stop, 1 stop, 2+ stops.
  - Price: Up to a maximum limit.
  - Airlines: Filter by carrier.
  - Departure Time: Buckets (Morning, Afternoon, Evening, Night).
- **Sorting**:
  - Price: Low to High / High to Low.
  - Duration: Shortest / Longest.
  - Departure: Earliest / Latest.
- **Mock Data**: Uses `src/data/flights.json` to simulate API responses.
- **Responsive Design**: Mobile-friendly layout with collapsible filters.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Icons**: Lucide React

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/flights](http://localhost:3000/flights) to view the search module.

## Architecture

### Data Layer
The application normalizes the raw, nested JSON structure (Journeys -> Sectors -> Flights) into a flat array of `Flight` objects using `src/utils/flightUtils.js`. This ensures the UI components receive clean, predictable data.

### State Management
`SearchContext` (`src/context/SearchContext.js`) manages the global state for:
- `flights`: The master list of all available flights.
- `filteredFlights`: The subset of flights displayed based on active filters.
- `filters`: An object tracking criteria like stops, price, and airlines.
- `sortBy`: The current sorting preference.

### Component Structure
- `FlightSearchPage` (`src/app/flights/page.js`): The main entry point that composes the layout.
- `SearchHeader`: Displays trip details (Source, Destination, Date).
- `FilterSidebar`: Contains all filter controls.
- `FlightList`: Renders the grid of `FlightCard` components and handles pagination.
- `FlightCard`: Displays individual flight details such as airline, duration, stops, and price.

## JSON Structure

 The input JSON is normalized:
- **Journeys**: Represents the full trip.
- **Sectors**: Represents Origin-Destination combinations.
- **Flights**: Contains flight segments and details.
- **Fares**: Contains pricing information.

The utility function `getAllFlights` traverses this structure to extract and format the data for the frontend.
# Flight-search
