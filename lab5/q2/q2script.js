let xmlDoc;

// Load XML using AJAX
function loadBooks() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml", true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            xmlDoc = xhr.responseXML;
            displayBooks();
            showMsg("Books loaded successfully", "success");
        } else {
            showMsg("Failed to load XML", "error");
        }
    };

    xhr.send();
}

// Display Books
function displayBooks() {
    const table = document.getElementById("bookTable");
    table.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        const id = book.getElementsByTagName("id")[0].textContent;
        const title = book.getElementsByTagName("title")[0].textContent;
        const author = book.getElementsByTagName("author")[0].textContent;
        const status = book.getElementsByTagName("status")[0].textContent;

        table.innerHTML += `
        <tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td>${status}</td>
            <td><button onclick="deleteBook('${id}')">Delete</button></td>
        </tr>`;
    }
}

// Add Book
function addBook() {
    const id = bookId.value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const status = document.getElementById("status").value;

    if (!id || !title || !author) {
        showMsg("Fill all fields", "error");
        return;
    }

    const book = xmlDoc.createElement("book");

    book.appendChild(createNode("id", id));
    book.appendChild(createNode("title", title));
    book.appendChild(createNode("author", author));
    book.appendChild(createNode("status", status));

    xmlDoc.getElementsByTagName("books")[0].appendChild(book);
    displayBooks();
    showMsg("Book added (browser memory)", "success");
}

// Update Availability
function updateBook() {
    const id = bookId.value;
    const newStatus = document.getElementById("status").value;

    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.getElementsByTagName("status")[0].textContent = newStatus;
            displayBooks();
            showMsg("Status updated", "success");
            return;
        }
    }
    showMsg("Book not found", "error");
}

// Delete Book
function deleteBook(id) {
    const books = xmlDoc.getElementsByTagName("book");

    for (let book of books) {
        if (book.getElementsByTagName("id")[0].textContent === id) {
            book.parentNode.removeChild(book);
            displayBooks();
            showMsg("Book deleted", "success");
            return;
        }
    }
}

// Helper Function
function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.textContent = value;
    return node;
}

// Message Function
function showMsg(text, type) {
    const msg = document.getElementById("msg");
    msg.className = "msg " + type;
    msg.innerText = text;
}

// Load on start
loadBooks();
