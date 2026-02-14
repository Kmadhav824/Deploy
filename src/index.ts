import express from 'express';
import cors from 'cors';
import { generate } from './utils.js';
import { simpleGit } from 'simple-git';
import { getAllFiles } from './file.js';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { uploadFile } from './aws.js';

import { createClient } from "redis";
const publisher = createClient();
publisher.connect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/store', async (req, res) => {
  // Deployment logic
  const repoUrl=req.body.repoUrl;
  const id=generate();
  console.log(`Deployment initiated for repository: ${repoUrl}`);
  console.log(__dirname);
  await simpleGit().clone(repoUrl, path.join(__dirname,`output/${id}`));
  res.json({id});

  const files = getAllFiles(path.join(__dirname,`output/${id}`));
  for (const file of files) {
      const relativePath = path.relative(path.join(__dirname, `output/${id}`), file);
      const key = `${id}/${relativePath}`;
      
      // We skip the .git folder to save time and bandwidth
      if (relativePath.includes('.git')) continue;

      await uploadFile(key, file);
  }

  // After all files are done, you can then tell Redis
  publisher.lPush("build-queue", id);
    console.log(files);
  });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

export default app;