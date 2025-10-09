import { Router, Request, Response } from 'express';
import { getLang } from '../utils/languageUtility';
import { getPrompts, getPromptType } from '../utils/promptUtility';
import { getIndex } from '../utils/indexUtility';

const router = Router();

router.get('/prompt', (req: Request, res: Response) => {
  const lang = getLang(req);
  const promptType = getPromptType(req);
  const prompts = getPrompts(promptType, lang);
  const index = getIndex(prompts, req);

  const pormpt = prompts[index];
  res.json({ message: pormpt, index: index });
});

export default router;