import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const BUILD_DIR = join(__dirname, 'build');

app.use(express.static(BUILD_DIR));

// Keboola POSTs to / on startup as a health check
app.post('/', (_req, res) => {
  res.sendFile(join(BUILD_DIR, 'index.html'));
});

// SPA fallback
app.get('/{*splat}', (_req, res) => {
  res.sendFile(join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ontology Playground serving on port ${PORT}`);
});
