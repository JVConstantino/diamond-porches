import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import Login from './Login';

const AUTH_KEY = 'diamond-admin-auth';

const ProtectedAdmin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check session storage on initial render to persist login state across refreshes
        try {
            const authStatus = window.sessionStorage.getItem(AUTH_KEY);
            if (authStatus === 'true') {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Could not access session storage:", error);
        }
    }, []);

    const handleLoginSuccess = () => {
        try {
            window.sessionStorage.setItem(AUTH_KEY, 'true');
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Could not access session storage:", error);
        }
    };

    const handleLogout = () => {
        try {
            window.sessionStorage.removeItem(AUTH_KEY);
            setIsAuthenticated(false);
        } catch (error)            {
            console.error("Could not access session storage:", error);
        }
    };

    if (isAuthenticated) {
        return <AdminPanel onLogout={handleLogout} />;
    }

    return <Login onLoginSuccess={handleLoginSuccess} />;
};

export default ProtectedAdmin;