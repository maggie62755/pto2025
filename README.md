# 🚀 Let's Have Launch - Space Journey Game

An interactive space-themed board game built with React and Vite. Embark on an exciting journey through the solar system, encountering various planets, cosmic events, and challenges along the way!

## 🎮 Game Overview

**Let's Have Launch** is a turn-based adventure game where players navigate through a 36-cell game board, exploring different locations in space while managing their budget. Roll the dice, visit exotic planets, encounter asteroids, traverse wormholes, and complete your cosmic journey!

### Features

- 🎲 **Dice-Based Movement**: Roll the dice to move across the game board
- 🌌 **Dynamic Space Theme**: Beautiful nebula background with animated starfield
- 🪐 **Multiple Locations**: Visit various planets and cosmic locations
- ⚡ **Special Events**: 
  - **Asteroids**: Unexpected obstacles that affect your journey
  - **Wormholes**: Mysterious portals that transport you across the board
- 💰 **Budget Management**: Keep track of your resources throughout the game
- 📊 **Journey Statistics**: Track visited locations, asteroid hits, and wormhole entries
- 🎨 **Modern UI/UX**: Clean, futuristic interface with smooth animations

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS3** - Custom animations and responsive design
- **Google Fonts** - Orbitron, Exo 2, and Roboto font families

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pto2025
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🎯 How to Play

1. **Login**: Enter your player name and starting budget
2. **Roll the Dice**: Click the dice button to roll and move forward
3. **Explore Locations**: Land on different cells to discover planets and activities
4. **Manage Budget**: Keep an eye on your remaining budget
5. **Special Events**:
   - Landing on an **Asteroid** may affect your journey
   - Entering a **Wormhole** will teleport you to another location
6. **Win Condition**: Reach the final cell (Cell 36) to complete the journey
7. **Game Over**: The game ends if you run out of budget

## 🎨 Key Features

### Modular Architecture
- Custom hooks for game logic (`useDiceRoll`)
- Reusable components for UI elements
- Centralized constants and utilities
- Clean separation of concerns

### Responsive Design
- Adapts to different screen sizes
- Mobile-friendly interface
- Smooth animations and transitions

### Game Statistics
The Game Over modal displays:
- Final position and remaining budget
- Number of asteroid hits
- Number of wormhole entries
- Complete journey timeline with visited locations

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses ESLint for code quality. Configuration can be found in `eslint.config.js`.

## 📦 Dependencies

### Production
- `react` & `react-dom` - Core React library
- `react-router-dom` - Routing
- `react-dice-roll` - Dice animation component
- `react-icons` - Icon library
- `prop-types` - Runtime type checking

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Linting

## 🎨 Design Credits

- **Fonts**: Orbitron, Exo 2, Roboto, Roboto Mono (Google Fonts)
- **Theme**: Space exploration with futuristic aesthetics
- **Color Palette**: Deep blues, golds, and cosmic gradients

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

**Enjoy your space adventure! 🚀✨**
