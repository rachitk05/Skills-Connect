'use client'
import React, { useState, useMemo } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/components/Auth/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/Auth/EyeFilledIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase.config";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    // Email validation function
    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    // Check if email input is valid
    const isInvalid = useMemo(() => email !== "" && !validateEmail(email), [email]);

    // Login with email and password
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Student signed in:", userCredential.user);
            router.push('/');
        } catch (error) {
            setErrorMessage('Invalid email or password');
        }
    };

    // Login with Google
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-In:", result.user);
            router.push('/');
        } catch (error) {
            setErrorMessage('Google Sign-In failed');
        }
    };

    // Toggle password visibility
    const toggleVisibility = () => setIsVisible(!isVisible);

    // Handle form submission manually
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(e);
    };

    return (
        <div className="bg-login min-h-screen bg-cover bg-center flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
                <h3 className="font-bold text-xl mb-4">Log In</h3>

                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                <Input
                    isRequired
                    type="email"
                    variant="bordered"
                    label="Email"
                    value={email}
                    onValueChange={setEmail}
                    className="w-full"
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage="Please enter a valid email"
                />
                <Input
                    isRequired
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    endContent={
                        <button type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-xl" />
                            ) : (
                                <EyeFilledIcon className="text-xl" />
                            )}
                        </button>
                    }
                    value={password}
                    onValueChange={setPassword}
                    type={isVisible ? "text" : "password"}
                    className="w-full"
                />


                <Button color="primary" className="w-full" type={"submit"}>
                    Log In
                </Button>

                <div className="flex items-center justify-between space-x-2">
                    <hr className="flex-1"/>
                    <span>OR</span>
                    <hr className="flex-1"/>
                </div>

                <Button variant="bordered" className="w-full" onClick={handleGoogleSignIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%"
                         viewBox="0 0 48 48">
                        <path fill="#FFC107"
                              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00"
                              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50"
                              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2"
                              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Continue with Google
                </Button>

                <p className="text-center">
                    Don’t have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
