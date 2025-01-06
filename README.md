# OpenCRM

This project is built using Vite. The main files are `types.ts` and `store.ts`, located in the root directory. The application consists of two main components: `App` and `TableRow`.

## Components

### App

- The main interface of the application.
- Loads an array of logs from the store.
- Iterates through the array and renders individual table rows as `TableRow` components.
- Passes data from the array elements as props to `TableRow`.

### TableRow

- Handles all input/output logic and validation.
- When a value of an element changes (and passes validation), it updates the store, which manages all data operations.

## Store

- Manages the state of the application.
- Loads data from `localStorage` or uses example data if no data is found.
- Provides methods to save data back to `localStorage`.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/LomakinMN/opencrm.git
   ```
2. Navigate to the project directory:
   ```sh
   cd opencrm
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

1. Build the application:
   ```sh
   npm run build
   ```
2. Deploy to your server
