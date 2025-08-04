const express = require('express');

const router = express.Router();
const workoutModel = require('../models/workoutmodel');

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
router.post('/', async (req, res) => {
    const { title, reps, load } = req.body;
    try {
        const workout = await workoutModel.create({title, reps, load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
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
