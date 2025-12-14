import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.routes';
import sweetsRoutes from './routes/sweets.routes';

// Serve static files from the frontend build directory
import path from 'path';

// Serve API routes first
app.get('/api/health', (req, res) => {
    res.json({ message: 'Sweet Shop API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

// Serve React Frontend (Static Files)
// const frontendBuildPath = path.resolve(__dirname, '../../frontend/dist');
// console.log('Serving frontend from:', frontendBuildPath);
// app.use(express.static(frontendBuildPath));

// Catch-all handler for SPA (returns index.html for unknown routes)
// app.get('*', (req, res) => {
//     const indexPath = path.join(frontendBuildPath, 'index.html');
//     res.sendFile(indexPath);
// });

export default app;
