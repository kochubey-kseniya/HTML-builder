const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

fs.readdir(folder, {withFileTypes: true}, (err, result) => {
  if (err) console.log('Ошибка', err.message);
  for (let file of result) {
    if (file.isFile()) {
      let fileFolder = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(fileFolder, (error, stats) => {
        if (error) console.log('Error', error.message);
        let fileName = file.name.split('.')[0];
        let fileType = path.extname(file.name).split('.')[1];
        let fileSize = `${(stats.size)}bytes`;
        console.log(`${fileName} - ${fileType} - ${fileSize}`);
      });
    }
  }
});
