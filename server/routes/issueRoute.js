const router = require('express').Router();
const Issue = require('../models/issueModel');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const authMiddlewre = require('../middlewares/authMiddleware');
const { isMoment } = require('moment');


// Create a new issue

router.post('/IssueBook', authMiddlewre, async (req, res) => {
   try {
    console.log("in issue book")
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
   
    const newIssue = new Issue(req.body);
    await newIssue.save();
    console.log(newIssue.returnedDate)
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

router.get('/getIssues', authMiddlewre, async (req, res) => {
    try {
        console.log("Getting issues....")
        const issues = await Issue.find().populate('book').populate('issuedTo').populate('issuedBy');
        return res.send({
            success: true,
            message: "Issues fetched successfully",
            data: issues
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/getIssuesByBook/:id',authMiddlewre, async (req, res)=>{
    try {
        console.log("Getting issues....")
     
        
        const issue= await Issue.find({book: req.params.id}).populate('book').populate('issuedTo').populate('issuedBy');
        
       
        return res.send({
            success: true, 
            data : issue
        })
        
    } catch (error) {
            return res.send(
                {
                    success: false,
                    message: error.message
                }
            )
    }
})

router.post('/returnBook', authMiddlewre, async (req, res)=>{
    try {
        console.log("in return book" + req.body._id)
        const issue = req.body;
        if (!issue) {
            return res.send({
                success: false,
                message: 'Issue not found'
            });
        }
        await Book.findOneAndUpdate({
            _id: issue.book
        },
        {
            $inc: { availableCopies: 1 }
        })
        await Issue.findOneAndUpdate({
            _id: issue._id
        },
        {
            returnedDate: issue.returnedDate,
            fine: issue.fine,
            status: 'inactive'
        });
        console.log(issue.returnedDate)
        return res.send({
            success: true,
            message: 'Book returned successfully'
        });

    } catch (error) {
        console.log(error)
        return res.send({
            success: false,
            message: error.message
        });
    }
}
);

router.get('/getIssuesByUser/:id',authMiddlewre, async (req, res)=>{
    try {
        const issue= await Issue.find({issuedTo: req.params.id}).populate('book').populate('issuedTo').populate('issuedBy');
        return res.send({
            success: true,
            data: issue
        }); 
        
    } catch (error) {
        return res.send(
            {
                success: false,
                message: error.message
            }
        )
    }

});


router.post('/deleteIssue',authMiddlewre, async (req,res)=>{
    try {
        const issue= await Issue.findByIdAndDelete(req.body._id);
        const book= await Issue.findOneAndUpdate({
            _id: req.body.book
        },
        {
            $inc:{
                availableCopies: 1
            }
        }
    ); 

    return res.send({
        success: true,
        message: "Issue removed Successfully"
    })
        
        
    } catch (error) {
        
    }
})

router.post('/editIssue',authMiddlewre, async (req,res)=>{
    try {
        console.log(req.body)
        const issue = await Issue.findByIdAndUpdate(req
            .body.id, {
                returnDate: req.body.returnDate,
            });
            console.log(req.body.returnDate)
        return res.send({
            success: true,
            message: "Issue updated successfully"
        });
    } catch (error) {
            
        }
    
})


module.exports = router;

