# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based IP Address Tracker application built with Create React App. The app allows users to track their own IP location or search for specific IP addresses, displaying location information and an interactive map.

## Development Commands

- `npm start` - Run the development server (opens at http://localhost:3000)
- `npm test` - Run tests in watch mode
- `npm run build` - Create production build in `build/` folder
- `npm run eject` - Eject from Create React App (irreversible)

## Architecture & Key Components

### Main App Structure (`src/App.js`)
- **State Management**: Uses React hooks for managing geolocation data, IP information, loading states, and error handling
- **API Integration**: Integrates with IPify API (`geo.ipify.org`) using API key for IP geolocation data
- **Dual Location Sources**: Handles both user's current location (via browser geolocation API) and searched IP addresses
- **Search Functionality**: Supports IP address and domain search with Enter key and button interactions

### Components

#### `src/components/ip-address.jsx`
- **Responsive Layouts**: Three distinct layouts matching Figma designs exactly
  - Mobile: Vertical stack with center-aligned text and 6px gaps
  - Tablet: 2x2 grid layout with divider lines
  - Desktop: Horizontal 4-column layout with precise 213px widths
- Typography follows Figma specifications (10px/12px labels, 20px/26px data)
- Uses Figma color tokens and shadow styles
- Handles loading and error states with consistent styling

#### `src/components/map.jsx`
- Interactive map component using React Leaflet with Figma location icon
- **MapUpdater**: Internal component that updates map view when coordinates change
- Custom marker icon from Figma assets (`icon-location-new.svg`)
- Full-height map layout (`calc(100vh - 280px)`) to match Figma designs
- Fixed default coordinates (New York: 40.7128, -74.0060)

### Styling & UI
- **Tailwind CSS**: Primary styling framework with custom Figma design tokens
- **Custom Font**: Uses 'Rubik' font family with specific weights (Medium, Bold, Regular)
- **Figma Design System**: Integrated with exact colors, typography, and spacing from Figma designs
- **Responsive Design**: Three distinct layouts - Mobile (375px), Tablet (768px), Desktop (1024px+)
- **PostCSS**: Configured with Autoprefixer for cross-browser compatibility
- **Design Assets**: Background patterns and icons sourced directly from Figma

### API Integration
- **IPify API**: Primary geolocation service with API key `at_1ft7vx9dUY4eF9m34x5orKwNBfdMk`
- Endpoints used: `/api/v2/country,city` for both user location and IP search
- Response handling includes fallback values for missing data fields

### Dependencies & Libraries
- **React Leaflet**: Interactive maps with OpenStreetMap tiles
- **Leaflet**: Core mapping functionality
- **Testing Library**: Jest-based testing setup for React components
- **Lodash**: Utility library (version 4.17.21)
- **AJV**: JSON schema validation

## File Structure
- `/src/components/` - Reusable React components
- `/src/images/` - Static image assets (map markers, etc.)
- `/public/` - Static assets including background patterns and icons
- Tailwind config extends base configuration with custom breakpoints and fonts