import express from 'express';
import cors from 'cors';
import { generate } from './utils.js';
import { simpleGit } from 'simple-git';
import { getAllFiles } from './file.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/deploy', async (req, res) => {
  // Your deployment logic here
  const repoUrl=req.body.repoUrl;
  const id=generate();
  console.log(`Deployment initiated for repository: ${repoUrl}`);
  console.log(__dirname);
  await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));
  res.json({id});

  const files = getAllFiles(path.join(__dirname,`output/${id}`));
  console.log(files);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

export default app;