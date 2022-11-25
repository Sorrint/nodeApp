const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const base = path.join(__dirname, 'temp');

const getContent = () => `
 \n\t ${process.argv[2] ?? ''}
 `;

async function start() {
    try {
        if (fsSync.existsSync(base)) {
            await fs.appendFile(path.join(base, 'logs.txt'), getContent());
        } else {
            await fs.mkdir(base);
            await fs.writeFile(path.join(base, 'logs.txt'), process.argv[2] ?? '');
        }
    } catch (error) {}
}

start();
