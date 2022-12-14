class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

let myLibrary = [
    new Book("Antifragility", "Nassim Nicholas Taleb", "Read"),
    new Book("The Hobbit", "J.R.R. Tolkien", "Read"),
    new Book("Theory of Instruction", "Siegfried Engelmann and Douglas Carnine", "Not Read")
];

const bookShelf = document.querySelector(".book-shelf");
let numBooksOnShelf = 0;
const displayFormBtn = document.querySelector(".display-form-btn");
const addBookForm = document.querySelector(".add-book-form");
const errorMessage = document.querySelector(".error");
const addBtn = document.querySelector(".add-book-btn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const radioResponses = document.getElementsByName('read');

// Build bookshelf UI from current books
myLibrary.forEach((book) => {
    addBookToLibrary(book);
})
function checkIfEmpty(inputElement) {
    if (inputElement.value === '') {
        if (!inputElement.classList.contains("empty")) {
            inputElement.classList.toggle("empty");
        } 
    } else {
        inputElement.classList.remove("empty");
    }
}
function addEmptyFocusOutEvent(inputElement) {
    inputElement.addEventListener("focusout", (e) => {
        checkIfEmpty(inputElement);
    })
}

[title, author].forEach(inputElement => addEmptyFocusOutEvent(inputElement));

addBtn.addEventListener('click', (e) => {
    // Find the radio response
    let radioResult;

    for (let i = 0; i < radioResponses.length; i++) {
        if (radioResponses[i].checked) {
            radioResult = radioResponses[i].value;
        }
    }
    
    if (author.value === '' || title.value === '') {
        [title, author].forEach(inputElement => checkIfEmpty(inputElement));
    } 
    
    if (radioResult === undefined) {
        if (!document.querySelector(".readStatus > fieldset > *").classList.contains("empty")) {
            document.querySelector(".readStatus > fieldset > *").classList.toggle("empty");
        }
    } 

    if (author.value === '' || title.value === '' || radioResult === undefined) {
        // Do nothing
        errorMessage.textContent = "Please fill out each input below."
        addBookForm.insertBefore(errorMessage, addBookForm.firstChild)
    } else {
        errorMessage.textContent = ""
        title.classList.remove("empty");
        author.classList.remove("empty");
        document.querySelector(".readStatus > fieldset > *").classList.remove("empty");

        // Add book to library
        let newBook = new Book(title.value, author.value, radioResult);
        myLibrary.push(newBook);
        addBookToLibrary(newBook);

        // Remove inputs 
        title.value = '';
        author.value = '';
        for (let i = 0; i < radioResponses.length; i++) {
            if (radioResponses[i].checked) {
                radioResponses[i].checked = false;
            }
        }

    }
})



displayFormBtn.addEventListener('click', (e) => {
    addBookForm.classList = 'add-book-form';
    displayFormBtn.classList = 'hidden';
})

function addBookToLibrary(book) {

    // Build book container and add to DOM
    let bookRow = document.createElement("tr");
    let bookIdNumber = numBooksOnShelf;
    bookRow.className = "book";
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
            if (book[bookKeys[i]] == "Read") {
                readButton.classList = "read-btn read";
            } else {
                readButton.classList = "read-btn";
            }
            readButton.setAttribute('id', numBooksOnShelf);
            readButton.addEventListener('click', (e) => {
                readButton.classList.toggle("read");
            });
            bookDetail.appendChild(readButton);
        } else {
            bookDetail.textContent = book[bookKeys[i]];
        }

        newlyAddedBook.appendChild(bookDetail);
    }

    // Build book's delete button
    let deleteButtonCell = document.createElement("td");
    deleteButtonCell.classList = "delete"
    let bookDeleteButton = document.createElement("button");
    bookDeleteButton.classList = "delete-btn";
    bookDeleteButton.textContent = "X";
    bookDeleteButton.setAttribute('id', numBooksOnShelf);
    bookDeleteButton.addEventListener('click', (e) => {
        deleteBook(bookDeleteButton.id);
        updateBookIds();
    });

    deleteButtonCell.appendChild(bookDeleteButton);
    newlyAddedBook.appendChild(deleteButtonCell);

    numBooksOnShelf += 1;
}

function deleteBook(bookId) {
    let books = document.querySelectorAll(".book");
    books.forEach((book) => {
        if (book.id == "book-" + bookId) {
            book.remove();
            myLibrary.splice(book.id, 1);
        }
    })
}

function updateBookIds() {
    let updatedBooks = document.querySelectorAll(".book");
    let updatedDelBtns = document.querySelectorAll(".delete-btn");
    let updatedReadBtns = document.querySelectorAll(".read-btn");
    for (let i = 0; i < updatedBooks.length; i++) {
        updatedBooks[i].setAttribute('id', 'book-' + i);
        updatedDelBtns[i].setAttribute('id', i);
        updatedReadBtns[i].setAttribute('id', i);
    }
}