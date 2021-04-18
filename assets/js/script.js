const min = () => {
    return parseInt(document.getElementById('min').value);
};

const max = () => {
    return parseInt(document.getElementById('max').value);
};

const error = () => {
    return min() >= max() ? true:false;
};

const valueError = document.getElementById("valueError");
const checkButton = document.getElementById("btn");

const invalidNumbers = () => {
    if (!error()) {
        valueError.innerHTML = '';
        checkButton.style.visibility = 'visible';
    } else {
        valueError.innerHTML = `Error: min value higher than max value. Try with min: ${max()}, max: ${min()}.`;
        checkButton.style.visibility = 'hidden';
    }
};

const random = () => {
    return Math.floor(Math.random() * (max() - min() + 1)) + min();
};

let nbr = random();

const easy = () => {
    document.getElementById('min').value = 1;
    document.getElementById('max').value = 10;
    nbr = random();
}

const medium = () => {
    document.getElementById('min').value = 1;
    document.getElementById('max').value = 20;
    nbr = random();
}

const hardcore = () => {
    document.getElementById('min').value = 1;
    document.getElementById('max').value = 50;
    nbr = random();
}

const userInput = () => {
    return parseInt(document.getElementById('inputNbr').value);
};

const countDoc = document.getElementById("count");
const answerDoc = document.getElementById("answer");

const answer = (tries) => {
    return tries >= 15? answerDoc.innerHTML = `You loser ${tries} tries !`:
     tries > 10? answerDoc.innerHTML = `Well well, ${tries} tries. you can do better !` :
     tries > 5? answerDoc.innerHTML = `Not so bad with ${tries} tries.` : 
     answerDoc.innerHTML = `OMG YOU CHEATED !! YOU JUST DID ${tries} TRIES !!!`
}

let tries = 1;
const count = (tries) => {
    return countDoc.innerText = `You did ${tries} tries`;
};

let scoreDoc = document.getElementById("score");
let score = 0;
const playerScore = (tries) => {
    score += 10 * Math.floor((max() - min() + 1)/tries);
    return scoreDoc.innerHTML = score;
}

var nbrUsed = [];

function enterButton() {
    if (userInput()) {
        answerDoc.innerHTML = '';
        if (nbrUsed.includes(userInput())) {
            answerDoc.innerHTML = 'Error: number already used.';
        } else {
            nbrUsed.push(userInput());
            // Win condition
            if (userInput() == nbr) {
                count(tries);
                answer(tries);
                playerScore(tries);
                nbrUsed = [];
            } else {
                count(tries++);
            }
        }
    } else {
        answerDoc.innerHTML = 'Error: please fill the empty input.';
    }
}