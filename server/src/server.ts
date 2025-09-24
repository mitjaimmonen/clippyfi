import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/api/prompt', (req: Request, res: Response) => {
  res.json({ message: 'Clippy would never show advertisements on your fridge.' });
});

app.listen(port, () => {
  const env = process.env.NODE_ENV as 'production' | 'development' | 'test' | undefined;
  console.log(`Server is running, port ${port}`);
  console.log('Running in env:', env)
});