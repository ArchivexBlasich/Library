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

function addBookToLibrary(book) {
    myLibrary.push(new Book(book.title, book.author, book.pages, book.read));
}

function showBooksInLibrary(library) {
    console.table(library);
}

/*-------- Auxiliary Functions ----------*/
function getBookFromInputs(inputs) {
    let bookTitle, bookAuthor, bookPages, bookRead;
    let book = [];
    for (const input of inputs) {
        if (input.name === "bookRead") {
            book.push(input.checked);
            continue;
        }
        book.push(input.value);
    }

    [bookTitle, bookAuthor, bookPages, bookRead] = book;

    return {
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages,
        read: bookRead,
    };
}

function renderNewBook(book) {
    let bookHTML = `
    <div class="book-container">
            <div class="book">
                <div class="book-shape-divider-top">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                            class="shape-fill"></path>
                    </svg>
                </div>

                <p class="title">Title: ${capitalizeWords(book.title)}</p>
                <p class="author">Author: ${capitalizeWords(book.author)}</p>
                <p class="pages">Pages: ${book.pages}</p>
                <p class="read">Read: ${(book.read) ? 'Yes' : "No"}</p>

                <div class="book-shape-divider-bottom ">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                            class="shape-fill"></path>
                    </svg>
                </div>
            </div>
        </div>
    `;
    String.c

    let pageMainSection = document.querySelector(".main");
    pageMainSection.insertAdjacentHTML("beforeend", bookHTML);

    return;
}

function capitalizeWords(sentence) {
  if (sentence.length === 0) {
    return ""; // Handle empty strings
  }
  return sentence.split(' ').map(word => {
    if (word.length === 0) {
      return ""; // Handle empty words
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

/*------------- Page general functionality and DOM manipulation ----------------- */
const newBookBtn = document.querySelector(".new-book-btn");

const modal = document.querySelector("#new-book-modal");

const bookTitleInput = document.querySelector("dialog input[name='bookTitle']");
const bookAuthorInput = document.querySelector("dialog input[name='bookAuthor']");
const bookPagesInput = document.querySelector("dialog input[name='book-pages']");
const bookReadInput = document.querySelector("dialog input[name='bookRead']");

const addBookModalBtn = document.querySelector(".add-book-modal-btn");
const cancelModalBtn = document.querySelector(".cancel-modal-btn");

newBookBtn.addEventListener("click", () => modal.showModal());
cancelModalBtn.addEventListener("click", (e) => {
    /* Without an action, submitting the form via the default GET method causes a page to reload.
     We use JavaScript to prevent the submission and close the dialog with the 
     event.preventDefault() and HTMLDialogElement.close() methods, respectively.*/
    e.preventDefault()
    modal.close()
});

addBookModalBtn.addEventListener("click", (event) => {
    let isSomeInputEmpty = false;
    let formInputs = document.querySelectorAll("dialog form > div input");
    formInputs = Array.from(formInputs);
    formInputs.forEach((input) => {
        if (!input.value) {
            isSomeInputEmpty = true;
        }
    });
    if (isSomeInputEmpty === true) {
        return;
    } else {
        event.preventDefault(); // We don't want to submit this fake form
        let book = getBookFromInputs(formInputs);
        addBookToLibrary(book);
        renderNewBook(book);
        modal.close("Book was added"); // Have to send the select box value here.
    }
});

modal.addEventListener("close", (e) => {
    if (!modal.returnValue) {
        return;
    }
    console.log(modal.returnValue)
    console.table(myLibrary);
});

// This Event Listener close the modal when this is press out of its area
modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        modal.close();
    }
});