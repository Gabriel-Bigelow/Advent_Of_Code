const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('data/unparsedData.js')
})

const stacks = [];
const instructions = [];

function parseStacks (data) {
    const allCrates = data.split('[]');
    const crates = allCrates[0].split(' ');
    const crateRegex = /\[\w\]/;
    
    let emptySpace = 0;
    for (let i = 0; i < crates.length; i++) {
         if (crates[i] === '') {
          emptySpace++;
        }
      if (emptySpace === 4) {
        crates.splice(i-3, 3);
        emptySpace = 0;
        i -= 3;
      }
    }
    for (let i = 0; i < crates.length; i++) {
          if (!stacks[i] && crates.length === 9) {
          stacks[i] = [];
        }
        if ((crates[i].match(crateRegex) || crates[i].match('')) && crates.length === 9) {
            stacks[i].unshift(crates[i]);
        }
    }
}

function parseInstructions (data) {
    const line = data.split(' ');
    const instruction = [];
    for (let i = 0; i < line.length; i++) {
        if (i % 2 > 0) {
            instruction.push(line[i]);
        }
    }
    instruction.push('\n');
    instructions.push(instruction);
}

function parseData (data) {
    if (data.match(/\[*\]/)) {
        parseStacks(data);
    } else if (data.match('move')) {
        parseInstructions(data);
    }    
}

function close () {
    for (let i = 0; i < stacks.length; i++) {
        while (stacks[i].indexOf('') > 0) {
            stacks[i].splice(stacks[i].indexOf(''), 1);
        }
        fs.appendFileSync('data/parsedData.js', `${stacks[i].join('')}\n`)
        fs.appendFileSync('stacks.js', `${stacks[i].join(' ')}\n`)
    }

    for (let i = 0; i < instructions.length; i++) {
        fs.appendFileSync('data/parsedData.js', instructions[i].join(','))
        fs.appendFileSync('instructions.js', instructions[i].join(','))
    }
}

reader.on('line', parseData);
reader.on('close', close);


