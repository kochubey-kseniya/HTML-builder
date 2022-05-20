const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.join(__dirname,'text.txt'));
const rl = readline.createInterface({ input, output });

rl.write('Введите ваш текст, пожалуйста!\n');
rl.on('data', data => {
if (data === 'exit') {
    rl.write('Программа будет закрыта');
    process.exit();
    }
  stream.write(`${data}\n`);
});
rl.on('close', () => {
  rl.write('Программа будет закрыта');
  process.exit();
});
