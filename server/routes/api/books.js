const path = require('path'); //for images
const express = require('express');
const cloudinary = require('../../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid'); //for images
const router = express.Router();
const multer = require('multer'); //for images
const User = require('../../models/User');

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
    if (!file.originalname.match(/\.(jpeg|jpg|png|PNG|JPEG|JPG)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png format.'
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

router.get('/:user/listing', (req, res) => {
  Book.find({publisher: req.params.user})
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

router.get('/:user/wishlist', (req, res) => {
  User.findOne({user_email: req.params.user})
    .then(user => {
      const wishlist = user.wishlist;
      Book.find({title: { $in: wishlist }})
        .then(books => res.json(books))
        .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
    })
    .catch(err => res.status(404).json({nouserfound: 'No User found' }));
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
    //console.log('got here');
    const result = await cloudinary.uploader.upload(req.file.path);
    const { title, mcode, author, description, publisher, price, sold } = req.body;
    //console.log('got all fields');
    const book = new Book({
      title,
      mcode,
      author,
      description,
      publisher,
      price,
      sold,
      avatar: result.secure_url,
      cloudinary_id: result.public_id
    });
    //console.log('Managed to do this');
    await book.save();
    User.findOneAndUpdate(
      {user_email: publisher}, 
      { $push: { listing: [title] } },
      {
        returnOriginal: false,
        upsert: true
      }
    )
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