const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('unparsedData.txt')
})

function findSignalMarker (data) {
    let signalMarker = '';
    let signalFound = false;
    let markerIndex = 0;
    
    let message = '';
    let messageFound = false;
    let messageIndex = 0;

    while (!signalFound) {
        signalMarker = data.substr(markerIndex, 4);
        let similarChars = 0;

        for (let i = 0; i < signalMarker.length; i++) {
            for (let j = 1; j < signalMarker.length; j++) {
                if (signalMarker[i] === signalMarker[j] && i !== j) {
                    similarChars++;
                }
            }
        }

        if (similarChars === 0) {
            signalFound = true;
            console.log(`Signal found: ${signalMarker} at index: ${markerIndex}`);
            console.log(`Characters processed before signal found: ${markerIndex+4}`)
        } else {
            markerIndex++;
        }
    }

    while (!messageFound) {
        message = data.substr(messageIndex, 14);
        let similarChars = 0;

        for (let i = 0; i < message.length; i++) {
            for (let j = 1; j < message.length; j++) {
                if (message[i] === message[j] && i !== j) {
                    similarChars++;
                }
            }
        }

        if (similarChars === 0) {
            messageFound = true;
            console.log(`Message found: ${message} at index: ${messageIndex}`);
            console.log(`Characters processed before message found: ${messageIndex+14}`)
        } else {
            messageIndex++;
        }
    }
}

reader.on('line', findSignalMarker);