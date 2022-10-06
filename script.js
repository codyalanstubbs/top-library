let myLibrary = [

];

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