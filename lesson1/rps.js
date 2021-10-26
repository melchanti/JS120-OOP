/*
1. Write Textual description
RPS is a two-player game where each player chooses one of three possible moves:
rock, paper, or scissors. The winner is chosen by comparing their moves with
the following rules:

Rock crushes scissors, i.e., rock wins against scissors.
Scissors cuts paper, i.e., scissors beats paper.
Paper wraps rock, i.e., paper beats rock.
If the players chose the same move, the game is a tie.

2. Extract nouns and verbs
Nouns: Player, move, rule
Verbs: choose, compare

3. Organize and associate the verbs with the nouns
Player
  -choose
Move
Rule

???
  - compare

Keep track of history of changes:
  1. History of moves would be a propery of the player object
  2. Behaviors on it, would be:
    a. update it with a new move (this needs to be called at
      the end of choose method)
  3. Displaying the history of moves would be at the end of each full game:
    Set 1: Human chose MOVE, Computer chose Move, Computer/Player won
    Set 2
    Set 3
    ....
    Set n:
    Since this is how we want to display it, the display method
    should be a part of the RPS game object rather than the player object

Find probability of each move


*/

let readline = require ('readline-sync');
const VALID_CHOICES = {
  rock: { shorthand: 'r', beats: ['lizard','scissors'] },
  paper: { shorthand: 'p', beats: ['rock', 'spock'] },
  scissors: { shorthand: 'sc', beats: ['paper', 'lizard'] },
  lizard: { shorthand: 'l', beats: ['spock', 'paper'] },
  spock: { shorthand: 'sp', beats: ['scissors', 'rock'] },
};
const VALID_YES_OR_NO = ['yes', 'no', 'y', 'n'];
const WINNING_SCORE = 5;

function prompt(message) {
  console.log (`=> ${message}`);
}

function createPlayer() {
  return {
    move: null,
    score: 0,
    historyOfMoves: [],

    updateScore() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },

    updateMovesHistory(move) {
      this.historyOfMoves.push(move);
    },
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {

    movesProbability: {
      rock: 0, paper: 0, scissors: 0, lizard: 0, spock: 0,
    },

    randomMove (choices) {
      let randomIndex = Math.floor (Math.random() * choices.length);
    
      return choices[randomIndex];
    },

    weightedChoice () {
      let choices = Object.keys(VALID_CHOICES);

      Object.keys(VALID_CHOICES).forEach(move => {
        if (this.historyOfMoves.includes(move)) {
          if (this.movesProbability[move] > 50) {
            choices.push(move);
          }

          if (this.movesProbability[move] > 70) {
            choices.push(move);
          }

          if (this.movesProbability[move] > 90) {
            choices.push(move);
          }
        }
      });

      return this.randomMove(choices);
    },

    choose() {
      this.move = this.weightedChoice();
      this.updateMovesHistory(this.move);
    },

    updateProbability (currentMove, computerWon) {
      let currentMovePlayed = this.historyOfMoves.filter(move => {
        return move === currentMove;
      }).length - 1;

      let currentMoveSumWins = (currentMovePlayed *
        this.movesProbability[currentMove] / 100);
      let addWin = 0;
      if (computerWon) addWin += 1;

      this.movesProbability[currentMove] = Number((((currentMoveSumWins + addWin) / 
        (currentMovePlayed + 1)) * 100).toFixed(2));
    },
  };

  return Object.assign (playerObject, computerObject);
}

function createHuman() {

  let humanObject = {

    userChoiceDecipher (choice) {
      switch (choice) {
        case 'r':
          return 'rock';
        case 'p':
          return 'paper';
        case 'sc':
          return 'scissors';
        case 'l':
          return 'lizard';
        case 'sp':
          return 'spock';
        default:
          return choice;
      }
    },

    printableChoicesWithShorthands(choices) {
      return choices.reduce ((accum, value, index) => {
        if (Object.keys(VALID_CHOICES).includes(value) &&
        index !== (choices.length / 2) - 1) {
          return accum + value + `(${choices[index + (choices.length / 2)]}), `;
        } else if (Object.keys(VALID_CHOICES).includes(value)) {
          return accum + 'or ' + value + `(${choices[index + 5]})`;
        } else {
          return accum;
        }
      }, '');
    },

    choose() {
      let choice;

      while (true) {
        const choices = Object.keys(VALID_CHOICES).concat(
          Object.keys(VALID_CHOICES).map (key => {
            return VALID_CHOICES[key].shorthand;
          }));
        prompt(`Please choose ${this.printableChoicesWithShorthands(choices)}.`);
        choice = readline.question().toLowerCase();
        if (choices.includes(choice)) break;
        prompt('Sorry, invalid choice.');
      }
      this.move = this.userChoiceDecipher(choice);
      this.updateMovesHistory(this.move);
    }
  };

  return Object.assign(createPlayer(), humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  compare(humanMove, computerMove) {
    if (humanMove === computerMove) {
      return 'tie';
    } else if (VALID_CHOICES[humanMove].beats.includes(computerMove)) {
      return 'human';
    } else {
      return 'computer';
    }
  },

  displayRules() {
    prompt ('This game is an extended version of the simple game rock, paper, scissors.');
    prompt ('Below are the rules:');
    prompt ('SCissors cuts Paper covers Rock crushes Lizard posions SPock smashes SCissors');
    prompt ('decapitates Lizard eats Paper disproves SPock vaporizes Rock crushes SCissors.');
    prompt ('Click Enter/Return to continue');
    readline.question();
    console.clear();
  },

  displayWelcomeMessage() {
    prompt('Welcome to the extended version of Rock, Paper, Scissors!');
    let answer;

    while (true) {
      prompt ('Would you like to review the rules of the game? (y/n)');
      answer = readline.question().toLowerCase();

      if (VALID_YES_OR_NO.includes(answer)) break;

      prompt ("You've entered an invalide choice");
    }

    if (answer[0] === 'y') {
      this.displayRules();
    }
  },

  displayGoodbyeMessage() {
    prompt('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displaySetWinner() {
    let setWinner = this.compare(this.human.move, this.computer.move);

    prompt(`You chose: ${this.human.move}`);
    prompt(`The computer chose: ${this.computer.move}`);

    if (setWinner === 'human') {
      this.computer.updateProbability(this.computer.move, false);
      this.human.updateScore();
      prompt('You win this set!');
    } else if (setWinner === 'computer') {
      this.computer.updateProbability(this.computer.move, true);
      this.computer.updateScore();
      prompt('Computer Wins this set!');
    } else {
      prompt("This set is a tie");
    }
  },

  displayGameWinner() {
    let humanScore = this.human.score;

    if (humanScore === WINNING_SCORE) {
      prompt('You win the game!!!!!');
      prompt ('Click Enter/Return to continue');
      readline.question();
    } else {
      prompt('Computer wins the game!!!!!');
      prompt ('Click Enter/Return to continue');
      readline.question();
    }
  },

  displayScore() {
    prompt(`The current score is \n=> YOU: ${this.human.score} \n=> COMPUTER: ${this.computer.score}`);
    prompt(`Press Enter/Return to continue`);
    readline.question();
    console.clear();
  },

  displayMoves() {
    console.clear();

    let setsPlayed = this.computer.historyOfMoves.length;
    let computerMoves = this.computer.historyOfMoves;
    let humanMoves = this.human.historyOfMoves;
    for (let index = 0; index < setsPlayed; index++) {
      let humanMove = humanMoves[index];
      let computerMove = computerMoves[index];
      let setWinner = this.compare (humanMove, computerMove);
      let winner = setWinner !== 'tie' ? `${setWinner} won` : `It was a tie`;

      prompt (`Set ${index + 1}: you chose ${humanMove}, Computer chose ${computerMove}. ${winner}`);
    }
  },

  playAgain() {
    let answer;
    while (true) {
      prompt('Would you like to play again? (y/n)');
      answer = readline.question().toLowerCase();

      if (VALID_YES_OR_NO.includes(answer)) break;

      prompt ("You've entered an invalid answer");
    }
    console.clear();
    return answer[0] === 'y';
  },

  play() {
    console.clear();
    this.displayWelcomeMessage();
    while (true) {
      this.human.resetScore();
      this.computer.resetScore();

      while (this.human.score < WINNING_SCORE && this.computer.score < WINNING_SCORE) {
        this.human.choose();
        this.computer.choose();
        this.displaySetWinner();
        this.displayScore();
      }
      this.displayGameWinner();
      this.displayMoves();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
