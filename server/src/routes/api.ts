import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { getLang } from '../utils/languageUtility';
import { getPrompts, getPromptType } from '../utils/promptUtility';

const router = Router();

router.get('/prompt', (req: Request, res: Response) => {
  const promptType = getPromptType(req);
  const lang = getLang(req);
  let prompts = getPrompts(promptType, lang);
  
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  res.json({ message: randomPrompt });
});

export default router;