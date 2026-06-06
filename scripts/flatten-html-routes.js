import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    }
  }
  if (dir.endsWith('.html')) {
    const index = path.join(dir, 'index.html');
    if (fs.existsSync(index)) {
      const tmp = `${dir}.tmp`;
      fs.renameSync(index, tmp);
      fs.rmSync(dir, { recursive: true, force: true });
      fs.renameSync(tmp, dir);
    }
  }
}

walk(dist);
