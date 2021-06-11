const path = require('path'); //for images
const express = require('express');
const cloudinary = require('../../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid'); //for images
const router = express.Router();
const multer = require('multer'); //for images

// Load Book model
const Book = require('../../models/Book');

//For file unlinking
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


//Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

//end

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, isbn, author, description, publisher } = req.body;
    const book = new Book({
      title,
      isbn,
      author,
      description,
      publisher,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });
    await book.save();
    res.send('file uploaded successfully.');
    await unlinkAsync(req.file.path);
  } catch (error) {
    res.status(400).send('Error while uploading file. Try again later.');
  }
},
(error, req, res, next) => {
  if (error) {
    res.status(500).send(error.message);
  }
}
);

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    // Find user by id
    let book = await Book.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(book.cloudinary_id);
    // Delete book from db
    await book.remove();
    res.json({ mgs: 'Book entry deleted successfully' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;