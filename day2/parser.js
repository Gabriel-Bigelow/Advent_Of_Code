const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('unparsedPuzzleData.txt')
})

let writer = fs.createWriteStream('parsed.js');


function logLine (data) {
    writer.write(`[${data.split(' ').map(element => {
        return element = `"${element}"` 
    })}]\n`);
}

reader.on('line', logLine);