const fs = require('fs');
const readline = require('readline');

const reader = readline.createInterface({
    input: fs.createReadStream('parsed.js')
})


let myTotalScore = 0;
let opponentTotalScore = 0;

const rock = 'A';
const paper = 'B';
const scissors = 'C';

function scoreRound (array) {
    const arrayParsed = JSON.parse(array);
    let myRoundScore = 0;
    let opponentRoundScore = 0;
    
    let myThrow = arrayParsed[1];
    let opponentThrow = arrayParsed[0];
    

    if (opponentThrow === rock) {
        opponentRoundScore += 1;
    } else if (opponentThrow === paper) {
        opponentRoundScore += 2;
    } else if (opponentThrow === scissors) {
        opponentRoundScore += 3;
    }

    if (myThrow === 'X') {
        myThrow = rock;
        myRoundScore += 1;
    } else if (myThrow === 'Y') {
        myThrow = paper;
        myRoundScore += 2;
    } else if (myThrow === 'Z') {
        myThrow = scissors;
        myRoundScore += 3;
    }

    if (myThrow === opponentThrow) {
        opponentRoundScore += 3;
        myRoundScore += 3;
    } else if (myThrow === rock && opponentThrow === scissors) {
        myRoundScore += 6;
    } else if (myThrow === paper && opponentThrow === rock) {
        myRoundScore += 6;
    } else if (myThrow === scissors && opponentThrow === paper) {
        myRoundScore += 6;
    } else {
        opponentRoundScore += 6;
    }
    
    myTotalScore += myRoundScore;
    opponentTotalScore += opponentRoundScore;
}

reader.on('line', scoreRound)


function decideWinner() {
    let winOrLose = 'win';
    myTotalScore > opponentTotalScore ? winOrLose = 'win' : winOrLose = 'lose';

    console.log(`I ${winOrLose}. I scored ${myTotalScore}. Opponent scored ${opponentTotalScore}.`);
}
reader.on('close', decideWinner);