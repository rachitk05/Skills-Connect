'use client'
import React, {useState, useMemo, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {EyeSlashFilledIcon} from "@/components/Auth/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/components/Auth/EyeFilledIcon";
import {useRouter} from 'next/navigation';
import Link from "next/link";
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {app} from '@/firebase.config';
import { useAuthStore } from "@/authStore";

export default function Signup() {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const router = useRouter();

    const { setIsLoggedIn, setUserType } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "student" as "student" | "company",
    });
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isConfPassVisible, setIsConfPassVisible] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState({email: "", password: "", confirmPassword: ""});

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserType = localStorage.getItem('userType') as "student" | "company" | null;
        if (isLoggedIn && storedUserType) {
            setIsLoggedIn(true);
            setUserType(storedUserType);
            router.push(storedUserType === 'company' ? '/company/register' : '/student/register');
        }
    }, []);

    const togglePassVisibility = () => setIsPassVisible(!isPassVisible);
    const toggleConfPassVisibility = () => setIsConfPassVisible(!isConfPassVisible);
    const validateEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isInvalid = useMemo(() => {
        if (formData.email === "") return false;
        return !validateEmail(formData.email);
    }, [formData.email]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({ email: "", password: "", confirmPassword: "" });

        if (!termsAccepted) {
            setError((prev) => ({ ...prev, email: "Please accept terms and conditions." }));
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            setIsLoggedIn(true);
            setUserType(formData.userType);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userType', formData.userType);
            router.push(formData.userType === 'company' ? '/company/register' : '/student/register');
        } catch (error:any) {
            if (error.code === 'auth/email-already-in-use') {
                setError((prev) => ({...prev, email: "Email is already in use. Please log in."}));
            } else {
                setError((prev) => ({...prev, email: "Signup failed. Please try again."}));
            }
        }
    };

    const handleGoogleSignIn = async () => {
            try {
                await signInWithPopup(auth, googleProvider);
                setIsLoggedIn(true);
                setUserType(formData.userType);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userType', formData.userType);
                router.push(formData.userType === 'company' ? '/company/register' : '/student/register');
            } catch (error: any) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                setError((prev) => ({ ...prev, email: "An account with this email already exists using a different sign-in method. Please try signing in using another method." }));
            } else {
                setError((prev) => ({ ...prev, email: "Google Sign-In failed. Please try again." }));
            }
        }
    };

    return (
        <div className="bg-signup min-h-screen bg-cover bg-center flex items-center justify-center px-4">
            <form onSubmit={handleSignup} className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4">
                <h3 className="font-bold text-xl mb-4">Sign Up</h3>

                {error.email && <p className="text-red-600">{error.email}</p>}
                {error.confirmPassword && <p className="text-red-600">{error.confirmPassword}</p>}

                <div className="space-y-2">
                    <Label htmlFor="userType">User Type</Label>
                    <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value as "student" | "company"})}>
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
                    <Label htmlFor="name">Username</Label>
                    <Input
                        required
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        required
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            type={isPassVisible ? "text" : "password"}
                            className="w-full pr-10"
                        />
                        <button type="button" onClick={togglePassVisibility} aria-label="toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isPassVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            required
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            type={isConfPassVisible ? "text" : "password"}
                            className="w-full pr-10"
                        />
                        <button type="button" onClick={toggleConfPassVisibility} aria-label="toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isConfPassVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                        required
                    />
                    <Label htmlFor="terms" className="text-sm">
                        I agree with the <span className="text-blue-600">Terms</span> and <span className="text-blue-600">Privacy Policy</span>.
                    </Label>
                </div>

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>

                <div className="flex items-center justify-between space-x-2">
                    <hr className="flex-1" />
                    <span>OR</span>
                    <hr className="flex-1" />
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
                    Already have an account? <Link href="/login" className="text-blue-600">Log In</Link>
                </p>
            </form>
        </div>
    );
}
