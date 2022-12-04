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

function scoreRound1 (array) {
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

function retaliate (opp, guide) {
    if (opp === rock && guide === 'X') {
        return scissors;
    } else if (opp === rock && guide === 'Z') {
        return paper;
    }
    if (opp === paper && guide === 'X') {
        return rock;
    } else if (opp === paper && guide === 'Z') {
        return scissors;
    }
    if (opp === scissors && guide === 'X') {
        return paper;
    } else if (opp === scissors && guide === 'Z') {
        return rock;
    }
    if (guide === 'Y') {
        return opp;
    }
}

let myTotalScore2 = 0;
let opponentTotalScore2 = 0;

function scoreRound2 (array) {
    const arrayParsed = JSON.parse(array);
    let myRoundScore = 0;
    let opponentRoundScore = 0;
    
    let opponentThrow = arrayParsed[0];
    let myThrow = retaliate(opponentThrow, arrayParsed[1]);

    if (opponentThrow === rock) {
        opponentRoundScore += 1;
    } else if (opponentThrow === paper) {
        opponentRoundScore += 2;
    } else if (opponentThrow === scissors) {
        opponentRoundScore += 3;
    }

    if (myThrow === rock) {
        myRoundScore += 1;
    } else if (myThrow === paper) {
        myRoundScore += 2;
    } else if (myThrow === scissors) {
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
    
    myTotalScore2 += myRoundScore;
    opponentTotalScore2 += opponentRoundScore;
}

reader.on('line', scoreRound1)
reader.on('line', scoreRound2);

function decideWinner1() {
    let winOrLose = 'win';
    myTotalScore > opponentTotalScore ? winOrLose = 'win' : winOrLose = 'lose';

    console.log(`I ${winOrLose}. I scored ${myTotalScore}. Opponent scored ${opponentTotalScore}.`);
}

function decideWinner2() {
    let winOrLose = 'win';
    myTotalScore2 > opponentTotalScore2 ? winOrLose = 'win' : winOrLose = 'lose';

    console.log(`I ${winOrLose}. I scored ${myTotalScore2}. Opponent scored ${opponentTotalScore2}.`);
}

reader.on('close', decideWinner1);
reader.on('close', decideWinner2);
