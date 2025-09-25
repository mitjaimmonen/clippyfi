import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// ------- Serve API -------- //

const resourcePath = path.join(process.cwd(), "resources");
const prompts = JSON.parse(fs.readFileSync(path.join(resourcePath, 'prompts.json'), 'utf-8'));

app.get('/api/prompt', (req: Request, res: Response) => {
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  res.json({ message: randomPrompt });
});

// ------- Serve Vue frontend -------- //

// Serve static Vue files
app.use(express.static(path.join(__dirname, 'public')));

// SPA fallback
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ------- Listen -------- //

app.listen(port, () => {
  const env = process.env.NODE_ENV as 'production' | 'development' | 'test' | undefined;
  console.log(`Server is running, port ${port}`);
  console.log('Running in env:', env)
});