const express = require('express');

const router = express.Router();


/**
 * routes
 */

// GET all workouts
router.get('/', (req, res) => {
    res.json({msg: 'GET all workouts'});
});

// GET a single workout by ID
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a single workout by ID'});
});

// POST request to the root path
router.post('/', (req, res) => {
    res.json({msg: 'POST a new workout'});
});

// DELETE request to the root path
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a single workout by ID'});
});

// UPDATE request to the root path
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a single workout by ID'});
});


// Export the router
module.exports = router;
