import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_WORKOUTS':
            return {
                workouts: action.payload // action.payload is the data fetched from the backend
            };
        case 'ADD_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] // state.workouts is the current state of workouts, and action.payload is the new workout being added
            };
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id) // Filter out the deleted workout from the current state
            };
        default:
            return state; // If no action matches, return the current state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null // Initial state with workouts set to null
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}