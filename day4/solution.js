const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('unparsedData.js')
})

const parsedData = [];

let containedPairs = 0;
let overlappingPairs = 0;

function compareAssignments (assignments) {
    if ((assignments[0].low <= assignments[1].low && assignments[0].high >= assignments[1].low) || (assignments[1].low <= assignments[0].low && assignments[1].high >= assignments[0].low)) {
        overlappingPairs++;
    }

    if (assignments[0].low <= assignments[1].low && assignments[0].high >= assignments[1].high) {
        containedPairs += 1;
    } else if (assignments[1].low <= assignments[0].low && assignments[1].high >= assignments[0].high) {
        containedPairs += 1;
    }
}

function parse (data) {
    const unparsedAssignmentPair = data.split(',');
    const assignmentPair = [];

    unparsedAssignmentPair.forEach(data => {
        const range = data.split('-');
        const elfAssignment = {
            low: parseInt(range[0]),
            high: parseInt(range[1])
        }
        assignmentPair.push(elfAssignment);
    })

    parsedData.push(assignmentPair);
    compareAssignments(assignmentPair);
}

function read () {
    console.log(`Completely contained pairs: ${containedPairs}`);
    console.log(`Overlapping pairs: ${overlappingPairs}`);
}

reader.on('line', parse);
reader.on('close', read);