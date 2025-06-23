import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  path.join(__dirname, 'dist', 'index.js'),
  path.join(__dirname, 'dist', 'index.esm.js')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.startsWith("'use client';")) {
      fs.writeFileSync(file, "'use client';\n" + content);
      console.log(`Added 'use client' directive to ${file}`);
    }
  }
});



