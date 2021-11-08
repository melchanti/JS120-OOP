const readline = require('readline-sync');

function prompt(message) {
  console.log (`=> ${message}`);
}

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  getMarker() {
    return this.marker;
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
    }
  }

  rowIsFull(row) {
    return (row.every(squareNumber => {
      return !(this.squares[squareNumber].isUnused());
    }));
  }
  reInitalize() {
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)].setMarker(Square.UNUSED_SQUARE);
    }
  }

  display() {
    console.log ("");
    console.log ("     |     |");
    console.log (`  ${this.squares['1']}  |  ${this.squares['2']}  |  ${this.squares['3']}`);
    console.log ("     |     |");
    console.log ("-----+-----+-----");
    console.log ("     |     |");
    console.log (`  ${this.squares['4']}  |  ${this.squares['5']}  |  ${this.squares['6']}`);
    console.log ("     |     |");
    console.log ("-----+-----+-----");
    console.log ("     |     |");
    console.log (`  ${this.squares['7']}  |  ${this.squares['8']}  |  ${this.squares['9']}`);
    console.log ("     |     |");
    console.log ("");
  }

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter (key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}

class Player {
  static GAMES_TO_WIN = 3;
  constructor(marker) {
    this.marker = marker;
    this.wins = 0;
  }

  getMarker() {
    return this.marker;
  }

  updateWins() {
    this.wins += 1;
  }

  getWins() {
    return this.wins;
  }

  isMatchWinner() {
    return this.wins === Player.GAMES_TO_WIN;
  }

  resetWins() {
    this.wins = 0;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static VALID_YES_OR_NO = ['yes', 'no', 'y', 'n'];

  play() {
    this.displayWelcomeMessage();
    this.board.display();

    while (true) {
      while (true) {
        this.playOneGame();
        if (this.human.isMatchWinner() || this.computer.isMatchWinner()) break;
        readline.question('=> click any button to continue');
        this.restartGame();
      }

      this.displayMatchResults();
      if (!this.playAgain()) break;
      this.restartMatch();
      prompt("Let's play again!");
    }

    this.displayGoodbyeMessage();
  }

  displayMatchResults() {
    if (this.human.isMatchWinner()) {
      prompt('Congratulations! you won the match');
    } else {
      prompt ('I won the match! Take that human');
    }
  }
  restartGame() {
    this.board.reInitalize();
    this.board.displayWithClear();
  }

  restartMatch() {
    this.board.reInitalize();
    this.board.displayWithClear();
    this.human.resetWins();
    this.computer.resetWins();
  }

  firstPlayer() {
    let choice;
    while (true) {
      prompt ('would you like to go first?');
      choice = readline.question('=>').toLowerCase();

      if (TTTGame.VALID_YES_OR_NO.includes(choice)) break;

      prompt("You've chosen an invalid answer, try again.");
    }

    if (choice[0] === 'y') {
      return this.human;
    } else {
      return this.computer;
    }
  }

  playerMoves(player) {
    if (player.getMarker() === Square.HUMAN_MARKER) {
      this.humanMoves();
    } else {
      this.computerMoves();
    }
  }

  togglePlayer(player) {
    if (player.getMarker() === Square.HUMAN_MARKER) {
      return this.computer;
    } else {
      return this.human;
    }
  }

  playOneGame() {
    let currentPlayer = this.firstPlayer();

    while (true) {
      this.playerMoves(currentPlayer);
      if (this.gameOver()) break;

      this.board.displayWithClear();
      currentPlayer = this.togglePlayer(currentPlayer);
    }
    this.board.displayWithClear();
    this.displayGameResults();
    this.displayScore();
  }

  displayScore() {
    prompt(`The current score is: `);
    prompt (`You: ${this.human.getWins()} games.`);
    prompt (`Me: ${this.computer.getWins()} games.`);
  }

  updateScore(winner) {
    winner.updateWins();
  }

  displayGameResults() {
    if (this.isWinner(this.human)) {
      prompt("You won this game! Congratulations!");
      this.updateScore(this.human);
    } else if (this.isWinner(this.computer)) {
      prompt("I won this game! Take that, human!");
      this.updateScore(this.computer);
    } else {
      prompt("A tie game. How boring.");
    }
  }

  playAgain() {
    let choice;

    while (true) {
      prompt('Would you like to play again?');
      choice = readline.question('=> ').toLowerCase();
      if (TTTGame.VALID_YES_OR_NO.includes(choice)) break;

      prompt("You've entered an invalid choice, choose again");
    }

    return choice[0] === 'y';

  }

  displayWelcomeMessage() {
    console.clear();
    prompt('Welcome to Tic Tac Toe!');
    console.log("");
  }

  static joinOr(array, delimeter = ', ', joining = 'or') {
    if (array.length === 1) {
      return array[0];
    }

    return array.slice(0,array.length - 1).join(delimeter) +
    ` ${joining} ${array[array.length - 1]}`;
  }

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      prompt(`Choose a square (${TTTGame.joinOr(validChoices)}): `);
      choice = readline.question('=>');

      if (validChoices.includes(choice)) break;

      prompt("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerStrategicMovePlayer(strategy) {
    if (strategy === 'offensive') {
      return [this.computer, Square.COMPUTER_MARKER];
    } else {
      return [this.human, Square.HUMAN_MARKER];
    }
  }
  computerStrategicMove(strategy) {
    let [player, marker] = this.computerStrategicMovePlayer(strategy);

    let potentialWinningRows = TTTGame.POSSIBLE_WINNING_ROWS.filter(row => {
      return this.board.countMarkersFor(player, row) === 2;
    });

    while (potentialWinningRows.length > 0) {
      if (!(this.board.rowIsFull(potentialWinningRows[0]))) {
        break;
      } else {
        potentialWinningRows.shift();
      }
    }

    if (potentialWinningRows.length === 0) {
      return undefined;
    }

    return potentialWinningRows[0].filter(squareNumber => {
      return !(this.board.squares[squareNumber].getMarker() === marker);
    })[0];
  }

  pickCenterSquare() {
    return this.board.squares['5'].isUnused() ? '5' : undefined;
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice = this.computerStrategicMove('offensive');

    choice = choice || this.computerStrategicMove('defensive');

    choice = choice || this.pickCenterSquare();

    if (!choice) {
      do {
        choice = Math.floor((9 * Math.random()) + 1).toString();
      } while (!validChoices.includes(choice));
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ];

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayGoodbyeMessage() {
    prompt('Thanks for playing Tic Tac Toe! Goodbye!');
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}

let game = new TTTGame();
game.play();


