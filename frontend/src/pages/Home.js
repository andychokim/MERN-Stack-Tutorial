import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();

    useEffect(() => {

        // Function to fetch workouts from the backend
        const fetchWokrouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SHOW_WORKOUTS', payload: json}); // Update the context with fetched workouts    
            }
        }

        // Call the function to fetch workouts
        fetchWokrouts();
    }, [dispatch])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home;