let myLibrary = [

];

const bookShelf = document.querySelector(".book-shelf");
let numBooksOnShelf = document.querySelectorAll(".book").length;
const addBtn = document.querySelector(".add-book-btn");

const title =document.querySelector("#title");
const author = document.querySelector("#author");
const radioResponses = document.getElementsByName('read');
const category = document.querySelector("#category");
const subcategory = document.querySelector("#subcategory");
const found = document.querySelector("#found");
const notes = document.querySelector("#notes");

function Book(title, author, read, category, subcategory, found, notes) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.category = category;
    this.subcategory = subcategory;
    this.found = found;
    this.notes = notes;
}

function addBookToLibrary(title, author, read, category, subcategory, found, notes) {
    // Add book to library array
    let newBook = new Book(title, author, read, category, subcategory, found, notes);
    myLibrary.push(newBook)
    
    // Build book container and add to DOM
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    numBooksOnShelf += 1;
    bookDiv.setAttribute('id', "book-" + numBooksOnShelf);
    bookShelf.appendChild(bookDiv);

    // Add book details to book container
    let newlyAddedBook = document.querySelector("#book-" + numBooksOnShelf);
    let bookKeys = Object.keys(newBook);
    for (let i = 0; i < Object.keys(newBook).length; i++) {
        let bookDetail = document.createElement("div");
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
    addBookToLibrary(
        title.value, author.value, radioResult, 
        category.value, subcategory.value, found.value, 
        notes.value
    );


})