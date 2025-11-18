# CADETOPS // MISSION CONTROL

A terminal-style cyber tactical readiness and skills training platform built with modern web technologies.

## Features

- **Terminal Interface**: Authentic command-line style interface for mission control operations
- **Personnel Management**: Access and manage personnel files
- **Training Modules**: Interactive training programs for cyber operations
- **Mission Briefing**: Detailed mission planning and execution tools
- **Tactical Radar**: Real-time skill heatmap and performance tracking
- **Secure Operations**: Encrypted communications and secure session management

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd cadetops-command
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── NavLink.tsx     # Navigation component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Application pages/routes
│   ├── Index.tsx       # Main mission control dashboard
│   ├── PersonnelFile.tsx
│   ├── TrainingModules.tsx
│   ├── MissionBriefing.tsx
│   ├── TacticalRadar.tsx
│   └── NotFound.tsx
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

This project uses ESLint for code linting and follows TypeScript best practices. The UI components are built using shadcn/ui with Tailwind CSS for styling.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Security

This application implements secure session management and encrypted communications. For security-related issues, please contact the development team directly.
