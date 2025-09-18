# FleetLink Frontend

A modern React-based frontend for the FleetLink vehicle management system, built with Vite, Tailwind CSS, and Framer Motion.

## Features

- **Vehicle Management**: Add new vehicles to the fleet
- **Smart Search**: Find available vehicles based on capacity, location, and timing
- **Booking System**: Intuitive vehicle booking interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Enhanced user experience with Framer Motion

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Date Handling**: date-fns & React Datepicker
- **Linting**: ESLint

## Installation

1. Navigate to the frontend directory:
```bash
cd fleetlink/frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Linting

Check code quality with ESLint:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddVehicleForm.jsx
│   ├── SearchForm.jsx
│   ├── VehicleList.jsx
│   └── BookingConfirmation.jsx
├── pages/              # Page components
│   ├── AddVehiclePage.jsx
│   └── SearchBookPage.jsx
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## Backend Integration

The frontend connects to the FleetLink backend API. Make sure the backend server is running on `http://localhost:5000` or update the API base URL in your API service files.

## Environment Variables

Create a `.env` file in the frontend directory for environment-specific variables:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.
