const fs = require('fs');
const path = require('path');

async function copyDir(src, copy) {
  await fs.promises.mkdir(copy, { recursive: true });
  let files = await fs.promises.readdir(src, { withFileTypes: true });
  for (let file of files) {
    let srcPath = path.join(src, file.name);
    let copyPath = path.join(copy, file.name);
    if (file.isDirectory()) {
      await copyDir(srcPath, copyPath);
    } else {
      await fs.promises.copyFile(srcPath, copyPath);
    }
  }
}

function copyUpdatedDir(src, copy) {
  fs.rm(copy, { recursive: true, force: true }, () => copyDir(src, copy));
}

copyUpdatedDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
