'use client'
import React, { useEffect } from "react";
import { useAuthStore } from "@/authStore";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Avatar
} from "@nextui-org/react";
import { ChevronDown, Lock, Activity, Flash, Server, TagUser, Scale } from "./Icons";

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

        {
            label:"Home",
            href:"/"
        },
        {
            label:"About Us",
            href:"/about_us"
        },
        {
            label:"For Job Seekers",
            href:"/company/all"
        },

        {
            label:"For Companies",
            href:"/student/all"
        },
        {
            label:"Post a new Job",
            href:"/jobs/new"
        },
        {
            label:"Find you next job",
            href:"/jobs"
        },
    ];

    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16} />,
        scale: <Scale className="text-warning" fill="currentColor" size={30} />,
        lock: <Lock className="text-success" fill="currentColor" size={30} />,
        activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
        flash: <Flash className="text-primary" fill="currentColor" size={30} />,
        server: <Server className="text-success" fill="currentColor" size={30} />,
        user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Button as={Link} href={"/"} variant={"ghost"} className={"text-black border-none"} >
                        <p className="font-bold text-inherit">SKILL CONNECT</p>
                    </Button>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                Features
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="whiteboards"
                            description="Interactive brainstorming and mind mapping."
                            startContent={icons.scale}
                        >
                            Whiteboards
                        </DropdownItem>
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="document_collaboration"
                            description="Real-time document editing and writing."
                            startContent={icons.user}
                        >
                            Document Collaboration
                        </DropdownItem>
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="chat_video"
                            description="Built-in communication tools."
                            startContent={icons.flash}
                        >
                            Chat and Video Conferencing
                        </DropdownItem>
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="task_comments"
                            description="Discussion threads for project clarity."
                            startContent={icons.server}
                        >
                            Task Comments & Threads
                        </DropdownItem>
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="time_tracker"
                            description="Manage working hours and deadlines."
                            startContent={icons.user}
                        >
                            Time Tracker
                        </DropdownItem>
                        <DropdownItem as={Link} href={"/coming_soon"}
                            key="task_management"
                            description="Create to-do lists, prioritize tasks, and monitor progress."
                            startContent={icons.lock}
                        >
                            Task Management
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavbarItem>
                    <Link href="/student/all" color={"foreground"}>
                        For Companies
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/company/all">
                        For Job Seekers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about_us">
                        About Us
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {!isLoggedIn ? (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link} href={"/login"} color="primary" variant="ghost" >
                            Login
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/signup" variant="solid" className={"light:bg-black"}>
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                size="md"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href={item.href}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}