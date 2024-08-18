# URL Metadata Fetcher

This project is a simple full-stack application that allows users to input a list of URLs and fetch the metadata (title, description, and an image) for each URL. The metadata is retrieved from the server and displayed on the frontend in a clean and visually appealing manner.

## Features

- Frontend built using **Vite**, **React**, **Tailwind CSS**, and **TypeScript**
- Backend built using **Node.js**, **Express**, and **TypeScript**
- API call `/fetch-metadata` to retrieve metadata from URLs
- Rate limiting implemented on the backend (5 requests per second)
- Handles invalid URLs and metadata retrieval errors gracefully
- CORS support to allow cross-origin requests
- Deployed on **Render**

## Technologies

- **Frontend**: Vite, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Deployment**: Render
- **Rate Limiting**: Express Rate Limit
- **Testing**: Jest

## Project Structure

- `frontend/`: Contains the Vite + React application
- `backend/`: Contains the Node.js/Express server
- `backend/test`: The test's case for the backend

## Setup and Installation

### Prerequisites

- Node.js installed (v16 or higher)
- Environment variables setup

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/omerbar97/Basic-Backend.git
   cd Basic-Backend/backend
   npm install
   npm run start
   ```
   Server will start at: http://localhost:3000/
   
   Also this will serve the static file of the frontend
