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
- ISO 26825:2020 color coding standard

## Deployment

### Deploy to Render.com

This app is ready to deploy to Render.com:

1. **Sign in to Render**: Go to [render.com](https://render.com) and sign in with GitHub
2. **Create New Static Site**: Click "New +" → "Static Site"
3. **Connect Repository**: Select your GitHub repository
4. **Configure Settings**:
   - **Name**: anemeds (or your preferred name)
   - **Branch**: main
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Deploy**: Click "Create Static Site"

Render will automatically:
- Build and deploy your app
- Provide a public URL (e.g., `https://anemeds.onrender.com`)
- Enable HTTPS automatically
- Redeploy when you push to GitHub

### Alternative: Manual Deployment

If you prefer manual deployment, the `render.yaml` file is included for easy configuration.