import { Request } from 'express';
import path from 'path';
import fs from 'fs';


const resourcePath = path.join(process.cwd(), "resources");
const defaultLang = 'en';

export function getPromptType(req: Request): 'dark' | 'light' {
    const darkMode = req.query.dark === 'true';
    return darkMode ? 'dark' : 'light';
}

export function getPrompts(promptType: 'dark' | 'light', lang: string): string[] {
    let prompts: string[] = [];
    
    try {
        const file = path.join(resourcePath, `prompts.${promptType}.${lang}.json`);
        const data = fs.readFileSync(file, 'utf-8');
        prompts = JSON.parse(data).prompts;
    } catch (e) {
        const file = path.join(resourcePath, `prompts.${promptType}.${defaultLang}.json`);
        const data = fs.readFileSync(file, 'utf-8');
        prompts = JSON.parse(data).prompts;
    }
  
    return prompts;
}