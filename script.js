let myLibrary = [

];

const bookShelf = document.querySelector(".book-shelf");
const addBtn = document.querySelector(".add-book-btn");
const title = document.getElementsByName("title");


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
    myLibrary.push(
        new Book(title, author, read, category, subcategory, found, notes)
    )
}


addBtn.addEventListener('click', (e) => {
    addBookToLibrary(
        document.querySelector("#title").value, 
        document.querySelector("#author").value, 
        document.querySelector("#author").value, 
        document.querySelector("#category").value, 
        document.querySelector("#subcategory").value, 
        document.querySelector("#found").value, 
        document.querySelector("#notes").value
    )
})