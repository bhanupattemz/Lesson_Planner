import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../AuthContext';
import { toast } from "react-toastify"
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';

export default function Header() {
    const [theme, setTheme] = useState('light');
    const { loggedIn, logout } = useAuth();

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

    return (
        <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-black">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Lesson Planner</span>
                        <img
                            className="h-12 w-auto rounded-lg shadow-md"
                            src={logo}
                            alt="logo"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
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
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
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
        </header>
    );
}