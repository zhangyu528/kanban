import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.cwd();
const SKILL_ROOT = path.join(__dirname, '..');

const dirs = [
  'kanban/01-backlog/01-draft',
  'kanban/01-backlog/02-task',
  'kanban/02-doing',
  'kanban/03-test',
  'kanban/04-done',
  'kanban/99-templates'
];

async function init() {
  console.log('Initializing Kanban structure...');
  
  // 1. Create Directories
  for (const dir of dirs) {
    const fullPath = path.join(ROOT, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created: ${dir}`);
    }
  }

  // 2. Copy Templates from Assets to Project
  const templateSrc = path.join(SKILL_ROOT, 'assets/templates');
  const templateDest = path.join(ROOT, 'kanban/99-templates');
  
  const templates = fs.readdirSync(templateSrc);
  for (const template of templates) {
    fs.copyFileSync(
      path.join(templateSrc, template),
      path.join(templateDest, template)
    );
    console.log(`Deployed Template: ${template}`);
  }

  console.log('Kanban structure initialized successfully.');
}

init().catch(console.error);
