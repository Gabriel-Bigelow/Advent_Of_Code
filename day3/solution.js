const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('unparsedData.js')
});



const commonItems = [];

function splitRucksack(data) {
    const compartment1 = data.slice(0, data.length/2);
    const compartment2 = data.slice(data.length/2, data.length);

    for (let i = 0; i < compartment1.length; i++) {
        for (let j = 0; j < compartment2.length; j++) {
            if (compartment1[i] === compartment2[j]) {
                commonItems.push(compartment1[i]);
                i = compartment1.length;
            }
        }
    }
}

function translateCharCode (char, index) {
    let charCode = char.charCodeAt(index);

    if (charCode >= 97) {
        return charCode -= 96;
    } else {
        return charCode -= (64 - 26);
    }
}

let prioritySum = 0;
function logCommonItems () {
    const commonItemsJoined = commonItems.join('');

    for (let i = 0; i < commonItemsJoined.length; i++) {
        prioritySum += translateCharCode(commonItemsJoined, i);
    }
    console.log(prioritySum);
}



reader.on('line', splitRucksack);
reader.on('close', logCommonItems);