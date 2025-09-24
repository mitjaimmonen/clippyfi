import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port = 3000;

// ------- Serve Vue frontend -------- //

// Serve static Vue files
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ------- Serve API -------- //

app.get('/api/prompt', (req: Request, res: Response) => {
  res.json({ message: 'Clippy would never show advertisements on your fridge.' });
});

// ------- Listen -------- //

app.listen(port, () => {
  const env = process.env.NODE_ENV as 'production' | 'development' | 'test' | undefined;
  console.log(`Server is running, port ${port}`);
  console.log('Running in env:', env)
});