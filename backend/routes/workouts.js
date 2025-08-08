const express = require('express');
const router = express.Router();
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
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
router.delete('/:id', deleteWorkout);

// UPDATE request to the root path
router.patch('/:id', updateWorkout);


// Export the router
module.exports = router;
