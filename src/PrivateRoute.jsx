import React, { useContext, useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from "../src/components/Contexts/Context";

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        // Set an interval to check the token every second
        const intervalId = setInterval(checkToken, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return isAuthenticated ? children : <Navigate to="/" />;

};

export default PrivateRoute;
