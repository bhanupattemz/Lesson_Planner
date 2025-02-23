import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { loggedIn, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-black">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Lesson Planner</span>
                        <img
                            className="h-12 w-auto rounded-lg shadow-md"
                            src={logo}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-blue-800"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/home" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors">
                        Home
                    </Link>
                    <Link to="/planner" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors">
                        Lesson Planner
                    </Link>
                    <Link to="/topics" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors">
                        Recent Topics
                    </Link>
                    <Link to="/about" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors">
                        About
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="rounded-full p-2 text-white hover:bg-blue-800 transition-colors"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                    {!loggedIn ? (
                        <Link
                            to="/authente?page=login"
                            className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg border border-blue-700 hover:border-blue-500"
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    ) : (
                        <span
                            onClick={() => {
                                logout();
                                toast.success("Log Out Successful");
                                navigate('/home');
                            }}
                            className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors px-4 py-2 rounded-lg border border-blue-700 hover:border-blue-500 cursor-pointer"
                        >
                            Log Out <span aria-hidden="true">&rarr;</span>
                        </span>
                    )}
                </div>
            </nav>

            {isMenuOpen && (
                <div className="lg:hidden px-4 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-r from-gray-900 via-blue-900 to-black">
                    <Link to="/home" className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2">
                        Home
                    </Link>
                    <Link to="/planner" className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2">
                        Lesson Planner
                    </Link>
                    <Link to="/topics" className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2">
                        Recent Topics
                    </Link>
                    <Link to="/about" className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2">
                        About
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="w-full text-left text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2"
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                    {!loggedIn ? (
                        <Link
                            to="/authente?page=login"
                            className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2"
                        >
                            Log in
                        </Link>
                    ) : (
                        <span
                            onClick={() => {
                                logout();
                                toast.success("Log Out Successful");
                                navigate('/home');
                            }}
                            className="block text-sm font-semibold text-white hover:bg-blue-800 rounded-md px-3 py-2 cursor-pointer"
                        >
                            Log Out
                        </span>
                    )}
                </div>
            )}
        </header>
    );
}
