'use client'
import React, { useEffect } from "react";
import { useAuthStore } from "@/authStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";
import { Scale, Lock, Flash, Server, TagUser } from "./Icons";

export default function Header() {
    const { isLoggedIn, userType, setIsLoggedIn, setUserType } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUserType = localStorage.getItem('userType') as "student" | "company" | null;
        if (storedIsLoggedIn && storedUserType) {
            setIsLoggedIn(true);
            setUserType(storedUserType);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserType(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
    };

    const menuItems = [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about_us" },
        { label: "For Job Seekers", href: "/company/all" },
        { label: "For Companies", href: "/student/all" },
        { label: "Post a new Job", href: "/jobs/new" },
        { label: "Find you next job", href: "/jobs" },
    ];

    const featureItems = [
        { label: "Whiteboards", description: "Interactive brainstorming and mind mapping.", icon: <Scale className="text-warning" fill="currentColor" size={30} /> },
        { label: "Document Collaboration", description: "Real-time document editing and writing.", icon: <TagUser className="text-danger" fill="currentColor" size={30} /> },
        { label: "Chat and Video Conferencing", description: "Built-in communication tools.", icon: <Flash className="text-primary" fill="currentColor" size={30} /> },
        { label: "Task Comments & Threads", description: "Discussion threads for project clarity.", icon: <Server className="text-success" fill="currentColor" size={30} /> },
        { label: "Time Tracker", description: "Manage working hours and deadlines.", icon: <TagUser className="text-danger" fill="currentColor" size={30} /> },
        { label: "Task Management", description: "Create to-do lists, prioritize tasks, and monitor progress.", icon: <Lock className="text-success" fill="currentColor" size={30} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Left: Hamburger + Brand */}
                <div className="flex items-center gap-2">
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>SKILL CONNECT</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 mt-6">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="text-lg hover:text-primary transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Link href="/" className="font-bold text-inherit hover:opacity-80 transition-opacity">
                        SKILL CONNECT
                    </Link>
                </div>

                {/* Center: Desktop Nav */}
                <div className="hidden sm:flex items-center gap-8">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-1">
                                Features
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[340px]">
                            {featureItems.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link href="/coming_soon" className="flex items-start gap-3 p-2">
                                        <span className="mt-1 shrink-0">{item.icon}</span>
                                        <div>
                                            <div className="font-medium">{item.label}</div>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/student/all" className="text-foreground hover:text-primary transition-colors">
                        For Companies
                    </Link>
                    <Link href="/company/all" className="text-foreground hover:text-primary transition-colors">
                        For Job Seekers
                    </Link>
                    <Link href="/about_us" className="text-foreground hover:text-primary transition-colors">
                        About Us
                    </Link>
                </div>

                {/* Right: Auth */}
                {!isLoggedIn ? (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild className="hidden lg:flex">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                        alt="Profile"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}
