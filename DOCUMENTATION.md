# Flight Search Module Documentation

## 1. Project Overview
This project is a **Flight Search Module** built with **Next.js** and **Tailwind CSS**. It provides a responsive interface for users to search for flights, filter results based on various criteria (stops, airline, price, time), and sort the available options.

## 2. Technology Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **State Management:** React Context API (`SearchContext`)

## 3. Key Components

### 3.1 Core Architecture
- **`src/app/flights/page.js`**: The main entry point for the flight search page. It wraps the content in `SearchProvider` and lays out the `SearchHeader`, `FilterSidebar`, and `FlightList`.
- **`src/context/SearchContext.js`**: Centralized state management.
    - Manages `flights` (raw data) and `filteredFlights` (processed data).
    - Handles filter logic (Price, Stops, Airlines, Departure Time).
    - Handles sorting logic (Price, Duration, Departure Time).

### 3.2 UI Components
- **`SearchHeader.js`**: Displays route information (e.g., DEL -> BLR) and travel details.
- **`FilterSidebar.js`**: A sticky sidebar containing filter controls.
    - **Stops**: Checkbox filter for non-stop, 1 stop, 2+ stops.
    - **Price**: Range slider to filter by maximum price.
    - **Departure Time**: Button toggles for time of day buckets.
    - **Airlines**: Dynamic checkbox list based on available airline data.
- **`FlightList.js`**: Renders the list of filtered flights.
    - Implements **Pagination** (client-side).
    - Includes a **Sort Dropdown**.
    - Displays a "No flights found" state when filters are too restrictive.
- **`FlightCard.js`**: A reusable card component for individual flight details.
    - Displays airline logo, route, timing, duration, and price.
    - Features a "glassmorphism" design with hover effects.

## 4. Data Flow
1.  **Initialization**: `SearchContext` loads raw flight data from `src/utils/flightUtils.js` (mock data `sample (2).json`) on mount.
2.  **Filtering**: Whenever `filters` state changes, `useEffect` in `SearchContext` re-runs to update `filteredFlights`.
3.  **Sorting**: Sorting logic is applied immediately after filtering.
4.  **rendering**: `FlightList` subscribes to `filteredFlights` and renders the current page of results.

## 5. Setup & Running
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Open in Browser**:
    Navigate to `http://localhost:3000/flights` to view the search module.

## 6. Future Improvements (Pending)
-   **Dynamic Search**: Connect `SearchHeader` inputs to the search context to allow changing routes/dates.
-   **Real API**: Replace mock data with real flight search API integration.
-   **Responsive Polish**: Further refinement for mobile-specific views.
