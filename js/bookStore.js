

class Book {
    constructor(title, author, isbn) {
        this.title =title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBook(book) {

        const row = document.createElement('tr');

        const bookList = document.getElementById('book-list');

        const data =   
        `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <button data-isbn=${book.isbn} class="btn btn-danger btn-sm remove-book">
                <i class="fas fa-times"></i>
            </button>
        </td>`;

        row.innerHTML = data;
        

        bookList.appendChild(row);

    }

    clearFileds() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';    
    }

    removeBook(target) {
        if(target.classList.contains('remove-book')) {

            if(confirm('Are you sure to remove this book?')) {
                target.parentElement.parentElement.remove();
                return true;
            }
            return false;  
        }
        return false;
    }

    validation(book) {

        if(book.title == '') {
            const title = document.getElementById('title');
            title.classList.add('is-invalid');
            return false;
        } else {
            const title = document.getElementById('title');
            title.classList.remove('is-invalid');
        }

        if(book.author == '') {
            const author = document.getElementById('author');
            author.classList.add('is-invalid');
            return false;
        } else {
            const author = document.getElementById('author');
            author.classList.remove('is-invalid');
        }
        if(book.isbn == '') {
            const isbn = document.getElementById('isbn');
            isbn.classList.add('is-invalid');
            return false;
        }else {
            const isbn = document.getElementById('isbn');
            isbn.classList.remove('is-invalid');
        }

        return true;

    }

    showNotification(message, className) {

        const container = document.getElementById('notifyMe');
        const notify = 
        `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

      container.innerHTML = notify;

      setTimeout(function() {
        container.innerHTML = null;
    }, 1000);

    }


}

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBookList() {
        let books =Store.getBooks();
        let ui = new UI();
        books.forEach((book) => {
            //Add Book to UI
           ui.addBook(book);
        });

    }

    static storeBook(book) {
        let books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(target) {

        const isbn = target.parentElement.previousElementSibling.textContent;
    

        let books = Store.getBooks();

        debugger;
        books.forEach((book, index) => {
            debugger;
            if(book.isbn == isbn) {
                books.splice(index , 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }


}