const readline = require('readline-sync');

function prompt(message) {
  console.log (`=> ${message}`);
}

let Square = {
  UNUSED_SQUARE: " ",
  HUMAN_MARKER : "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

let Board = {
  init() {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = Object.create(Square).init();
    }

    return this;
  },

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
  },

  displayWithClear() {
    console.clear();
    console.log("");
    console.log("");
    this.display();
  },

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter (key => this.squares[key].isUnused());
  },

  isFull() {
    return this.unusedSquares().length === 0;
  },

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  },
};

let PlayerPrototype = {
  initalizer(marker) {
    this.marker = marker;
    return this;
  },

  getMarker() {
    return this.marker;
  },
};

let Human = Object.create(PlayerPrototype);

Human.init = function() {
  return this.initalizer(Square.HUMAN_MARKER);
};

let Computer = Object.create(PlayerPrototype);

Computer.init = function() {
  return this.initalizer(Square.COMPUTER_MARKER);
};

let TTTGame = {
  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Human).init();
    this.computer = Object.create(Computer).init();

    return this;
  },

  play() {
    this.displayWelcomeMessage();

    this.board.display();
    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;
      this.board.displayWithClear();
    }

    this.board.displayWithClear();
    this.displayResults();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    prompt('Welcome to Tic Tac Toe!');
    console.log("");
  },

  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      prompt(`Choose a square (${validChoices.join(", ")}): `);
      choice = readline.question();

      if (validChoices.includes(choice)) break;

      prompt("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  POSSIBLE_WINNING_ROWS: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ],

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  displayGoodbyeMessage() {
    prompt('Thanks for playing Tic Tac Toe! Goodbye!');
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      prompt("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      prompt("I won! I won! Take that, human!");
    } else {
      prompt("A tie game. How boring.");
    }
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },
};

let game = Object.create(TTTGame).init();
game.play();



