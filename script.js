let myLibrary = [
    new Book("Antifragility", "Nassim Nicholas Taleb", "Read"),
    new Book("The Hobbit", "J.R.R. Tolkien", "Read"),
    new Book("Theory of Instruction", "Siegfried Engelmann and Douglas Carnine", "Not Read")
];

const bookShelf = document.querySelector(".book-shelf");
let numBooksOnShelf = 0;
const displayFormBtn = document.querySelector(".display-form-btn");
const addBookForm = document.querySelector(".add-book-form");
const addBtn = document.querySelector(".add-book-btn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const radioResponses = document.getElementsByName('read');

// Build bookshelf UI from current books
myLibrary.forEach((book) => {
    addBookToLibrary(book);
})

addBtn.addEventListener('click', (e) => {

    if (title.value === '' || author.value === '') {
        // Don't add book to library
    } else {
        // Find the radio response
        let radioResult;

        for (let i = 0; i < radioResponses.length; i++) {
            if (radioResponses[i].checked) {
                radioResult = radioResponses[i].value;
            }
        }

        if (radioResult === '' || radioResult === null) {
            // Don't add book to library
        } else {
            // Add book to library
            let newBook = new Book(title.value, author.value, radioResult);
            addBookToLibrary(newBook);
        }
    }


})

displayFormBtn.addEventListener('click', (e) => {
    addBookForm.classList = 'add-book-form';
    displayFormBtn.classList = 'hidden';
})

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(book) {
    // Add book to library array
    myLibrary.push(book)

    // Build book container and add to DOM
    let bookRow = document.createElement("tr");
    bookRow.className = "book";
    numBooksOnShelf += 1;
    bookRow.setAttribute('id', "book-" + numBooksOnShelf);
    bookShelf.appendChild(bookRow);

    // Add book details to book container
    let newlyAddedBook = document.querySelector("#book-" + numBooksOnShelf);
    let bookKeys = Object.keys(book);
    for (let i = 0; i < Object.keys(book).length; i++) {
        let bookDetail = document.createElement("td");
        bookDetail.className = bookKeys[i];

        // Create emoji buttons for read attribute only
        if (bookDetail.className === "read") {

            let readButton = document.createElement("button");

            // Change emoji displaying depending on read status
            if ( book[bookKeys[i]] == "Read") {
                readButton.classList = "read-btn";
                readButton.textContent = "✔️";
            } else {
                readButton.classList = "read-btn grey";
                readButton.textContent = "O";
            }
            
            bookDetail.appendChild(readButton);
        } else {
            bookDetail.textContent = book[bookKeys[i]];
        }

        newlyAddedBook.appendChild(bookDetail);
    }

    let deleteButtonCell = document.createElement("td");
    deleteButtonCell.classList = "delete"
    let bookDeleteButton = document.createElement("button");
    bookDeleteButton.classList = "delete-btn";
    bookDeleteButton.textContent = "X";
    deleteButtonCell.appendChild(bookDeleteButton);
    newlyAddedBook.appendChild(deleteButtonCell);
}