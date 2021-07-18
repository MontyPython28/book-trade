const express = require('express');
const router = express.Router();

// Load Thread model
const Thread = require('../../models/Thread');

// @route GET api/thread/test
// @description tests thread route
// @access Public
router.get('/test', (req, res) => res.send('thread route testing!'));

// @route GET api/thread
// @description Get all thread
// @access Public
router.get('/', (req, res) => {
  Thread.find()
    .then(threads => res.json(threads))
    .catch(err => res.status(404).json({ nothreadsfound: 'No Threads found' }));
});

// @route GET api/threads/:id
// @description Get single thread by mcode
// @access Public
router.get('/:mcode/mcode', (req, res) => {
  Thread.find({mcode: req.params.mcode})
    .then(threads => res.json(threads))
    .catch(err => res.status(404).json({ nothreadsfound: 'No Threads found' }));
});

// @route GET api/threads/:id
// @description Get single thread by mcode
// @access Public
router.get('/:id', (req, res) => {
  Thread.findById(req.params.id)
    .then(thread => res.json(thread))
    .catch(err => res.status(404).json({ nothreadfound: 'No Threads found' }));
});

// @route POST api/threads
// @description add/save thread
// @access Public
router.post('/', (req, res) => {
  Thread.create(req.body)
    .then(thread => res.json({ msg: 'Thread added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this thread' }));
});

// UPDATE THE PUT AND DELETE FOR THE INDIVIDUAL POSTS!!!!!!

// @route GET api/posts/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Thread.findByIdAndUpdate(req.params.id, req.body)
    .then(thread => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/threads/:id
// @description Delete thread by id
// @access Public
router.delete('/:id', (req, res) => {
  Thread.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Post entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such post' }));
});

module.exports = router;