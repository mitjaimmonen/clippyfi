import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// ------- Serve API -------- //

const resourcePath = path.join(process.cwd(), "resources");
const supportedLangs = ['en', 'fi'];
const defaultLang = 'en';

function getLang(req: Request): string {
  const accept = req.headers['accept-language'];
  if (!accept) return defaultLang;
  for (const lang of accept.split(',')) {
    const code = lang.split(';')[0].trim().toLowerCase();
    if (supportedLangs.includes(code)) return code;
    // handle en-GB, fi-FI, etc.
    const base = code.split('-')[0];
    if (supportedLangs.includes(base)) return base;
  }
  return defaultLang;
}

app.get('/api/prompt', (req: Request, res: Response) => {
  const lang = getLang(req);
  const file = path.join(resourcePath, `prompts.${lang}.json`);
  let prompts: string[] = [];

  try {
    const data = fs.readFileSync(file, 'utf-8');
    prompts = JSON.parse(data).prompts;
  } catch (e) {
    // fallback to default
    const data = fs.readFileSync(path.join(resourcePath, `prompts.${defaultLang}.json`), 'utf-8');
    prompts = JSON.parse(data).prompts;
  }
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