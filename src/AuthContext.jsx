
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn") === "true");

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(sessionStorage.getItem("loggedIn") === "true");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const login = () => {
        sessionStorage.setItem("loggedIn", "true");
        setLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.setItem("loggedIn", "false");
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
