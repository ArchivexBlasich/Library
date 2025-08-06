const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages}, ${(this.read) ? "read" : "not read yet"}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}


addBookToLibrary("Don Quijote", "Milei", "267", false);
addBookToLibrary("Fundamentos de Redes", "Saade", "350", true);
addBookToLibrary("Sistemas operativos", "Dinosaurio", "1000", false);

console.log(myLibrary);