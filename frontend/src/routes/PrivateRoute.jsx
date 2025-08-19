import React from 'react'
import { Navigate } from 'react-router-dom';


// It's component not a function so we will return a component so we use Navigate to return the component instead of useNavigateHook 
const PrivateRoute = ({ role, children }) => {
    const userRole = localStorage.getItem('role');
    if (!userRole) {
        alert('Please login to access this page.');
        return <Navigate to='/login' />
    }
    if (userRole != role) {
        alert('Please login to access this page.');

        return <Navigate to='/login' />
    }


    return children;
}

export default PrivateRoute