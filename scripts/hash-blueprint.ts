import { createHash } from 'crypto';
import * as fs from 'fs';

// Usage: ts-node hash-blueprint.ts <path-to-blueprint.md>
// This script computes the SHA-256 hash of a Final Prompt Blueprint file.

const [,, filePath] = process.argv;

if (!filePath) {
  console.error('Usage: node hash-blueprint.ts <file>');
  process.exit(1);
}

try {
  const content = fs.readFileSync(filePath, 'utf-8');
  const hash = createHash('sha256').update(content).digest('hex');
  console.log(hash);
} catch (err) {
  console.error(`Error reading file ${filePath}:`, err);
  process.exit(1);
}