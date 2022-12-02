const fs = require('fs');
const readline = require('readline');

let writer = fs.createWriteStream('elves.js');

const myInterface1 = readline.createInterface({
    input: fs.createReadStream('elvesUnparsed.txt')
})

let previousLine = '';
function parseData (data) {
    if (data === '') {
        writer.write('], \n[')
    } else if (data !== '' && previousLine === '') {
        writer.write(`${data}`)
    } else if (data !== '' && previousLine !== '') {
        writer.write(`, ${data}`)
    }
    previousLine = data;
}

writer.write('[');

myInterface1.on('line', parseData);
