const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Books = require('../models/bookModel')
const {body, validationResult} = require('express-validator')


//Get all the books
router.get('/fetchAllBooks',fetchUser,  async (req,res)=>{
    try {
            const ideas = await Books.find({user : req.user.id})
            res.json(ideas)   
    } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server error');   
    }
     
})

router.get('/fetchAllBooksofAll', async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error');
    }
});

//GET total books Count
router.get('/getTotalBooksCount', fetchUser, async (req, res) => {
    try {
      const totalBooksCount = await Books.countDocuments({ user: req.user.id });
  
      res.json({ totalBooksCount });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

  //Add a Book
router.post('/addBook', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be at least 5 characters in length').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, cover, amount, contact, author } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const book = new Books({
            title,
            description,
            cover,
            amount,
            contact,
            author,
            user: req.user.id
        });
        const savedIdea = await book.save();
        res.json(savedIdea);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error');
    }
});

//DELETE THE BOOK
router.delete('/deletebook/:id', fetchUser, [], async (req, res) => {
        
    
    try {
        // Find the book to be deleted
        let book = await Books.findById(req.params.id);
 
        if (!book) {
            return res.status(404).send('Book not found');
        }

        if (book.user.toString() !== req.user.id) {
            return res.status(400).send('Not allowed'); 
        }

        // Delete the book
        book = await Books.findByIdAndDelete(req.params.id);
        res.status(200).send('Book has been deleted')
    } catch (error) {
        console.error(error.message); 
        res.status(500).send('Internal Server error');
    }
});
module.exports = router