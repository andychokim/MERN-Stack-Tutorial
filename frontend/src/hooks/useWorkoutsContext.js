import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

// Custom hook to use the WorkoutsContext
// This allows components to access the context without importing it directly
export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider'); // Ensure that the hook is used within the context provider
    }

    return context;
};