//#region Variables

const minDoc = document.getElementById('min');
const maxDoc = document.getElementById('max');
const valueError = document.getElementById("valueError");
const checkButton = document.getElementById("btn");
const countDoc = document.getElementById("count");
const answerDoc = document.getElementById("answer");
const scoreDoc = document.getElementById("score");
const printNbrUsed = document.getElementById("listNumber");
const helpDoc = document.getElementById("help");
let tries = 1;
let score = 0;
var nbrUsed = [];
let nbr = 0;

//#endregion

//#region Min/Max value selection

const min = () => {
    return parseInt(minDoc.value);
};

const max = () => {
    return parseInt(maxDoc.value);
};

const error = () => {
    return min() >= max() ? true:false;
};

const invalidNumbers = () => {
    if (!error()) {
        valueError.innerHTML = '';
        checkButton.style.visibility = 'visible';
        nbr = random();
        cheatCode();
    } else {
        valueError.innerHTML = `Error: min value higher than max value. Try with min: ${max()}, max: ${min()}.`;
        checkButton.style.visibility = 'hidden';
    }
};

//#endregion

//#region Generation of random number

const random = () => {
    return Math.floor(Math.random() * (max() - min() + 1)) + min();
};

nbr = random();

//#endregion

//#region Easy, Medium and Harcore Button

const easy = () => {
    minDoc.value = 1;
    maxDoc.value = 10;
    nbr = random();
    cheatCode();
};

const medium = () => {
    minDoc.value = 1;
    maxDoc.value = 20;
    nbr = random();
    cheatCode();
};

const hardcore = () => {
    minDoc.value = 1;
    maxDoc.value = 50;
    nbr = random();
    cheatCode();
};

//#endregion

//#region User input

const userInput = () => {
    return parseInt(document.getElementById('inputNbr').value);
};


//#endregion

//#region Win phrase (how strong/lucky you are)

const answer = (tries) => {
    return tries >= 15? answerDoc.innerHTML = `You loser ${tries} tries !`:
     tries > 10? answerDoc.innerHTML = `Well well, ${tries} tries. you could do better !` :
     tries > 5? answerDoc.innerHTML = `${tries} tries... not so bad.` : 
     answerDoc.innerHTML = `OMG YOU CHEATED !! YOU DID ${tries} TRIES !!!`
};

//#endregion

//#region Print tries did

const count = (tries) => {
    return countDoc.innerText = `You did ${tries} tries`;
};

//#endregion

//#region Score Management

const playerScore = (tries) => {
    let newScore = 10 * Math.floor((max() - min() + 1)/tries);
    score += newScore;
    countDoc.innerText = `You won ${newScore} points for a total of ${score} points`;
    return scoreDoc.innerHTML = score;
};

//#endregion

//#region Print on screen last user input or Remove all inputs

const printUsed = lastNbrAdded => {
    return printNbrUsed.innerHTML += `${lastNbrAdded} `;
};

const removeUsed = () => {
    nbrUsed = [];
    return printNbrUsed.innerHTML = '';
};

//#endregion

//#region Help the number to find is higher or lower the user input

const help = usrInput => {
    return usrInput < nbr ? helpDoc.innerHTML = 'Try a number higher':helpDoc.innerHTML = 'Try a number lower' ;
};

const removeHelp = () => {
    return helpDoc.innerHTML = '';
};

//#endregion

//#region Cheat code in console

const cheatCode = () => {
    return console.log(`Cheatcode: the number to find is ${nbr}`);
}

//#endregion

cheatCode();

// Action when click on "Ckeck" button
function enterButton() {
    const usrInput = userInput();
    if (checkValidNumber() == 0) {
        nbrUsed.push(usrInput);
        printUsed(nbrUsed[nbrUsed.length-1]);
        // Win condition
        if (usrInput == nbr) {
            answer(tries);
            playerScore(tries);
            removeUsed();
            removeHelp();
            tries = 1;
            nbr = random();
        } else {
            help(usrInput);
            count(tries++);
        }
        cheatCode();
    }
}

// Check Validity of the user input number
function checkValidNumber() {
    const usrInput = userInput();
    // User Input empty or not == 0
    if (!usrInput && usrInput != 0) {
        answerDoc.innerHTML = 'Error: please fill the empty input.';
    } else {
        answerDoc.innerHTML = '';
        // User Input number already used
        if (nbrUsed.includes(userInput())) {
            answerDoc.innerHTML = 'Error: number already used.';
        }
        // User input above max or below min
        if (usrInput > max() || usrInput < min()) {
            answerDoc.innerHTML = `Error: number should be between ${min()} and ${max()}`
        }
    } 

    return !answerDoc.innerHTML? 0:84;
}