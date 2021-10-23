function createBook (title, author, read = false) {
  let newBook = {
    title: title,
    author: author,
    read,

    getDescription() {
      if (this.read) {
        return `${this.title} was written by ${this.author}. I have read it.`;
      } else {
        return `${this.title} was written by ${this.author}. I haven't read it.`;
      }
      
    },

    readBook() {
      this.read = true;
    },
  };

  return newBook;
}

let myThos = createBook ('Mythos', 'Stephen Fry');
console.log (myThos.getDescription());

let book2 = createBook ('Me Talk Pretty One Day', 'David Sedaris');
console.log (book2.getDescription());

let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
console.log (book3.getDescription());

book3.readBook();
console.log(book3.getDescription());