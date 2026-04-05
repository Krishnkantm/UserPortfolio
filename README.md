# 🌟 My Portfolio

A full-stack portfolio application built with React, Vite, Express, MongoDB, and Cloudinary.

## 🚀 Project Overview

- `frontend/` - React app built with Vite.
- `backend/` - Node.js + Express API with MongoDB integration.

The backend exposes portfolio data routes for projects, skills, certificates, profiles, contacts, and storage uploads. The frontend consumes these APIs and renders a portfolio website.

## ✨ Features

- 🔐 User authentication and admin routes
- 📁 Projects, skills, certificates, and profile management
- ✉️ Contact form API
- ☁️ Cloudinary file upload support
- 🧩 Separate frontend and backend development environments

## ✅ Prerequisites

- Node.js 18+ / npm
- MongoDB database (local or Atlas)
- Cloudinary account for storage

## 🛠️ Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the following values:
   ```env
   MONGO_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```
4. Start the backend server:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

By default, the backend listens on `http://localhost:5000`.

## 🎨 Frontend Setup

1. Open a terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173` by default.

## 🧾 API Routes

The backend registers the following routes:

- `POST /api/auth/*`
- `GET /api/contact/*`
- `GET /api/projects/*`
- `GET /api/certificates/*`
- `GET /api/skill/*`
- `GET /api/profile/*`
- `POST /api/storage/*`

> Adjust the frontend API base URL if you deploy the backend to a different host.

## 📝 Development Notes

- CORS is configured to allow `http://localhost:5173` and `https://your-frontend.vercel.app`.
- Update allowed origins in `backend/server.js` when deploying to a real frontend domain.

## 🚢 Deployment

- Deploy the backend to a server or hosting provider that supports Node.js.
- Deploy the frontend to Vercel, Netlify, or any static hosting provider.
- Ensure backend environment variables are configured in your deployment environment.

## 📁 Folder Structure

- `backend/`
  - `server.js` - Express server entrypoint
  - `config/db.js` - MongoDB connection
  - `controller/` - route controllers
  - `routes/` - API routes
  - `models/` - Mongoose models
  - `middleware/` - auth, uploads, other middleware
  - `utlis/` - Cloudinary helper

- `frontend/`
  - `src/` - React source code
  - `public/` - static assets
  - `package.json` - front-end scripts and dependencies

