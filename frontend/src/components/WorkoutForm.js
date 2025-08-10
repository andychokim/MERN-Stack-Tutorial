import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext(); // Get the dispatch function from context

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]); // State to track empty fields

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (refreshing the page)

        const workout = { title, load, reps };

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error); // Set the error state if the response is not ok
            setEmptyFields(json.emptyFields); // Set the empty fields state if provided
            console.error('Error adding workout:', json.error); // Log the error
        }
        
        if (response.ok) {
            setTitle(''); // Clear the title input
            setLoad(''); // Clear the load input
            setReps(''); // Clear the reps input
            setError(null); // Clear any previous errors
            setEmptyFields([]); // Clear the empty fields state
            dispatch({ type: 'ADD_WORKOUT', payload: json }); // Dispatch the new workout to the context
            console.log('New workout added:', json); // Log the new workout
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title: </label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''} // Add error class if title is empty
            />

            <label>Exercise Load(kg): </label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''} // Add error class if load is empty
            />

            <label>Number of Reps: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''} // Add error class if reps is empty
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>} {/* Display error if it exists */}
        </form>
    )
}

export default WorkoutForm;