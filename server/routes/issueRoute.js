const router = require('express').Router();
const Issue = require('../models/issueModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const authMiddlewre = require('../middlewares/authMiddleware');


// Create a new issue

router.post('/create', authMiddlewre, async (req, res) => {

   try {
    const book = await Book.findById(req.body.book);
    if (!book) {
        return res.send({
            success: false,
            message: 'Book not found'
        });
    }

    await Book.findOneAndUpdate({
        _id: req.body.book
    },
    {
        $inc: { availableCopies: -1 }
    })
    
    const newIssue = newIssue(req.body);
    await newIssue.save();
    return res.send({
        success: true,
        message: 'Issue created successfully'
    });

   } 
   catch (error) {
    return res.send(
        {
            success: false,
            message: error.message
        }
    )
   }

});


module.exports = router;

