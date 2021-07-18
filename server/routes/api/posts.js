const express = require('express');
const router = express.Router();

// Load Book model
const Post = require('../../models/Post');

// @route GET api/posts/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('post route testing!'));

// @route GET api/posts
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Post.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Posts found' }));
});

// @route GET api/posts/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Post found' }));
});

// @route GET api/posts/:user/listing
// @description Get posts of a certain publisher
// @access Public
router.get('/:user/listing', (req, res) => {
  Post.find({publisher: req.params.user})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No Posts found' }));
});

// @route GET api/posts/:user/listing
// @description Get posts from a certain thread
// @access Public
router.get('/:thread/threads', (req, res) => {
  Post.find({thread_id: req.params.thread})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No Posts found' }));
});

// @route POST api/posts
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Post.create(req.body)
    .then(book => res.json(book))
    .catch(err => res.status(400).json({ error: 'Unable to add this post' }));
});

// @route PUT api/posts/:id
// @description Update post
// @access Public
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});


router.get('/check-like/:user/:id', (req, res) => {
  Post.countDocuments(
    {_id: req.params.id, usersLiked: req.params.user}
    )
    .then(count => {
      //console.log(user.user_email);
      res.json({count})
    })
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.post('/add-like/:user/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, 
    { $push: { usersLiked: req.params.user } },
    {
      returnOriginal: false,
      upsert: false
    })
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.post('/remove-like/:user/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, 
    { $pull: { usersLiked: req.params.user } },
    {
      returnOriginal: false,
      upsert: false
    })
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such post' }));
});

module.exports = router;