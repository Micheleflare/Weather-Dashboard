import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

import routes from './routes/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;

// Serve static files from the client dist directory
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use(routes);

// Serve the main HTML file for any unspecified routes
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
