import express from 'express';
import path from 'path';
import apiRoutes from './routes/api';

const app = express();
const port = 3000;

// Middleware for JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Serve static Vue files
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback for frontend (after API and static)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  const env = process.env.NODE_ENV as 'production' | 'development' | 'test' | undefined;
  console.log(`Server is running, port ${port}`);
  console.log('Running in env:', env)
});