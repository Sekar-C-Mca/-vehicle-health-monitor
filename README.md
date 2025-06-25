# Vehicle Health Monitor - Frontend Demo

A beautiful, production-ready vehicle health monitoring dashboard built with React, TypeScript, and Tailwind CSS. This is a **frontend-only demo** that uses simulated data and local storage.

## Features

- **Real-time Simulation**: Auto-refreshes every 10 seconds with simulated data changes
- **Local Data Storage**: Uses browser localStorage to persist data between sessions
- **Search & Filter**: Filter vehicles by Vehicle ID
- **Status Tracking**: Color-coded badges for Normal, Warning, and Risk statuses
- **Responsive Design**: Works perfectly on all device sizes
- **Beautiful UI**: Production-ready design with smooth animations and micro-interactions
- **Mock Data Generation**: Built-in sample data generation functionality

## Demo Mode

This application runs entirely in the browser without any backend dependencies:

- **Simulated Real-time Updates**: Data automatically changes every 10 seconds to simulate live monitoring
- **Local Storage**: All data is stored in your browser's localStorage
- **Mock API**: Simulates API calls with realistic delays and responses
- **Sample Data**: Generate fresh sample data anytime with the "Generate Data" button

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

4. **Generate sample data:**
   Click the "Generate Data" button to populate the dashboard with sample vehicle data

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── HomePage.tsx     # Landing page with animations
│   ├── VehicleTable.tsx # Data table component
│   └── StatusBadge.tsx  # Status indicator component
├── services/
│   └── vehicleApi.ts    # Mock API service with localStorage
├── types/
│   └── vehicle.ts       # TypeScript type definitions
└── App.tsx             # Main application component
```

## Data Structure

The application simulates vehicle health data with the following structure:

```typescript
interface VehicleData {
  _id: string;            // Unique identifier
  vehicleId: string;      // Vehicle ID (e.g., "VH-001")
  temperature: number;    // Temperature in Celsius
  vibration: number;      // Vibration level (0-10)
  aiStatus: string;       // "Normal", "Warning", or "Risk"
  timestamp: Date;        // When the data was recorded
}
```

## Features in Detail

### Real-time Simulation
- Data automatically updates every 10 seconds
- Temperature and vibration values change slightly to simulate real sensors
- AI status updates based on the new sensor values
- Visual indicators show when data is being refreshed

### Local Storage
- All data persists between browser sessions
- No external database required
- Data is automatically saved when changes are made
- Fresh sample data can be generated anytime

### Responsive Design
- Mobile-first design approach
- Optimized for tablets and desktop
- Touch-friendly interface elements
- Smooth animations and transitions

### Search and Filtering
- Real-time search by Vehicle ID
- Case-insensitive partial matching
- Instant results as you type
- Clear visual feedback

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **GSAP** - High-performance animations
- **Lucide React** - Beautiful icon library

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

- Optimized bundle size
- Lazy loading where appropriate
- Efficient re-rendering with React hooks
- Smooth 60fps animations

## Customization

The application is highly customizable:

- **Colors**: Modify the Tailwind color palette
- **Data**: Adjust the mock data generation logic
- **Animations**: Customize GSAP animations in HomePage
- **Layout**: Responsive grid system is easily adjustable

## Future Enhancements

This demo could be extended with:

- Real backend integration
- User authentication
- Data export functionality
- Advanced filtering options
- Charts and graphs
- Push notifications
- PWA capabilities

## License

This project is for demonstration purposes.