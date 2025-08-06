const express = require('express');
const router = express.Router();
const {
    getWorkouts,
    getWorkout,
    createWorkout
} = require('../controllers/workoutController');

/**
 * routes
 */

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout by ID
router.get('/:id', getWorkout);

// POST request to the root path
router.post('/', createWorkout);

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
