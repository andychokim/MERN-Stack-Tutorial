const workoutModel = require('../models/workoutmodel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await workoutModel.find({}).sort({createdAt: -1}); // .find({}) empty object means all documents, sort by createdAt in descending order

    res.status(200).json(workouts); // send the workouts as a JSON response
};

// get a single workout by ID
const getWorkout = async (req, res) => {
    const { id } = req.params; // get the ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'}); // if ID is not valid, return 404
    }

    const workout = await workoutModel.findById(id); // find the workout by ID

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'}); // if not found, return 404, returning so it doesn't continue to the next line
    }
    res.status(200).json(workout); // send the workout as a JSON response
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    // adding document to the database
    try {
        const workout = await workoutModel.create({title, reps, load});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message}); // 400 for bad request, if validation fails
    }
};

// delete a workout by ID
const deleteWorkout = async (req, res) => {
    const { id } = req.params; // get the ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'}); // if ID is not valid, return 404
    }

    const workout = await workoutModel.findByIdAndDelete(id); // find the workout by ID and delete it

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'}); // if not found, return 404
    }
    res.status(200).json(workout); // send success message
}

// update a workout by ID
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'}); // if ID is not valid, return 404
    }

    const workout = await workoutModel.findByIdAndUpdate(id, req.body);

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'}); // if not found, return 404
    }
    res.status(200).json(workout); // send success message
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}