const router = require('express').Router();
const Book = require('../models/bookModel');
const authMiddleware = require('../middlewares/authMiddleware');

//add a Book
router.post('/addBook', authMiddleware, async (req, res) => {
    try{
        const newbook= new Book(req.body);
        newbook.availableCopies= newbook.totalCopies;
        await newbook.save();
        return res.send({
            success: true,
            message: 'Book added successfully'
        });
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success: false,
            message: e.message
        });
    }
}
);

//update a book

router.put('/update-book', authMiddleware, async (req, res) => {
    try{ 
        await Book.findByIdAndUpdate(req.body._id, req.body);
        return res.send({
            success: true,
            message: 'Book updated successfully'
        });
    }
    catch(e){
        return res.send({  success: false, message: e.message });

    }
});

//delete a book

router.delete('/delete-book/:id', authMiddleware, async (req, res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        return res.send({
            success: true,
            message: 'Book deleted successfully'
        });
    }
    catch(e){
        return res.send({
            success: false,
            message: e.message
        })
    }
});

//get-all-books

router.get('/getAllBooks', authMiddleware, async (req, res) => {

    try {
        const books = await Book.find();
        return res.send({
            success: true,
            data: books
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

//get-book-by-id

router.get('/get-book-by-id/:id', authMiddleware, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        return res.send({
            success: true,
            data: book
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;
