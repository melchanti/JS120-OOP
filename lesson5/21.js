const readline = require('readline-sync');

function prompt(message) {
  console.log (`=> ${message}`);
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    let cardSuit;
    switch (this.suit) {
      case 'H':
        cardSuit = 'Hearts';
        break;
      case 'D':
        cardSuit = 'Diamonds';
        break;
      case 'S':
        cardSuit = 'Spades';
        break;
      case 'C':
        cardSuit = 'Clubs';
    }

    return (`${this.rank} of ${cardSuit}`);
  }

  getRank() {
    return this.rank;
  }

  cardValue() {
    switch (this.rank) {
      case 'A':
        return 11;
      case 'J':
        return 10;
      case 'Q':
        return 10;
      case 'K':
        return 10;
      default:
        return Number(this.rank);
    }
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.reinitalize();
  }

  reinitalize() {
    this.cards = [];
    let suits = ['H', 'S', 'D', 'C'];
    let numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    suits.forEach(suit => {
      numbers.forEach(number => {
        this.cards.push(new Card(suit, number));
      });
    });
    this.shuffle();
  }
  shuffle() {
    for (let index = this.cards.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [this.cards[index], this.cards[otherIndex]] =
      [this.cards[otherIndex], this.cards[index]]; // swap elements
    }
  }

  deal() {
    return this.cards.shift();
  }
}

class Participant {
  static INITIAL_SCORE = 0;
  static MAX_SCORE = 21;

  constructor() {
    this.hand = [];
    this.score = Participant.INITIAL_SCORE;
  }

  hit(card) {
    this.hand.push(card);
  }

  joinAnd(array, delimeter = ', ', joining = 'and') {
    if (array.length === 1) {
      return array[0];
    }
    return array.slice(0,array.length - 1).join(delimeter) +
    ` ${joining} ${array[array.length - 1]}`;
  }

  showCards() {
    return this.joinAnd(this.hand);
  }

  getCards() {
    return this.hand;
  }

  calculateScore() {
    let sum = this.hand.reduce((accum, card) => {
      accum += card.cardValue();
      return accum;
    }, 0);
    let cardsWithAce = this.hand.filter(card => card.getRank() === 'A');

    cardsWithAce.forEach (_ => {
      if (sum > Participant.MAX_SCORE) sum -= 10;
    });
    this.score = sum;
  }

  getScore() {
    this.calculateScore();

    return this.score;
  }

  isBusted() {
    return this.score > Participant.MAX_SCORE;
  }

  reinitalize() {
    this.hand = [];
  }

  isMaxScore() {
    return this.score === Participant.MAX_SCORE;
  }
}

class Player extends Participant {
  static INITIAL_MONEY = 5;
  constructor() {
    super();
    this.money = Player.INITIAL_MONEY;
  }

  getMoney() {
    return this.money;
  }

  displayMoney() {
    prompt (`You've $${this.money} left`);
  }

  updateMoney(value) {
    this.money += value;
  }
}

class Dealer extends Participant {
  static MIN_SCORE = 17;

  showOneCard() {
    return this.hand[0];
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    console.clear();
    this.displayWelcomeMessage();
    prompt (`You've $${this.player.getMoney()} to start with.`);

    while (true) {
      this.playOneRound();
      if (!this.playAgain()) break;
      this.reinitalize();
    }
    this.displayGoodbyeMessage();
  }

  moneyLimit() {
    if (this.player.getMoney() === 0) {
      prompt ("You don't have any more money. GAME OVER!");
      return false;
    } else if (this.player.getMoney() === 10) {
      prompt ("You have $10!!! That's the maximum you can win today");
      return false;
    } else {
      return true;
    }
  }

  playAgain() {
    readline.question('=> Hit enter to continue');
    console.clear();
    const VALID_YES_NO = ['yes', 'no', 'y', 'n'];
    let choice;

    if (!this.moneyLimit()) {
      return false;
    }

    prompt (`You've $${this.player.getMoney()} left.`);
    while (true) {
      prompt ('Would you like to play again?');
      choice = readline.question('=> ').toLowerCase();

      if (VALID_YES_NO.includes(choice)) break;
      prompt ("You've entered an invalid answer");
    }

    return choice[0] === 'y';
  }

  playOneRound() {
    this.dealCards();
      this.showCards();
      this.playerTurn();
      if (!this.player.isBusted() && !this.player.isMaxScore()) {
        this.dealerTurn();
      }
      this.displayRoundResults();
  }

  reinitalize() {
    this.deck.reinitalize();
    this.player.reinitalize();
    this.dealer.reinitalize();
    prompt('Reshuffling deck');
    readline.question('=> Press enter to continue');
    console.clear();
  }
  dealCards() {
    prompt('Dealing cards');
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
    this.player.hit(this.deck.deal());
    this.dealer.hit(this.deck.deal());
    readline.question('=> Press enter to continue');
    console.clear();
  }

  showCards(currentRole = 'player') {
    prompt (`You've ${this.player.getCards().length} cards:`);
    prompt (`${this.player.showCards()}.`);
    prompt(`Your score is ${this.player.getScore()}`);

    console.log('');
    prompt(`Dealer has ${this.dealer.getCards().length} cards:`);

    if (currentRole === 'player') {
      prompt(`One of the cards is ${this.dealer.showOneCard()}`);
    } else {
      prompt(`${this.dealer.showCards()}.`);
      prompt(`Dealer score is ${this.dealer.getScore()}`);
      readline.question('=> Hit enter to continue');
    }
  }

  playerHit() {
    let choice;
    const VALID_HIT_OR_STAY = ['hit', 'stay', 'h', 's'];
    while (true) {
      prompt('Would you like to hit or stay');
      choice = readline.question('=> ').toLowerCase();
      console.clear();
      if (VALID_HIT_OR_STAY.includes(choice)) break;

      prompt ("You've entered an invalid choice");
    }

    return choice[0] === 'h';
  }

  playerTurn() {
    while (!this.player.isBusted() && !this.player.isMaxScore() && this.playerHit()) {
      console.clear();
      prompt ("You've chosen to hit.");
      this.player.hit(this.deck.deal());
      this.showCards('player');
    }

    if (this.player.isBusted()) return;

    if (this.player.isMaxScore()) return;

    prompt ("You've chosen to stay.");
    this.showCards('dealer');
  }

  dealerTurn() {
    while (!this.dealer.isBusted() && this.dealer.getScore() < Dealer.MIN_SCORE) {
      console.clear();
      this.dealer.hit(this.deck.deal());
      this.showCards('dealer');
    }
  }

  displayWelcomeMessage() {
    prompt ('Welcome to TWENTY-ONE where the goal is to win!!!');
  }

  displayGoodbyeMessage() {
    prompt ('Thank you for playing TWENTY-ONE, hope you join us again!!!');
  }

  displayRoundResults() {
    if (this.player.isBusted()) {
      prompt("You've busted!\n=> Dealer won!!!");
      this.player.updateMoney(-1);
    } else if (this.player.isMaxScore()) {
      prompt(`You've hit ${Participant.MAX_SCORE}, congratualtions you win!!!`);
      this.player.updateMoney(1);
    } else if (this.dealer.isBusted()) {
      prompt("Dealer has busted\n=> You've won congratulations!!!");
      this.player.updateMoney(1);
    } else {
      this.displayRoundScores();
    }
  }

  displayRoundScores() {
    prompt (`Your score is ${this.player.getScore()}.`);
    prompt (`Dealer score is ${this.dealer.getScore()}.`);
    if (this.player.getScore() > this.dealer.getScore()) {
      this.player.updateMoney(1);
      prompt("You've won!!! Congratulations");
    } else if (this.player.getScore() < this.dealer.getScore()) {
      this.player.updateMoney(-1);
      prompt ("Dealer won!!! YOU LOSE!!!");
    } else {
      prompt("It's a tie");
    }
  }
}

let game = new TwentyOneGame();
game.start();