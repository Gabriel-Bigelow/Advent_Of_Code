const fs = require('fs');
const readline = require('readline');

const stackReader = readline.createInterface({
    input: fs.createReadStream('stacks.js')
});
const instructionReader = readline.createInterface({
    input: fs.createReadStream('instructions.js')
})

const stacks = [];
const stacks2 = [];
const instructions = [];
const instructions2 = [];

function stackLogger (data) {
    stacks.push(data.split(' '));
    stacks2.push(data.split(' '));
}

function followOrders1 (data) {
    const instruction = data.split(',');
    const currentNum = instructions.length;
    instructions[currentNum] = [];
    
    let howMany = instruction[0];
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    while (instructions[currentNum].length < 3) {
        instructions[currentNum].push(parseInt(instruction[0]));
        instruction.splice(0, 1);
    }
    while (howMany > 0) {
        stacks[to].push(stacks[from].pop())
        howMany--;
    }
}

function followOrders2 (data) {
    const instruction = data.split(',');
    const currentNum = instructions2.length;
    instructions2[currentNum] = [];
    
    let howMany = parseInt(instruction[0]);
    const from = instruction[1] - 1;
    const to = instruction[2] - 1;

    while (instructions2[currentNum].length < 3) {
        instructions2[currentNum].push(parseInt(instruction[0]));
        instruction.splice(0, 1);
    }

    const holding = stacks2[from].splice(stacks2[from].length-howMany, howMany);
    
    while (howMany > 0) {
        stacks2[to].push(holding.shift());
        howMany--;
    }
}

stackReader.on('line', stackLogger);
instructionReader.on('line', followOrders1);
instructionReader.on('line', followOrders2);


function part1 () {
    const top = [];
    for (let i = 0; i < stacks.length; i++) {
        top.push(stacks[i][stacks[i].length-1]);
    }
    console.log(`Part 1 solution: ${top.join('')}`);
}

function part2 () {
    const top = [];
    for (let i = 0; i < stacks2.length; i++) {
        top.push(stacks2[i][stacks2[i].length-1]);
    }
    console.log(`Part 2 solution: ${top.join('')}`);
}

instructionReader.on('close', part1);
instructionReader.on('close', part2);

