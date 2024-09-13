// Import statements using ES Modules
import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { fileURLToPath } from 'url';

// Set up express and multer
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

// Set up path to resolve directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST request for merging PDFs
app.post('/merge', upload.array('pdfs', 4), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

