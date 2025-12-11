# 🚀 Let's Have Launch (PTO2025)

> An interactive space-themed board game built with modern React. Embark on a journey through the solar system, managing resources while encountering wormholes and asteroids\!

## 📖 Project Evolution: From Hackathon to Production

**PTO2025** is a complete architectural rewrite and enhancement of **[pto2023](https://github.com/Choutw/pto2023)**.

The original project was created during a **48-hour Hackathon in 2023**. Due to strict time constraints, the initial version was a rapid prototype. Two years later, this project represents a commitment to technical excellence, transforming the concept into a polished, performant application.

### 🔗 Links

- **PTO2025 Demo**: [https://maggie62755.github.io/pto2025](https://maggie62755.github.io/pto2025)
- **PTO2023 Demo**: [https://choutw.github.io/pto2023/login](https://choutw.github.io/pto2023/login)
- **PTO2023 Introduction Video**: [Watch on YouTube](https://www.youtube.com/watch?v=SQ_4puAXu7g)

### 💡 Key Improvements

| Feature | Legacy (PTO2023) | Modern (PTO2025) |
|:---|:---|:---|
| **Tech Stack** | Hackathon Prototype | **React 19 + Vite + React Router** |
| **Architecture** | Basic Implementation | **Modular Components & Custom Hooks** |
| **Data Handling** | Static/Hardcoded | **Dynamic CSV Parsing (`travel_data.csv`)** |
| **UX/UI** | Basic Interface | **Responsive Design with Animations** |

-----

## 🎮 Game Mechanics

**Let's Have Launch** is a turn-based strategy game played on a 36-cell board.

  * **Objective**: Reach the final destination (Cell 36) before your budget runs out.
  * **Dice System**: Physics-based rolling determines your movement speed.
  * **Dynamic Events**:
      * 🪐 **Planets**: Learn real facts about Mercury, Venus, Mars, and more (Data sourced from NASA).
      * 🕳️ **Wormholes**: Instant teleportation to different sectors of the board.
      * ☄️ **Asteroids**: Obstacles that challenge your resource management.
  * **Resource Management**: Every move and event impacts your budget. Game Over occurs if funds hit zero.

-----

## 🛠️ Technical Stack

  * **Core**: React 19
  * **Build Tool**: Vite
  * **Routing**: React Router DOM
  * **Data Management**: Custom CSV Parser (Auto-converts `travel_data.csv` to JSON)
  * **Styling**: CSS3 with Responsive Design
  * **Fonts**: Orbitron, Exo 2, Roboto

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (v18+ recommended)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/maggie62755/pto2025.git
    cd pto2025
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Build for Production**

    ```bash
    npm run build
    ```
-----

## 🎨 Credits & Acknowledgments

  * **Original Concept**: Created by the [pto2023](https://github.com/Choutw/pto2023) team.
  * **Data Sources**: Planet facts and imagery courtesy of NASA/JPL.
  * **Fonts**: Google Fonts (Orbitron, Exo 2).

-----