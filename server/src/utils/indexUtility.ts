import { Request } from 'express';

export function getIndex(prompts: string[], req: Request): number {
  const originalIndexQ = req.query.index as string | undefined;
  let index = Math.floor(Math.random() * prompts.length);
    if (originalIndexQ !== undefined) {
        const originalIndex = parseInt(originalIndexQ, 10);
        if (!isNaN(originalIndex) && originalIndex >= 0) {
            index = (originalIndex + 1) % prompts.length;
        }
    }
  return index;
}