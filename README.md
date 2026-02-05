# Anemeds

A simple Vue 3 web application for managing anesthetic drugs. Displays drug information including doses and effects, and allows adding personal notes.

## Features

- List of anesthetic drugs with doses and effects
- Editable notes for each drug, persisted in browser localStorage
- Responsive Vue 3 interface

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Data

Drug data is stored in `public/drugs.json`. Notes are saved locally in the browser's localStorage.

## Technologies

- Vue 3
- Vite
- JavaScript