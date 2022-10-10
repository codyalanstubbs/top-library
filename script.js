let myLibrary = [

];

const bookShelf = document.querySelector(".book-shelf");
let numBooksOnShelf = document.querySelectorAll(".book").length;
const addBtn = document.querySelector(".add-book-btn");

const title =document.querySelector("#title");
const author = document.querySelector("#author");
const radioResponses = document.getElementsByName('read');

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(title, author, read) {
    // Add book to library array
    let newBook = new Book(title, author, read);
    myLibrary.push(newBook)
    
    // Build book container and add to DOM
    let bookDiv = document.createElement("tr");
    bookDiv.className = "book";
    numBooksOnShelf += 1;
    bookDiv.setAttribute('id', "book-" + numBooksOnShelf);
    bookShelf.appendChild(bookDiv);

    // Add book details to book container
    let newlyAddedBook = document.querySelector("#book-" + numBooksOnShelf);
    let bookKeys = Object.keys(newBook);
    for (let i = 0; i < Object.keys(newBook).length; i++) {
        let bookDetail = document.createElement("td");
        bookDetail.className = bookKeys[i];
        bookDetail.textContent = newBook[bookKeys[i]];
        newlyAddedBook.appendChild(bookDetail);
    }
}


addBtn.addEventListener('click', (e) => {

    // Find the radio response
    let radioResult;

    for (let i = 0; i < radioResponses.length; i++) {
        if (radioResponses[i].checked) {
            radioResult = radioResponses[i].value;
        }
    }

    // Add book to library
    addBookToLibrary(title.value, author.value, radioResult);


})