'use client'
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EyeSlashFilledIcon } from "@/components/Auth/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/Auth/EyeFilledIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase.config";
import { useAuthStore } from "@/authStore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserTypeLocal] = useState<"student" | "company">("student");
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const { setIsLoggedIn, setUserType } = useAuthStore();

    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => email !== "" && !validateEmail(email), [email]);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserType = localStorage.getItem('userType') as "student" | "company" | null;
        if (isLoggedIn && storedUserType) {
            setIsLoggedIn(true);
            setUserType(storedUserType);
            router.push(storedUserType === 'company' ? '/company/new' : '/student/register');
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user);
            setIsLoggedIn(true);
            setUserType(userType);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', userType);
            router.push(userType === 'company' ? '/company/new' : '/student/register');
        } catch (error) {
            setErrorMessage('Invalid email or password');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-In:", result.user);
            setIsLoggedIn(true);
            setUserType(userType);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', userType);
            router.push(userType === 'company' ? '/company/register' : '/student/register');
        } catch (error) {
            setErrorMessage('Google Sign-In failed');
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);


    return (
        <div className="bg-login min-h-screen bg-cover bg-center flex items-center justify-center px-4">
            <form onSubmit={handleLogin} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
                <h3 className="font-bold text-xl mb-4">Log In</h3>

                {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Select value={userType} onValueChange={(value) => setUserTypeLocal(value as "student" | "company")}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                    />
                    {isInvalid && <p className="text-sm text-red-500">Please enter a valid email</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            required
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={isVisible ? "text" : "password"}
                            className="w-full pr-10"
                        />
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-xl" />
                            ) : (
                                <EyeFilledIcon className="text-xl" />
                            )}
                        </button>
                    </div>
                </div>

                <Button className="w-full" type="submit">
                    Log In
                </Button>

                <div className="flex items-center justify-between space-x-2">
                    <hr className="flex-1"/>
                    <span>OR</span>
                    <hr className="flex-1"/>
                </div>

                <Button variant="outline" className="w-full" type="button" onClick={handleGoogleSignIn}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24"
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
                    Don't have an account? <Link href="/signup" className="text-blue-600">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}
