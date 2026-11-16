
const express = require('express');

const app = express();

app.use(express.json());

// Sample book collection
let books = [
    { id: 1, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// 1. GET - Display all books
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. POST - Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.json(newBook);
});

// 3. PUT - Update a book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// 4. DELETE - Remove a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    books = books.filter(b => b.id !== id);

    res.send("Book deleted successfully");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
