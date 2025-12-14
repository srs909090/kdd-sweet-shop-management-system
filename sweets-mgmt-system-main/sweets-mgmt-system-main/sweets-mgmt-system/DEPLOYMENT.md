# Deployment Guide

Your application is now configured for a **Monolithic Deployment**. This means the Node.js backend serves the React frontend, making it easy to deploy as a single unit.

## Prerequisite: Database
**Important**: This app uses `SQLite` (`dev.db`).
- On cloud platforms like **Render** or **Heroku**, the filesystem is ephemeral. Your database file will be **deleted** every time you deploy or restart.
- **Solution**: For true production, switch `prisma/schema.prisma` to use PostgreSQL (e.g., Supabase, Neon) or use a volume mount if supported.

## Option 1: Render.com (Easiest)
1.  Push your code to GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your repository.
4.  **Settings**:
    -   **Root Directory**: `backend`
    -   **Build Command**: `cd .. && npm install && npm run build` (You may need to adjust this depending on how Render handles monorepos, simpler is to just run `npm install && npm run build` inside backend if backend is root).
    -   **Start Command**: `npm start`
    -   **Environment Variables**:
        -   `JWT_SECRET`: (Generate a random string)
        -   `DATABASE_URL`: `file:./dev.db` (For demo only)

## Option 2: Local Production Test
You can run the production version on your own machine:

1.  **Build the App**:
    ```bash
    cd backend
    npm run build
    ```
    *(This builds the React frontend and compiles the Backend)*

2.  **Start the Server**:
    ```bash
    npm start
    ```
    Visit `http://localhost:3000`. You will see the React app served by Express!

## Option 3: Vercel (Frontend Only) + External Backend
If you deploy frontend to Vercel:
1.  You must change `vite.config.ts` proxy to point to your deployed backend URL.
2.  Deploy Backend separately.
