const fs = require('fs');
const path = require('path');

async function makeBundle(src) {
  let files = await fs.promises.readdir(src, { withFileTypes: true });
  const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
  for (let file of files) {
    let srcPath = path.join(src, file.name);
    if (file.isFile() && path.extname(file.name) === '.css') {
      const bundle = [];
      const readStream = fs.createReadStream(srcPath, 'utf-8');
      readStream.on('data', chunk => bundle.push(chunk));
      readStream.on('end', () => bundle.forEach(file => writeStream.write(`${file}\n`)));
    }
  }
}

makeBundle(path.join(__dirname, 'styles'));
