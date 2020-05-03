const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//middleware for try/catch blocks
function asyncHandler(cb){
    return async (req, res, next)=>{
        try {
            await cb(req,res, next);
        } catch(err){
            next(err);
        }
    };
}

//root get, render index.pug
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["title", "ASC"]] });
    res.render("index", { books, title: "Book Details" });
}));

//books get, render index.pug
router.get('/books', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["title", "ASC"]] });
    res.render("index", { books, title: "Book Details" });
}));

//books/new get, render new-book.pug
router.get('/new', asyncHandler(async (req, res) => {
    res.render("new-book", { book: {}, title: "New Book" });
}));

//books/new post, create new book, render form-error.pug if error
router.post('/new', asyncHandler(async (req, res) => {
    try {
        await Book.create(req.body);
        res.redirect("/books/");
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            const book = await Book.build(req.body);
            res.render("form-error-new", { book, errors, title: "New Book" });
        } else {
            throw error;
        }
    }
}));

//books/:id get, render update-book.pug
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.render("update-book", { book, title: book.title });
}));

//books/:id post, update book then redirect to index.pug
router.post('/:id', asyncHandler(async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        await book.update(req.body);
        res.redirect("/books/");
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            const book = Book.build(req.body);
            book.id = req.params.id
            res.render("form-error-update", { book, errors, title: book.title });
        } else {
            throw error;
        }
    }
}));

//books/:id/delete post, delete book then redirect to index.pug
router.post("/:id/delete", asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
}))

module.exports = router;