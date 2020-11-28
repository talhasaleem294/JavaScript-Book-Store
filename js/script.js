
Store.displayBookList();



const form = document.getElementById('book-form');

form.addEventListener('submit' , function(e) {

    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    

    const ui = new UI();

    const isValid = ui.validation(book);
    if(isValid) {
        ui.addBook(book);
        ui.showNotification('Book is saved', 'success');
        Store.storeBook(book);
        ui.clearFileds();
    }
});


document.getElementById('book-list').addEventListener('click', function(e) {
    e.preventDefault();

    const ui = new UI();
    const isRemoved = ui.removeBook(e.target);
    if(isRemoved) {
        ui.showNotification('Book is removed', 'success');
        Store.removeBook(e.target);
    }

});
