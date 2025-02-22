import "./Authente.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import bcrypt from "bcryptjs"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png"

export default function Example() {
    const imgRef = useRef(null);
    const [searchParams] = useSearchParams();
    const isLogin = sessionStorage.getItem("loggedIn")
    const navigate = useNavigate()
    const page = searchParams.get('page');
    const [mail, setmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const loginFormHandler = (e) => {
        e.preventDefault();
        const generalUser = JSON.parse(localStorage.getItem('users')) || [];
        const user = generalUser.find(user => user.email === mail)
        if (user && bcrypt.compareSync(password, user.password)) {
            sessionStorage.setItem('loggedIn', 'true');
            toast.success("Login successful!")
            window.location.href = "/home";
        } else {
            toast.error("Invalid email or password!")
        }

    }
    const registerFormSubmit = (e) => {
        e.preventDefault();
        if (!mail || !password || !confirmPassword) {
            toast.error("Missing Credentials")
            return
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!")
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.email === mail);
        if (userExists) {
            toast.error("User already exists!")
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        users.push({ email: mail, password: hashedPassword });
        localStorage.setItem('users', JSON.stringify(users));
        toast.success("Registration successful!")
        setmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/home');

    }
    useEffect(() => {
        if (page && imgRef.current) {
            if (page === "register") {
                imgRef.current.style.transform = "translateX(100%)";
            }
            if (page === "login") {
                imgRef.current.style.transform = "translateX(0%)";
            }
        }
        const generalUser = JSON.parse(localStorage.getItem('users')) || [];
        if (!generalUser.find(user => user.email === "demouser@demo.com")) {

            generalUser.push({ email: "demouser@demo.com", password: "$2b$10$J1AhTYzQvWWdFtLLqpefe.fPXq9u7JJekf4P3JdPynqPkQidfQgFy" });
            localStorage.setItem('users', JSON.stringify(generalUser));
        }
    }, [page]);
    useEffect(() => {
        if (isLogin == "true") {
            navigate('/home')
        }
    }, [isLogin])

    return (
        <main className="signin-main min-h-screen bg-background text-foreground">
            <div className="signin-container">
                <img
                    src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg"
                    alt="Sign In"
                    className="signin-image"
                    ref={imgRef}
                />
                <div>
                    <div className="flex min-h-full flex-1 flex-col justify-center">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Lesson planner"
                                src={logo}
                                className="mx-auto h-15 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Create new account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={registerFormSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={mail}
                                            onChange={(e) => {
                                                setmail(e.target.value)
                                            }}
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div >
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-5">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Confirm Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                Already a member?{' '}
                                <a onClick={() => {
                                    if (imgRef.current) {
                                        imgRef.current.style.transform = "translateX(0%)";
                                    }
                                }} style={{ cursor: "pointer" }} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Login Now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex min-h-full flex-1 flex-col justify-center">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt={"Lesson Planner"}
                                src={logo}
                                className="mx-auto h-15 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form onSubmit={loginFormHandler} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={mail}
                                            onChange={(e) => {
                                                setmail(e.target.value)
                                            }}
                                            required
                                            autoComplete="email"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                            required
                                            autoComplete="current-password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm/6 text-gray-500">
                                Not a member?{' '}
                                <a onClick={() => {
                                    if (imgRef.current) {
                                        imgRef.current.style.transform = "translateX(100%)";
                                    }
                                }} style={{ cursor: "pointer" }} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Register Now
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}