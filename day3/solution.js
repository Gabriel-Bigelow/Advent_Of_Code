const fs = require('fs');
const { getPriority } = require('os');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('unparsedData.js')
});



const commonItems = [];

function splitRucksack(data) {
    unsortedRucksacks.push(data);
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

let elfGroups = [];
let unsortedRucksacks = [];

function groupElves () {
    let group = {
        badge: '',
        rucksacks: []
    }

    group.rucksacks = unsortedRucksacks.splice(0, 3);
        
    for (let i = 0; i < group.rucksacks[0].length; i++) {
        for(let j = 0; j < group.rucksacks[1].length; j++) {
            if (group.rucksacks[0][i] === group.rucksacks[1][j]) {
                if (group.rucksacks[2].indexOf(group.rucksacks[0][i]) !== -1) {
                    group.badge = group.rucksacks[0][i];
                }
            }
        }
    }
    elfGroups.push(group);
}


let prioritySum = 0;
let groupSum = 0;
function logSums () {
    const commonItemsJoined = commonItems.join('');
    for (let i = 0; i < commonItemsJoined.length; i++) {
        prioritySum += translateCharCode(commonItemsJoined, i);
    }

    while (unsortedRucksacks.length > 0) {
        groupElves();
    }
    elfGroups.forEach(group => {
        groupSum += translateCharCode(group.badge, 0);
    })
    

    console.log(`(part 1) The priority sum is: ${prioritySum}`);
    console.log(`(part 2) The group sum is: ${groupSum}`);
}



reader.on('line', splitRucksack);
reader.on('close', logSums);

//reader.on('line', )