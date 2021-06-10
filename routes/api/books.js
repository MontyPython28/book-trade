const path = require('path'); //for images
const express = require('express');
const { v4: uuidv4 } = require('uuid'); //for images
const router = express.Router();
const multer = require('multer'); //for images

// Load Book model
const Book = require('../../models/Book');


// for images
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './client/public/images'); //cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
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
router.post('/', upload.single('file'), (req, res) => {
  try {
    const { title, isbn, author, description, publisher } = req.body;
    const { path, mimetype } = req.file;
    const book = new Book({
      title,
      isbn,
      author,
      description,
      publisher,
      file_path: path,
      file_mimetype: mimetype
    });
    book.save();
    res.send('file uploaded successfully.');
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
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router;