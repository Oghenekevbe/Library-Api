const Books = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

// @desc Create new book
// @route POST /api/books
// @access Public
const createBook = asyncHandler(async (req, res) => {
    const { title, author, description, tags, readCount, currentReaders } = req.body;

    // Validate title
    if (!title) {
        return res.status(400).json({ message: "You must include a title" });
    }

    try {
        const book = new Books({
            title,
            author,
            description,
            tags,
            readCount,
            currentReaders
        });

        await book.save();
        res.status(201).json({ book });
    } catch (error) {
        res.status(500).json({ message: "Error creating book" });
    }
});



//@desc get all books
//@route GET /api/books
// @access public
const getBooks = asyncHandler(async (req, res) => {
    const books = await Books.find();
    if (!books) {
        res.status(404);
        throw new Error("Books are unavailable at the moment");
    }
    res.status(200).json(books);
});

//@desc get a book
//@route GET /api/books/:id
// @access public
const getBook = asyncHandler(async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("There is no book wth this ID");
    }
    res.status(200).json(book);
});


//@desc update a book
//@route PUT /api/books/:id
// @access public
const updateBook = asyncHandler(async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("There is no book wth this ID");
    }
    const updatedbook = await Books.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    );
    res.status(200).json(updatedbook);
});



//@desc delete a book
//@route DEL /api/books/:id
// @access public
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Books.findById(req.params.id);
    if (!book) {
        res.status(404);
        throw new Error("There is no book wth this ID");
    }
    const deletedBook = await Books.findByIdAndDelete(
        req.params.id, req.body, { new: true }
    );
    res.status(200).json({ message: `${deletedBook.title} has been deleted from the database` });
});




























module.exports = { createBook, getBooks, getBook, updateBook, deleteBook };
