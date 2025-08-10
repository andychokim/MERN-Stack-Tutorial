import formatDistanceToNow from 'date-fns/formatDistanceToNow'; // Import the function to format dates
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
            console.log('Workout deleted successfully');
        }

        if (!response.ok) {
            console.error('Error deleting workout:', json.error);
        }
    }

    return (
        <div className="workout-details">
            <h4>
                {workout.title}
            </h4>
            <p>
                <strong>
                    Load (kg): {workout.load}
                </strong>
            </p>
            <p>
                <strong>
                    Reps: {workout.reps}
                </strong>
            </p>
            <p>
                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails;